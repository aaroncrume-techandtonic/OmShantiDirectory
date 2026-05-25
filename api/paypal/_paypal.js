import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { Pool } from 'pg';

const PAYPAL_API_BASE = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  live: 'https://api-m.paypal.com',
};

function asBase64Url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromBase64Url(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4;
  const padded = padding ? `${normalized}${'='.repeat(4 - padding)}` : normalized;
  return Buffer.from(padded, 'base64').toString('utf8');
}

function getRequiredEnv(name, fallback) {
  const value = process.env[name] || fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getPaypalConfig() {
  const clientId = getRequiredEnv('PAYPAL_CLIENT_ID', process.env.VITE_PAYPAL_CLIENT_ID);
  const clientSecret = getRequiredEnv('PAYPAL_CLIENT_SECRET');
  const env = process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox';

  return {
    clientId,
    clientSecret,
    apiBase: PAYPAL_API_BASE[env],
    env,
  };
}

export function getMembershipSecret() {
  return getRequiredEnv('MEMBERSHIP_SESSION_SECRET', process.env.PAYPAL_CLIENT_SECRET);
}

export function parseCookies(req) {
  const cookieHeader = req.headers?.cookie || '';

  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, cookie) => {
      const index = cookie.indexOf('=');
      if (index === -1) {
        return acc;
      }

      const key = cookie.slice(0, index).trim();
      const value = cookie.slice(index + 1).trim();
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}

export function createMembershipSession(payload) {
  const secret = getMembershipSecret();
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + 60 * 60 * 24 * 365;
  const tokenPayload = {
    ...payload,
    iat: issuedAt,
    exp: expiresAt,
  };

  const encodedHeader = asBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const encodedPayload = asBase64Url(JSON.stringify(tokenPayload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = asBase64Url(
    crypto.createHmac('sha256', secret).update(unsignedToken).digest(),
  );

  return `${unsignedToken}.${signature}`;
}

export function verifyMembershipSession(token) {
  if (!token) {
    return null;
  }

  const [encodedHeader, encodedPayload, signature] = token.split('.');
  if (!encodedHeader || !encodedPayload || !signature) {
    return null;
  }

  const secret = getMembershipSecret();
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = asBase64Url(
    crypto.createHmac('sha256', secret).update(unsignedToken).digest(),
  );

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  const isValid = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);

  if (!isValid) {
    return null;
  }

  const payload = JSON.parse(fromBase64Url(encodedPayload));
  const now = Math.floor(Date.now() / 1000);

  if (!payload.exp || payload.exp < now) {
    return null;
  }

  return payload;
}

export function setMembershipCookie(res, token) {
  const cookie = `om_shanti_membership=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`;

  if (typeof res.setHeader === 'function') {
    res.setHeader('Set-Cookie', cookie);
  }
}

export function clearMembershipCookie(res) {
  const cookie = 'om_shanti_membership=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';

  if (typeof res.setHeader === 'function') {
    res.setHeader('Set-Cookie', cookie);
  }
}

export async function getPaypalAccessToken() {
  const { clientId, clientSecret, apiBase } = getPaypalConfig();
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const payload = await response.json();

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || 'Unable to authenticate with PayPal.');
  }

  return {
    accessToken: payload.access_token,
    apiBase,
  };
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (!req.body) {
    return {};
  }

  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

export function sendJson(res, statusCode, payload) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(statusCode).json(payload);
    return;
  }

  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function getPaymentsDbPath() {
  const configuredPath = process.env.PAYMENTS_STORE_FILE;
  if (configuredPath) {
    return configuredPath;
  }

  if (process.env.VERCEL) {
    return '/tmp/omshanti-payments.db';
  }

  return `${process.cwd()}/.payments-store.db`;
}

let paymentsDb = null;
let paymentsPgPool = null;
let postgresSchemaReadyPromise = null;

