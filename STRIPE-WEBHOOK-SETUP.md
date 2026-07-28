# Stripe Webhook Setup Instructions

To receive donation notifications and send confirmation emails, you need to set up Stripe webhooks.

## For Production (Vercel)

### 1. Deploy Your Site First
Make sure your site is deployed to Vercel and you have the URL.

### 2. Create Webhook in Stripe Dashboard

1. Go to https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Enter your endpoint URL:
   ```
   https://www.ghostnotesshortfilm.com/api/webhooks/stripe
   ```
   (Replace with your actual domain)

4. Select events to listen to:
   - Click **"Select events"**
   - Find and check: `checkout.session.completed`
   - Click **"Add events"**

5. Click **"Add endpoint"**

### 3. Get Your Webhook Secret

1. After creating the webhook, click on it
2. Click **"Reveal"** next to "Signing secret"
3. Copy the secret (starts with `whsec_`)

### 4. Add to Vercel Environment Variables

1. Go to your Vercel project → **Settings → Environment Variables**
2. Add a new variable:
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_your_actual_secret_here`
3. Save and redeploy

## For Local Testing (Optional)

To test webhooks locally, you'll need the Stripe CLI:

### 1. Install Stripe CLI
```bash
brew install stripe/stripe-cli/stripe
```

### 2. Login to Stripe
```bash
stripe login
```

### 3. Forward Webhooks to Local Server
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will give you a webhook secret starting with `whsec_` - add it to your `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_local_test_secret_here
```

### 4. Test a Payment
In another terminal:
```bash
stripe trigger checkout.session.completed
```

## What Happens When Someone Donates:

1. **Checkout collects:**
   - Email address
   - Phone number
   - Billing address
   - Shipping address (for t-shirt/physical rewards)

2. **Emails sent automatically:**
   - **To donor:** Thank you email with donation details and rewards info
   - **To you:** Notification with donor info, amount, tier, and address for fulfillment

3. **You receive:**
   - Donor's full name
   - Email and phone
   - Shipping address for physical rewards
   - Which rewards they're entitled to

## Testing the Webhook:

1. Make a test donation on your site
2. Check the Stripe Dashboard → Webhooks → [Your Endpoint]
3. You should see a "Succeeded" event for `checkout.session.completed`
4. Check your email for both confirmation and notification

## Troubleshooting:

### "Webhook signature verification failed"
- Make sure `STRIPE_WEBHOOK_SECRET` is set correctly in Vercel
- Redeploy after adding the secret

### Not receiving emails
- Check Stripe Dashboard → Webhooks to see if webhook is being called
- Check Vercel logs for any errors
- Verify SendGrid credentials are set

### Wrong URL in webhook
- Update the endpoint URL in Stripe Dashboard
- Must match your deployed Vercel URL exactly

---

**Important:** Keep your webhook secret secure - never commit it to Git!
