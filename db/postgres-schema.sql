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