function usePostgresStorage() {
  return Boolean(process.env.DATABASE_URL);
}

function getPaymentsPgPool() {
  if (paymentsPgPool) {
    return paymentsPgPool;
  }

  paymentsPgPool = new Pool({ connectionString: process.env.DATABASE_URL });
  return paymentsPgPool;
}

async function ensurePostgresSchema() {
  if (!usePostgresStorage()) {
    return;
  }

  if (postgresSchemaReadyPromise) {
    await postgresSchemaReadyPromise;
    return;
  }

  postgresSchemaReadyPromise = (async () => {
    const pool = getPaymentsPgPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        order_id TEXT PRIMARY KEY,
        status TEXT,
        payer_email TEXT,
        payer_id TEXT,
        capture_id TEXT,
        amount TEXT,
        currency TEXT,
        source TEXT,
        updated_at TIMESTAMPTZ,
        raw_json JSONB NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_payments_updated_at ON payments(updated_at);

      CREATE TABLE IF NOT EXISTS webhook_events (
        event_id TEXT PRIMARY KEY,
        event_type TEXT,
        order_id TEXT,
        processing_status TEXT NOT NULL DEFAULT 'processed',
        last_error TEXT,
        processed_at TIMESTAMPTZ NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_webhook_events_processed_at ON webhook_events(processed_at);
      CREATE INDEX IF NOT EXISTS idx_webhook_events_status ON webhook_events(processing_status);
    `);
  })();

  await postgresSchemaReadyPromise;
}

function ensureWebhookEventsSchema(db) {
  const columns = db.prepare('PRAGMA table_info(webhook_events)').all();
  const columnNames = new Set(columns.map((column) => column.name));

  if (!columnNames.has('processing_status')) {
    db.exec("ALTER TABLE webhook_events ADD COLUMN processing_status TEXT NOT NULL DEFAULT 'processed'");
  }

  if (!columnNames.has('last_error')) {
    db.exec('ALTER TABLE webhook_events ADD COLUMN last_error TEXT');
  }
}

function getPaymentsDb() {
  if (paymentsDb) {
    return paymentsDb;
  }

  const dbPath = getPaymentsDbPath();
  const directory = path.dirname(dbPath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      order_id TEXT PRIMARY KEY,
      status TEXT,
      payer_email TEXT,
      payer_id TEXT,
      capture_id TEXT,
      amount TEXT,
      currency TEXT,
      source TEXT,
      updated_at TEXT,
      raw_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS webhook_events (
      event_id TEXT PRIMARY KEY,
      event_type TEXT,
      order_id TEXT,
      processing_status TEXT NOT NULL DEFAULT 'processed',
      last_error TEXT,
      processed_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_payments_updated_at ON payments(updated_at);
    CREATE INDEX IF NOT EXISTS idx_webhook_events_processed_at ON webhook_events(processed_at);
  `);

  ensureWebhookEventsSchema(db);
  db.exec('CREATE INDEX IF NOT EXISTS idx_webhook_events_status ON webhook_events(processing_status)');

  paymentsDb = db;
  return paymentsDb;
}

function toPaymentRecord(row) {
  if (!row) {
    return null;
  }

  try {
    return {
      orderId: row.order_id,
      status: row.status,
      payerEmail: row.payer_email,
      payerId: row.payer_id,
      captureId: row.capture_id,
      amount: row.amount,
      currency: row.currency,
      source: row.source,
      updatedAt: row.updated_at,
      raw: JSON.parse(row.raw_json),
    };
  } catch {
    return null;
  }
}

function normalizeOrderRecord(order, source) {
  const capture = order.purchase_units?.[0]?.payments?.captures?.[0];

  return {
    orderId: order.id,
    status: order.status,
    payerEmail: order.payer?.email_address || null,
    payerId: order.payer?.payer_id || null,
    captureId: capture?.id || null,
    amount: capture?.amount?.value || order.purchase_units?.[0]?.amount?.value || null,
    currency: capture?.amount?.currency_code || order.purchase_units?.[0]?.amount?.currency_code || null,
    source,
    updatedAt: new Date().toISOString(),
  };
}

export async function savePaymentRecord(order, source = 'capture') {
  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const record = normalizeOrderRecord(order, source);

    await pool.query(
      `
        INSERT INTO payments (
          order_id,
          status,
          payer_email,
          payer_id,
          capture_id,
          amount,
          currency,
          source,
          updated_at,
          raw_json
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb)
        ON CONFLICT(order_id) DO UPDATE SET
          status = EXCLUDED.status,
          payer_email = EXCLUDED.payer_email,
          payer_id = EXCLUDED.payer_id,
          capture_id = EXCLUDED.capture_id,
          amount = EXCLUDED.amount,
          currency = EXCLUDED.currency,
          source = EXCLUDED.source,
          updated_at = EXCLUDED.updated_at,
          raw_json = EXCLUDED.raw_json
      `,
      [
        record.orderId,
        record.status,
        record.payerEmail,
        record.payerId,
        record.captureId,
        record.amount,
        record.currency,
        record.source,
        record.updatedAt,
        JSON.stringify(order),
      ],
    );

    return getPaymentRecord(record.orderId);
  }

  const db = getPaymentsDb();
  const record = normalizeOrderRecord(order, source);

  const statement = db.prepare(`
    INSERT INTO payments (
      order_id,
      status,
      payer_email,
      payer_id,
      capture_id,
      amount,
      currency,
      source,
      updated_at,
      raw_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(order_id) DO UPDATE SET
      status = excluded.status,
      payer_email = excluded.payer_email,
      payer_id = excluded.payer_id,
      capture_id = excluded.capture_id,
      amount = excluded.amount,
      currency = excluded.currency,
      source = excluded.source,
      updated_at = excluded.updated_at,
      raw_json = excluded.raw_json
  `);

  statement.run(
    record.orderId,
    record.status,
    record.payerEmail,
    record.payerId,
    record.captureId,
    record.amount,
    record.currency,
    record.source,
    record.updatedAt,
    JSON.stringify(order),
  );

  return getPaymentRecord(record.orderId);
}

export async function getPaymentRecord(orderId) {
  if (!orderId) {
    return null;
  }

  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const result = await pool.query(
      `
        SELECT
          order_id,
          status,
          payer_email,
          payer_id,
          capture_id,
          amount,
          currency,
          source,
          updated_at,
          raw_json
        FROM payments
        WHERE order_id = $1
      `,
      [orderId],
    );

    return toPaymentRecord(result.rows[0]);
  }

  const db = getPaymentsDb();
  const row = db
    .prepare(`
      SELECT
        order_id,
        status,
        payer_email,
        payer_id,
        capture_id,
        amount,
        currency,
        source,
        updated_at,
        raw_json
      FROM payments
      WHERE order_id = ?
    `)
    .get(orderId);

  return toPaymentRecord(row);
}

