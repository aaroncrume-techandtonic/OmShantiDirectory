# Om Shanti Directory - PayPal Payment Setup

## Current Status
✅ Payment gate implemented and live at `http://localhost:5173/`  
✅ UI complete with $19.99 one-time lifetime membership  
✅ localStorage-based membership tracking  
⚠️ **NEXT STEP:** Connect your PayPal account

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

### Step 3: Update index.html
Replace `YOUR_PAYPAL_CLIENT_ID` in `index.html` line 8:

**Before:**
```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID"></script>
```

**After:**
```html
<script src="https://www.paypal.com/sdk/js?client-id=AVBr_YOUR_ACTUAL_CLIENT_ID_HERE"></script>
```

### Step 4: Test Payment (Sandbox Mode)
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
3. PayPal popup opens
4. User completes payment
5. Order is captured and stored in localStorage
6. App unlocks with full access to all 28 infusions

**Membership Persistence:**
- Purchase data stored in `localStorage['omShantiMembership']`
- Contains: `purchaseDate`, `orderId`, `status`, `amount`
- Persists across browser sessions
- Clears only if user clears browser data

## Production Checklist

Before going live:
- [ ] Switch from **Sandbox** to **Live** in PayPal Dashboard
- [ ] Get Live Client ID (different from Sandbox)
- [ ] Update `index.html` with Live Client ID
- [ ] Set `$19.99` price to your desired amount (in PaymentGate.jsx, line 59)
- [ ] Implement **server-side verification** (currently client-side only)
- [ ] Add order confirmation email system
- [ ] Set up refund policy
- [ ] Consider database to track purchases
- [ ] Implement subscription management / membership recovery

## Current Limitations (Sandbox/MVP)

🔒 **Client-Side Only:**
- Orders verified via localStorage only
- No backend validation
- Can be bypassed (for testing)

✅ **Good For:**
- Development & testing
- MVP demonstration
- Learning

❌ **Not Recommended For Production:**
- Security risk without server validation
- No order history tracking
- No payment reconciliation

## Suggested Production Upgrades

1. **Add Backend Verification:**
   - Store orders in database
   - Verify PayPal transaction ID on backend
   - Issue authentication token

2. **Add Admin Panel:**
   - View all purchases
   - Process refunds
   - Track revenue

3. **Add Email Confirmation:**
   - Send receipt after purchase
   - Include license key/access token
   - Allow password reset

4. **Consider Membership Management:**
   - Allow users to download license
   - Account portal for existing members
   - Annual vs lifetime options

## Support Resources

- [PayPal Developer Docs](https://developer.paypal.com/docs/)
- [PayPal Buttons Integration](https://developer.paypal.com/docs/checkout/integration-features/payments-hub/)
- [Sandbox Testing](https://developer.paypal.com/docs/platforms/get-started/)
