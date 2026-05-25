import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { Client } from 'pg';

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const idx = trimmed.indexOf('=');
    if (idx === -1) {
      continue;
    }

    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function resolveSqlitePath() {
  const configuredPath = process.env.PAYMENTS_STORE_FILE;
  if (configuredPath) {
    return configuredPath;
  }

  if (process.env.VERCEL) {
    return '/tmp/omshanti-payments.db';
  }

  return `${process.cwd()}/.payments-store.db`;
}

async function main() {
  parseEnvFile(path.join(process.cwd(), '.env.local'));
  parseEnvFile(path.join(process.cwd(), '.env'));

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('Missing DATABASE_URL. Set it in environment or .env.local before running migration.');
  }

  const sqlitePath = resolveSqlitePath();
  if (!fs.existsSync(sqlitePath)) {
    throw new Error(`SQLite source file not found at: ${sqlitePath}`);
  }

  const sqlite = new DatabaseSync(sqlitePath);
  const pg = new Client({ connectionString: databaseUrl });

  await pg.connect();

  const schemaSql = fs.readFileSync(path.join(process.cwd(), 'db', 'postgres-schema.sql'), 'utf8');

  await pg.query('BEGIN');
  try {
    await pg.query(schemaSql);

    const payments = sqlite.prepare(`
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
    `).all();

    for (const row of payments) {
      await pg.query(
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
          row.order_id,
          row.status,
          row.payer_email,
          row.payer_id,
          row.capture_id,
          row.amount,
          row.currency,
          row.source,
          row.updated_at,
          row.raw_json,
        ],
      );
    }

    const webhookEvents = sqlite.prepare(`
      SELECT
        event_id,
        event_type,
        order_id,
        processing_status,
        last_error,
        processed_at
      FROM webhook_events
    `).all();

    for (const row of webhookEvents) {
      await pg.query(
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
            order_id = EXCLUDED.order_id,
            processing_status = EXCLUDED.processing_status,
            last_error = EXCLUDED.last_error,
            processed_at = EXCLUDED.processed_at
        `,
        [
          row.event_id,
          row.event_type,
          row.order_id,
          row.processing_status || 'processed',
          row.last_error,
          row.processed_at,
        ],
      );
    }

    await pg.query('COMMIT');

    console.log(`Migrated payments: ${payments.length}`);
    console.log(`Migrated webhook events: ${webhookEvents.length}`);
    console.log('SQLite -> Postgres migration completed.');
  } catch (error) {
    await pg.query('ROLLBACK');
    throw error;
  } finally {
    await pg.end();
  }
}

main().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