export async function claimWebhookEventProcessing(eventId, eventType) {
  if (!eventId) {
    return false;
  }

  const now = new Date().toISOString();
  const timeoutSeconds = Number.parseInt(process.env.PAYPAL_WEBHOOK_CLAIM_TIMEOUT_SECONDS || '', 10);
  const safeTimeoutSeconds = Number.isNaN(timeoutSeconds) || timeoutSeconds < 30 ? 300 : timeoutSeconds;
  const staleClaimCutoff = new Date(Date.now() - safeTimeoutSeconds * 1000).toISOString();

  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const result = await pool.query(
      `
        INSERT INTO webhook_events (
          event_id,
          event_type,
          order_id,
          processing_status,
          last_error,
          processed_at
        ) VALUES ($1,$2,$3,$4,$5,$6)
        ON CONFLICT(event_id) DO UPDATE SET
          event_type = EXCLUDED.event_type,
          processing_status = 'claimed',
          last_error = NULL,
          processed_at = EXCLUDED.processed_at
        WHERE webhook_events.processing_status = 'failed'
           OR (webhook_events.processing_status = 'claimed' AND webhook_events.processed_at < $7)
      `,
      [eventId, eventType || null, null, 'claimed', null, now, staleClaimCutoff],
    );

    if (result.rowCount > 0) {
      try {
        await cleanupProcessedWebhookEvents();
      } catch (error) {
        console.warn('Failed to cleanup old webhook events:', error);
      }
    }

    return result.rowCount > 0;
  }

  const db = getPaymentsDb();
  const result = db
    .prepare(`
      INSERT INTO webhook_events (
        event_id,
        event_type,
        order_id,
        processing_status,
        last_error,
        processed_at
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(event_id) DO UPDATE SET
        event_type = excluded.event_type,
        processing_status = 'claimed',
        last_error = NULL,
        processed_at = excluded.processed_at
      WHERE webhook_events.processing_status = 'failed'
         OR (webhook_events.processing_status = 'claimed' AND webhook_events.processed_at < ?)
    `)
    .run(eventId, eventType || null, null, 'claimed', null, now, staleClaimCutoff);

  if (result.changes > 0) {
    try {
      await cleanupProcessedWebhookEvents();
    } catch (error) {
      console.warn('Failed to cleanup old webhook events:', error);
    }
  }

  return result.changes > 0;
}

