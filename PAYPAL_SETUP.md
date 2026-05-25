# Om Shanti Directory - PayPal Payment Setup

## Current Status
✅ Payment gate implemented and live at `http://localhost:5173/`  
✅ UI complete with $19.99 one-time lifetime membership  
✅ server-side PayPal order creation and capture  
✅ server-issued HttpOnly membership session after verified capture  
✅ PayPal SDK now loads from `VITE_PAYPAL_CLIENT_ID`  
⚠️ **NEXT STEP:** Add your PayPal credentials to a local env file

## Setup Instructions

### Step 1: Create PayPal Developer Account
1. Go to [PayPal Developer](https://developer.paypal.com)
2. Sign in or create an account
3. Click **Dashboard** in the top menu

### Step 2: Get Your Client ID
1. In Dashboard, click **Apps & Credentials** (left sidebar)
2. Make sure **Sandbox** is selected (for testing)
3. Under **REST API apps**, you'll see a default app (or create a new one)
4. Click on the app name to reveal your **Client ID**
5. Copy the Client ID (looks like: `AVBr_...`)

### Step 3: Create a local env file

Copy the example file:

```bash
copy .env.example .env.local
```

### Step 4: Add your PayPal credentials

Set these values in `.env.local`:

```env
VITE_PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_CLIENT_SECRET
PAYPAL_ENV=sandbox
MEMBERSHIP_SESSION_SECRET=SET_A_LONG_RANDOM_SECRET
PAYPAL_WEBHOOK_ID=YOUR_PAYPAL_WEBHOOK_ID
PAYPAL_WEBHOOK_EVENT_RETENTION_DAYS=30
PAYPAL_WEBHOOK_CLAIM_TIMEOUT_SECONDS=300
PAYPAL_DEBUG_TOKEN=SET_A_LONG_RANDOM_DEBUG_TOKEN
PAYMENTS_STORE_FILE=.payments-store.db
```

### Step 5: Test Payment (Sandbox Mode)
1. Reload `http://localhost:5173/`
2. Click the PayPal button
3. Use PayPal sandbox test account:
   - **Email:** sb-test@paypal.com
   - **Password:** (check your PayPal Developer Dashboard for test account)
4. After successful payment, you'll be redirected to the app
5. Membership is stored in localStorage

## How It Works

**Purchase Flow:**
1. User sees paywall with $19.99 price
2. Clicks PayPal button
3. App requests a server-created PayPal order from `/api/paypal/create-order`
4. PayPal popup opens
5. User completes payment
6. App sends the PayPal order ID to `/api/paypal/capture-order`
7. Server captures the order with PayPal and returns the verified result
8. Server sets a signed `om_shanti_membership` HttpOnly cookie
9. App reads `/api/membership/session` and unlocks access when active

**Membership Persistence:**
- Server issues a signed session cookie named `om_shanti_membership`
- App checks `/api/membership/session` on load
- Payment records are written to the configured SQLite database file (`PAYMENTS_STORE_FILE`)
- Processed webhook event IDs are retained for replay protection (`PAYPAL_WEBHOOK_EVENT_RETENTION_DAYS`)
- Webhook events are status-tracked (`claimed`, `processed`, `failed`) so failed deliveries can be retried safely
- Stale `claimed` events are reclaimable after `PAYPAL_WEBHOOK_CLAIM_TIMEOUT_SECONDS`
- Optional diagnostics endpoint is protected by `PAYPAL_DEBUG_TOKEN`
- Optional manual requeue endpoint (`POST /api/paypal/debug/requeue`) allows retry testing for `failed` events
- Optional failed-events endpoint (`GET /api/paypal/debug/failed`) lists actionable failed events with pagination
- Optional batch requeue endpoint (`POST /api/paypal/debug/requeue-batch`) retries a paged slice of failed events

## Production Checklist

Before going live:
- [ ] Switch from **Sandbox** to **Live** in PayPal Dashboard
- [ ] Get Live Client ID (different from Sandbox)
- [ ] Update `.env.local` with the Live Client ID
- [ ] Set `$19.99` price to your desired amount (in PaymentGate.jsx, line 59)
- [ ] Configure `PAYPAL_WEBHOOK_ID` and enable webhook verification
- [ ] Add order confirmation email system
- [ ] Set up refund policy
- [ ] Consider database to track purchases
- [ ] Implement subscription management / membership recovery

## Current Limitations (Sandbox/MVP)

🔒 **Current Boundaries:**
- Local SQLite file-backed payment store is not a managed production database
- Entitlements are session-cookie based but not yet tied to an account system
- Webhook verification is skipped when `PAYPAL_WEBHOOK_ID` is not configured

✅ **Good For:**
- Development & testing
- MVP demonstration
- Learning

❌ **Not Recommended For Production:**
- Local file storage is ephemeral on most serverless platforms
- No account recovery without user identity linkage
- Incomplete reconciliation if webhooks are not configured and verified

## Suggested Production Upgrades

1. **Persist Entitlements Server-Side:**
   - Store verified orders in a database
   - Bind access to a user identity or email
   - Issue a recoverable membership record

2. **Enable Verified Webhooks:**
   - Configure `PAYPAL_WEBHOOK_ID`
   - Subscribe to capture/refund events in PayPal
   - Sync entitlement status on asynchronous events

3. **Add Admin Panel:**
   - View all purchases
   - Process refunds
   - Track revenue

4. **Add Email Confirmation:**
   - Send receipt after purchase
   - Include license key/access token
   - Allow password reset

5. **Consider Membership Management:**
   - Allow users to download license
   - Account portal for existing members
   - Annual vs lifetime options

## Hosting Notes

- Local development works through Vite middleware on `/api/paypal/*`.
- Production requires a platform that serves the `api/` directory as server-side functions.
- The included API handlers are compatible with Vercel-style serverless routes.

## Support Resources

- [PayPal Developer Docs](https://developer.paypal.com/docs/)
- [PayPal Buttons Integration](https://developer.paypal.com/docs/checkout/integration-features/payments-hub/)
- [Sandbox Testing](https://developer.paypal.com/docs/platforms/get-started/)
