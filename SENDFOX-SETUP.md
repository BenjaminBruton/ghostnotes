# SendFox Integration Setup Guide

## Overview
This guide will help you set up SendFox integration for the newsletter system, providing automatic subscriber management and persistence.

## Prerequisites
- A SendFox account (Lifetime or Empire plan required for API access)
- Access to your SendFox account settings

## Step-by-Step Setup

### 1. Create a Personal Access Token

1. Log in to your SendFox account
2. Go to **Account Settings** → **API Tokens**: https://sendfox.com/account/oauth
3. Under **Personal Access Token**, click **"Create Token"**
4. Give it a descriptive name (e.g., "Ghost Notes Website")
5. Copy the generated token (you'll only see this once!)
6. Save it securely - you'll need it for the next step

### 2. Get Your List ID

You need to know which SendFox list subscribers should be added to:

**Option A: Via SendFox Dashboard**
1. Go to your SendFox Lists page
2. Click on the list you want to use for newsletter subscribers
3. Look at the URL - it will be something like: `https://sendfox.com/lists/12345`
4. The number at the end (`12345`) is your List ID

**Option B: Via API (if you prefer)**
```bash
curl -X GET https://api.sendfox.com/lists \
  -H "Authorization: Bearer YOUR_SENDFOX_TOKEN"
```
This will return all your lists with their IDs.

### 3. Add Environment Variables

Add these variables to your `.env.local` file:

```env
# SendFox API Configuration
SENDFOX_API_TOKEN=your_personal_access_token_here
SENDFOX_LIST_ID=12345
```

**Important**: 
- Replace `your_personal_access_token_here` with the token from Step 1
- Replace `12345` with your actual List ID from Step 2
- Make sure these are in `.env.local` (NOT `.env.example`)

### 4. Verify Setup

Restart your development server:
```bash
npm run dev
```

Test the newsletter signup:
1. Go to your homepage
2. Fill out the newsletter form
3. Check your SendFox dashboard - the contact should appear in your list!

## How It Works

### Newsletter Subscription Flow

1. **User subscribes** via the form on the homepage
2. **SendFox API** receives the contact:
   - Email address (required)
   - First name (if provided)
   - Automatically added to your specified list
3. **Confirmation emails sent**:
   - Subscriber receives welcome email
   - You receive notification email
4. **Data persisted** in SendFox for future campaigns

### Unsubscribe Flow

1. **User visits** `/unsubscribe` page
2. **Enters email** and clicks unsubscribe
3. **SendFox API** marks contact as unsubscribed
4. **Confirmation** shown to user

## API Endpoints Created

### `POST /api/subscribe-newsletter`
Handles new newsletter subscriptions:
- Validates email
- Adds contact to SendFox
- Sends confirmation emails
- Returns success/error response

### `POST /api/unsubscribe-newsletter`
Handles unsubscribe requests:
- Validates email
- Unsubscribes from SendFox
- Returns confirmation

## Pages Created

### `/unsubscribe`
Dedicated unsubscribe page where users can opt out of emails:
- Simple email input form
- Success confirmation message
- Link back to homepage
- Styled to match site theme

## Features

### ✅ Automatic Subscriber Management
- Contacts automatically added to SendFox
- No manual data entry needed
- All subscriber data persisted in SendFox

### ✅ Duplicate Handling
- SendFox returns 422 if contact already exists
- System handles this gracefully (not treated as error)
- No duplicate contacts created

### ✅ Error Resilience
- If SendFox API fails, email notifications still sent
- Logs errors for debugging
- User experience not affected by API issues

### ✅ Unsubscribe Functionality
- Dedicated unsubscribe page
- Links included in all newsletter emails
- Compliant with email marketing best practices

### ✅ Rate Limiting
- SendFox API: 60 requests per minute
- For normal newsletter usage, this is more than sufficient

## SendFox Dashboard

After setup, you can:
- View all subscribers in your SendFox list
- Send campaigns to your list
- Create automations
- View engagement metrics
- Export subscriber data
- Segment your audience

## Sending Your First Campaign

1. Log in to SendFox
2. Go to **Campaigns** → **Create Campaign**
3. Choose your list (the one with your newsletter subscribers)
4. Design your email
5. Send immediately or schedule for later

## Troubleshooting

### "SendFox API error" in logs
- **Check**: Is your `SENDFOX_API_TOKEN` correct?
- **Check**: Do you have a Lifetime or Empire plan?
- **Check**: Is your account in good standing?

### Contact not appearing in SendFox
- **Check**: Is `SENDFOX_LIST_ID` correct?
- **Check**: Look in server logs for error messages
- **Try**: Test with SendFox API directly:
  ```bash
  curl -X POST https://api.sendfox.com/contacts \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","first_name":"Test"}'
  ```

### Unsubscribe not working
- **Check**: Same token verification as above
- **Check**: Is the email exactly as it appears in SendFox?

## Security Notes

- ✅ Personal Access Token stored in `.env.local` (not committed to git)
- ✅ Token never exposed to frontend/client
- ✅ All API calls made server-side only
- ✅ Environment variables required for production deployment

## Production Deployment

When deploying to Vercel (or other platforms):

1. Add environment variables in your hosting dashboard:
   - `SENDFOX_API_TOKEN`
   - `SENDFOX_LIST_ID`
   - `NEXT_PUBLIC_BASE_URL` (your production URL)

2. Redeploy your application

3. Test newsletter signup on production site

## Additional Resources

- [SendFox API Documentation](https://sendfox.com/developer/docs/)
- [SendFox Help Center](https://help.sendfox.com)
- [Your API Tokens Page](https://sendfox.com/account/oauth)

## Support

If you need help:
1. Check SendFox API documentation
2. Look at server logs for detailed error messages
3. Verify all environment variables are set correctly
4. Test API calls directly with curl to isolate issues