export async function markWebhookEventProcessed(eventId, orderId = null) {
  if (!eventId) {
    return;
  }

  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    await pool.query(
      `
        UPDATE webhook_events
        SET
          order_id = COALESCE(order_id, $1),
          processing_status = 'processed',
          last_error = NULL,
          processed_at = $2
        WHERE event_id = $3
      `,
      [orderId, new Date().toISOString(), eventId],
    );
    return;
  }

  const db = getPaymentsDb();
  db
    .prepare(`
      UPDATE webhook_events
      SET
        order_id = COALESCE(order_id, ?),
        processing_status = 'processed',
        last_error = NULL,
        processed_at = ?
      WHERE event_id = ?
    `)
    .run(orderId, new Date().toISOString(), eventId);
}

export async function markWebhookEventFailed(eventId, error) {
  if (!eventId) {
    return;
  }

  const message = String(error?.message || error || 'Webhook processing failed').slice(0, 500);

  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    await pool.query(
      `
        UPDATE webhook_events
        SET
          processing_status = 'failed',
          last_error = $1,
          processed_at = $2
        WHERE event_id = $3
      `,
      [message, new Date().toISOString(), eventId],
    );
    return;
  }

  const db = getPaymentsDb();
  db
    .prepare(`
      UPDATE webhook_events
      SET
        processing_status = 'failed',
        last_error = ?,
        processed_at = ?
      WHERE event_id = ?
    `)
    .run(message, new Date().toISOString(), eventId);
}

function getWebhookEventRetentionDays() {
  const configuredDays = Number.parseInt(process.env.PAYPAL_WEBHOOK_EVENT_RETENTION_DAYS || '', 10);
  if (Number.isNaN(configuredDays) || configuredDays < 1) {
    return 30;
  }

  return configuredDays;
}

export async function cleanupProcessedWebhookEvents(retentionDays = getWebhookEventRetentionDays()) {
  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();
    const result = await pool.query('DELETE FROM webhook_events WHERE processed_at < $1', [cutoff]);
    return result.rowCount;
  }

  const db = getPaymentsDb();
  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();
  const result = db
    .prepare('DELETE FROM webhook_events WHERE processed_at < ?')
    .run(cutoff);

  return result.changes;
}

