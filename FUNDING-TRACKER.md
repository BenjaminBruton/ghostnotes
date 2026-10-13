# Funding Tracker - How It Works

## Automatic Updates

When a Stripe payment succeeds:
1. Stripe webhook fires → `/api/webhooks/stripe`
2. Webhook updates funding → `/api/funding` POST
3. Amount added to `/data/funding.json`
4. Blood bags show updated total

## Files

- `/data/funding.json` - Stores total ($465 currently)
- `/app/api/funding/route.ts` - GET/POST endpoint
- `/app/crowdfunding/page.tsx` - Fetches & displays

## Testing

```bash
# Get funding
curl http://localhost:3000/api/funding

# Add $50
curl -X POST http://localhost:3000/api/funding \
  -H 'Content-Type: application/json' \
  -d '{"amount": 50}'
```

## Goals

- Bag 1: $2,000 - Food, Gas, Labor
- Bag 2: $3,000 - Equipment
- Bag 3: $4,000 - Bonuses & Marketing

## Production Note

For Vercel: Migrate to Vercel KV or database (file storage is ephemeral)