export async function getRecentPayments(limit = 20) {
  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 20, 100));
    const result = await pool.query(
      `
        SELECT
          order_id,
          status,
          payer_email,
          payer_id,
          capture_id,
          amount,
          currency,
          source,
          updated_at,
          raw_json
        FROM payments
        ORDER BY updated_at DESC
        LIMIT $1
      `,
      [safeLimit],
    );

    return result.rows.map((row) => toPaymentRecord(row)).filter(Boolean);
  }

  const db = getPaymentsDb();
  const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 20, 100));
  const rows = db
    .prepare(`
      SELECT
        order_id,
        status,
        payer_email,
        payer_id,
        capture_id,
        amount,
        currency,
        source,
        updated_at,
        raw_json
      FROM payments
      ORDER BY updated_at DESC
      LIMIT ?
    `)
    .all(safeLimit);

  return rows.map((row) => toPaymentRecord(row)).filter(Boolean);
}

export async function getRecentWebhookEvents(limit = 20) {
  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 20, 100));
    const result = await pool.query(
      `
        SELECT
          event_id,
          event_type,
          order_id,
          processing_status,
          last_error,
          processed_at
        FROM webhook_events
        ORDER BY processed_at DESC
        LIMIT $1
      `,
      [safeLimit],
    );

    return result.rows.map((row) => ({
      eventId: row.event_id,
      eventType: row.event_type,
      orderId: row.order_id,
      processingStatus: row.processing_status,
      lastError: row.last_error,
      processedAt: row.processed_at,
    }));
  }

  const db = getPaymentsDb();
  const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 20, 100));

  return db
    .prepare(`
      SELECT
        event_id,
        event_type,
        order_id,
        processing_status,
        last_error,
        processed_at
      FROM webhook_events
      ORDER BY processed_at DESC
      LIMIT ?
    `)
    .all(safeLimit)
    .map((row) => ({
      eventId: row.event_id,
      eventType: row.event_type,
      orderId: row.order_id,
      processingStatus: row.processing_status,
      lastError: row.last_error,
      processedAt: row.processed_at,
    }));
}

export async function getFailedWebhookEvents(limit = 20, offset = 0) {
  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 20, 100));
    const safeOffset = Math.max(0, Number.parseInt(String(offset), 10) || 0);

    const rowsResult = await pool.query(
      `
        SELECT
          event_id,
          event_type,
          order_id,
          processing_status,
          last_error,
          processed_at
        FROM webhook_events
        WHERE processing_status = 'failed'
        ORDER BY processed_at DESC
        LIMIT $1
        OFFSET $2
      `,
      [safeLimit, safeOffset],
    );

    const totalResult = await pool.query("SELECT COUNT(*) AS total FROM webhook_events WHERE processing_status = 'failed'");
    const total = Number(totalResult.rows?.[0]?.total || 0);

    return {
      items: rowsResult.rows.map((row) => ({
        eventId: row.event_id,
        eventType: row.event_type,
        orderId: row.order_id,
        processingStatus: row.processing_status,
        lastError: row.last_error,
        processedAt: row.processed_at,
      })),
      total,
      limit: safeLimit,
      offset: safeOffset,
      hasMore: safeOffset + rowsResult.rows.length < total,
    };
  }

  const db = getPaymentsDb();
  const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 20, 100));
  const safeOffset = Math.max(0, Number.parseInt(String(offset), 10) || 0);

  const rows = db
    .prepare(`
      SELECT
        event_id,
        event_type,
        order_id,
        processing_status,
        last_error,
        processed_at
      FROM webhook_events
      WHERE processing_status = 'failed'
      ORDER BY processed_at DESC
      LIMIT ?
      OFFSET ?
    `)
    .all(safeLimit, safeOffset)
    .map((row) => ({
      eventId: row.event_id,
      eventType: row.event_type,
      orderId: row.order_id,
      processingStatus: row.processing_status,
      lastError: row.last_error,
      processedAt: row.processed_at,
    }));

  const totalRow = db
    .prepare("SELECT COUNT(*) AS total FROM webhook_events WHERE processing_status = 'failed'")
    .get();

  const total = Number(totalRow?.total || 0);

  return {
    items: rows,
    total,
    limit: safeLimit,
    offset: safeOffset,
    hasMore: safeOffset + rows.length < total,
  };
}

export async function getFailedWebhookSummary(limit = 10) {
  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 10, 50));

    const totalFailedRow = await pool.query("SELECT COUNT(*) AS total FROM webhook_events WHERE processing_status = 'failed'");
    const byEventTypeRow = await pool.query(
      `
        SELECT
          event_type,
          COUNT(*) AS count
        FROM webhook_events
        WHERE processing_status = 'failed'
        GROUP BY event_type
        ORDER BY count DESC
        LIMIT $1
      `,
      [safeLimit],
    );

    const byErrorRow = await pool.query(
      `
        SELECT
          COALESCE(NULLIF(last_error, ''), 'Unknown error') AS error_message,
          COUNT(*) AS count
        FROM webhook_events
        WHERE processing_status = 'failed'
        GROUP BY error_message
        ORDER BY count DESC
        LIMIT $1
      `,
      [safeLimit],
    );

    const latestFailedRow = await pool.query(
      `
        SELECT MAX(processed_at) AS latest_failed_at
        FROM webhook_events
        WHERE processing_status = 'failed'
      `,
    );

    return {
      totalFailed: Number(totalFailedRow.rows?.[0]?.total || 0),
      latestFailedAt: latestFailedRow.rows?.[0]?.latest_failed_at || null,
      byEventType: byEventTypeRow.rows.map((row) => ({
        eventType: row.event_type || 'UNKNOWN',
        count: Number(row.count || 0),
      })),
      byError: byErrorRow.rows.map((row) => ({
        error: row.error_message,
        count: Number(row.count || 0),
      })),
      limit: safeLimit,
    };
  }

  const db = getPaymentsDb();
  const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 10, 50));
  const totalFailedRow = db
    .prepare("SELECT COUNT(*) AS total FROM webhook_events WHERE processing_status = 'failed'")
    .get();

  const byEventType = db
    .prepare(`
      SELECT
        event_type,
        COUNT(*) AS count
      FROM webhook_events
      WHERE processing_status = 'failed'
      GROUP BY event_type
      ORDER BY count DESC
      LIMIT ?
    `)
    .all(safeLimit)
    .map((row) => ({
      eventType: row.event_type || 'UNKNOWN',
      count: Number(row.count || 0),
    }));

  const byError = db
    .prepare(`
      SELECT
        COALESCE(NULLIF(last_error, ''), 'Unknown error') AS error_message,
        COUNT(*) AS count
      FROM webhook_events
      WHERE processing_status = 'failed'
      GROUP BY error_message
      ORDER BY count DESC
      LIMIT ?
    `)
    .all(safeLimit)
    .map((row) => ({
      error: row.error_message,
      count: Number(row.count || 0),
    }));

  const latestFailed = db
    .prepare(`
      SELECT MAX(processed_at) AS latest_failed_at
      FROM webhook_events
      WHERE processing_status = 'failed'
    `)
    .get();

  return {
    totalFailed: Number(totalFailedRow?.total || 0),
    latestFailedAt: latestFailed?.latest_failed_at || null,
    byEventType,
    byError,
    limit: safeLimit,
  };
}

export async function purgeFailedWebhookEvents(olderThanDays = 30, dryRun = true, limit = 500) {
  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const parsedDays = Number.parseInt(String(olderThanDays), 10);
    const safeDays = Number.isNaN(parsedDays) || parsedDays < 0 ? 30 : parsedDays;
    const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 500, 5000));
    const cutoff = new Date(Date.now() - safeDays * 24 * 60 * 60 * 1000).toISOString();

    const candidateRows = await pool.query(
      `
        SELECT event_id
        FROM webhook_events
        WHERE processing_status = 'failed'
          AND processed_at < $1
        ORDER BY processed_at ASC
        LIMIT $2
      `,
      [cutoff, safeLimit],
    );
    const candidates = candidateRows.rows.map((row) => row.event_id).filter(Boolean);

    let deletedCount = 0;
    if (!dryRun && candidates.length > 0) {
      const deleteResult = await pool.query(
        'DELETE FROM webhook_events WHERE event_id = ANY($1::text[])',
        [candidates],
      );
      deletedCount = Number(deleteResult.rowCount || 0);
    }

    return {
      dryRun: Boolean(dryRun),
      olderThanDays: safeDays,
      limit: safeLimit,
      candidateCount: candidates.length,
      deletedCount,
      sampleEventIds: candidates.slice(0, 20),
      cutoff,
    };
  }

  const db = getPaymentsDb();
  const parsedDays = Number.parseInt(String(olderThanDays), 10);
  const safeDays = Number.isNaN(parsedDays) || parsedDays < 0 ? 30 : parsedDays;
  const safeLimit = Math.max(1, Math.min(Number.parseInt(String(limit), 10) || 500, 5000));
  const cutoff = new Date(Date.now() - safeDays * 24 * 60 * 60 * 1000).toISOString();

  const candidates = db
    .prepare(`
      SELECT event_id
      FROM webhook_events
      WHERE processing_status = 'failed'
        AND processed_at < ?
      ORDER BY processed_at ASC
      LIMIT ?
    `)
    .all(cutoff, safeLimit)
    .map((row) => row.event_id)
    .filter(Boolean);

  let deletedCount = 0;
  if (!dryRun && candidates.length > 0) {
    const placeholders = candidates.map(() => '?').join(', ');
    const result = db
      .prepare(`DELETE FROM webhook_events WHERE event_id IN (${placeholders})`)
      .run(...candidates);
    deletedCount = Number(result?.changes || 0);
  }

  return {
    dryRun: Boolean(dryRun),
    olderThanDays: safeDays,
    limit: safeLimit,
    candidateCount: candidates.length,
    deletedCount,
    sampleEventIds: candidates.slice(0, 20),
    cutoff,
  };
}

export async function getWebhookEventById(eventId) {
  if (!eventId) {
    return null;
  }

  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const result = await pool.query(
      `
        SELECT
          event_id,
          event_type,
          order_id,
          processing_status,
          last_error,
          processed_at
        FROM webhook_events
        WHERE event_id = $1
      `,
      [eventId],
    );

    const row = result.rows[0];
    if (!row) {
      return null;
    }

    return {
      eventId: row.event_id,
      eventType: row.event_type,
      orderId: row.order_id,
      processingStatus: row.processing_status,
      lastError: row.last_error,
      processedAt: row.processed_at,
    };
  }

  const db = getPaymentsDb();
  const row = db
    .prepare(`
      SELECT
        event_id,
        event_type,
        order_id,
        processing_status,
        last_error,
        processed_at
      FROM webhook_events
      WHERE event_id = ?
    `)
    .get(eventId);

  if (!row) {
    return null;
  }

  return {
    eventId: row.event_id,
    eventType: row.event_type,
    orderId: row.order_id,
    processingStatus: row.processing_status,
    lastError: row.last_error,
    processedAt: row.processed_at,
  };
}

export async function requeueFailedWebhookEvent(eventId, reason = 'Manual requeue requested') {
  if (!eventId) {
    return null;
  }

  const safeReason = String(reason || 'Manual requeue requested').slice(0, 500);

  if (usePostgresStorage()) {
    await ensurePostgresSchema();
    const pool = getPaymentsPgPool();
    const result = await pool.query(
      `
        UPDATE webhook_events
        SET
          processing_status = 'failed',
          last_error = $1,
          processed_at = $2
        WHERE event_id = $3
          AND processing_status = 'failed'
      `,
      [safeReason, new Date().toISOString(), eventId],
    );

    if (result.rowCount === 0) {
      return null;
    }

    return getWebhookEventById(eventId);
  }

  const db = getPaymentsDb();
  const result = db
    .prepare(`
      UPDATE webhook_events
      SET
        processing_status = 'failed',
        last_error = ?,
        processed_at = ?
      WHERE event_id = ?
        AND processing_status = 'failed'
    `)
    .run(safeReason, new Date().toISOString(), eventId);

  if (result.changes === 0) {
    return null;
  }

  return getWebhookEventById(eventId);
}

export async function requeueFailedWebhookEvents(limit = 20, offset = 0, reason = 'Manual batch requeue requested') {
  const failedPage = await getFailedWebhookEvents(limit, offset);
  const safeReason = String(reason || 'Manual batch requeue requested').slice(0, 500);
  const events = [];

  for (const event of failedPage.items) {
    const updated = await requeueFailedWebhookEvent(event.eventId, safeReason);
    if (updated) {
      events.push(updated);
    }
  }

  return {
    requested: failedPage.items.length,
    requeuedCount: events.length,
    events,
    totalFailed: failedPage.total,
    limit: failedPage.limit,
    offset: failedPage.offset,
    hasMore: failedPage.hasMore,
  };
}

export function isPaypalDebugAuthorized(req) {
  const configuredToken = process.env.PAYPAL_DEBUG_TOKEN;
  if (!configuredToken) {
    return false;
  }

  const providedHeader = req.headers?.['x-paypal-debug-token'] || req.headers?.['x-debug-token'];
  const providedToken = Array.isArray(providedHeader) ? providedHeader[0] : providedHeader;

  if (!providedToken) {
    return false;
  }

  const providedBuffer = Buffer.from(String(providedToken));
  const configuredBuffer = Buffer.from(configuredToken);

  if (providedBuffer.length !== configuredBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuffer, configuredBuffer);
}

export async function verifyWebhookSignature(req, body) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    return { verified: false, skipped: true, reason: 'PAYPAL_WEBHOOK_ID not set' };
  }

  const headers = req.headers || {};
  const transmissionId = headers['paypal-transmission-id'];
  const transmissionTime = headers['paypal-transmission-time'];
  const transmissionSig = headers['paypal-transmission-sig'];
  const certUrl = headers['paypal-cert-url'];
  const authAlgo = headers['paypal-auth-algo'];

  if (!transmissionId || !transmissionTime || !transmissionSig || !certUrl || !authAlgo) {
    throw new Error('Missing PayPal webhook signature headers.');
  }

  const { accessToken, apiBase } = await getPaypalAccessToken();
  const response = await fetch(`${apiBase}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: transmissionSig,
      transmission_time: transmissionTime,
      webhook_id: webhookId,
      webhook_event: body,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'Failed to verify PayPal webhook signature.');
  }

  return {
    verified: payload.verification_status === 'SUCCESS',
    skipped: false,
  };
}

export function extractOrderIdFromWebhook(body) {
  return (
    body?.resource?.supplementary_data?.related_ids?.order_id
    || body?.resource?.id
    || null
  );
}

export async function createPaypalOrder() {
  const { accessToken, apiBase } = await getPaypalAccessToken();
  const response = await fetch(`${apiBase}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '19.99',
          },
          description: 'Om Shanti Directory - Lifetime Membership',
        },
      ],
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.id) {
    throw new Error(payload.message || 'Unable to create PayPal order.');
  }

  return payload;
}

export async function capturePaypalOrder(orderId) {
  if (!orderId) {
    throw new Error('Missing PayPal order ID.');
  }

  const { accessToken, apiBase } = await getPaypalAccessToken();
  const response = await fetch(`${apiBase}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
  });

  const payload = await response.json();

  if (!response.ok || payload.status !== 'COMPLETED') {
    throw new Error(payload.message || 'Unable to capture PayPal order.');
  }

  return payload;
}