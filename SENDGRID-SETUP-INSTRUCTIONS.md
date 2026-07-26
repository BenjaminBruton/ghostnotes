# SendGrid Setup Instructions

Follow these steps to get your casting and crew forms sending emails using your SendGrid account!

## Step 1: Get Your SendGrid API Key

1. Log in to your **SendGrid account** at https://app.sendgrid.com
2. Navigate to **Settings → API Keys** (in the left sidebar)
3. Click **"Create API Key"**
4. Give it a name (e.g., "Ghost Notes Forms")
5. Select **"Full Access"** (or at minimum "Mail Send" permissions)
6. Click **"Create & View"**
7. **IMPORTANT:** Copy the API key immediately - you won't be able to see it again!
   - It will look something like: `SG.abc123xyz...`

## Step 2: Verify a Sender Email (If Not Already Done)

SendGrid requires you to verify the email address you'll be sending from.

### Option A: Single Sender Verification (Quick & Easy)
1. Go to **Settings → Sender Authentication → Single Sender Verification**
2. Click **"Create New Sender"**
3. Fill in your details (use the email you want to send from)
4. SendGrid will send a verification email - click the link to verify

### Option B: Domain Authentication (Better for Production)
1. Go to **Settings → Sender Authentication → Domain Authentication**
2. Follow the wizard to authenticate your domain
3. Add the DNS records to your domain provider
4. Wait for verification

**Note:** You can use the same email for both sending and receiving if you want.

## Step 3: Update Your Environment Variables

1. Open the file **`.env.local`** in your EndOfWatch project folder
2. Replace the placeholder values with your real information:

```env
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key_here
SENDER_EMAIL=verified-email@yourdomain.com
RECIPIENT_EMAIL=your-email@example.com
```

**Example:**
```env
SENDGRID_API_KEY=SG.abc123xyz789_your_actual_key
SENDER_EMAIL=casting@myfilm.com
RECIPIENT_EMAIL=john@gmail.com
```

**Important Notes:**
- `SENDGRID_API_KEY` - Your SendGrid API key from Step 1
- `SENDER_EMAIL` - The email you verified in Step 2 (emails will appear to come "from" this address)
- `RECIPIENT_EMAIL` - Where you want to receive the form submissions (your personal email)

3. **Save the file**

## Step 4: Restart Your Development Server

1. In your terminal, press `Ctrl+C` to stop the current server
2. Run `npm run dev` again to start it with the new environment variables

```bash
npm run dev
```

## Step 5: Test the Forms!

1. Open **http://localhost:3000/casting** or **http://localhost:3000/crew**
2. Fill out the form with test data
3. Click "Submit Application"
4. Check your email inbox (RECIPIENT_EMAIL) - you should receive a nicely formatted email!

## Troubleshooting

### "API key invalid" error
- Make sure you copied the entire API key from SendGrid (starts with `SG.`)
- Check that there are no extra spaces in your `.env.local` file
- Ensure you selected proper permissions when creating the API key
- Restart your dev server after updating `.env.local`

### "Sender email not verified" error
- Make sure the SENDER_EMAIL matches exactly what you verified in SendGrid
- Check your SendGrid dashboard to confirm the sender is verified
- If using domain authentication, ensure DNS records are properly configured

### Not receiving emails
- Check your spam/junk folder
- Verify the RECIPIENT_EMAIL is correct in `.env.local`
- Make sure you restarted the dev server after updating `.env.local`
- Check SendGrid Activity dashboard for email delivery status
- Check the browser console (F12 → Console tab) for any errors

### Form shows error message
- Open browser Developer Tools (F12) and check the Console tab
- Check your terminal where `npm run dev` is running for error messages
- The error message will help identify the issue

## SendGrid Features You Already Have

✅ **Better Deliverability:** SendGrid has excellent email deliverability rates  
✅ **Email Analytics:** View email opens, clicks, bounces in SendGrid dashboard  
✅ **Activity Feed:** See all sent emails in SendGrid's Activity section  
✅ **Professional Sending:** Your existing paid SendGrid plan gives you higher limits

## Current Status

✅ Project is set up  
✅ Forms are built  
✅ Email templates are ready  
✅ SendGrid integration configured  
⏳ **You need to:** Add your SendGrid credentials to `.env.local`

Once you complete Step 3 and Step 4, your forms will be fully functional!

## For Deployment to Vercel

When you deploy to Vercel, you'll need to add these same environment variables:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - `SENDGRID_API_KEY` = your SendGrid API key
   - `SENDER_EMAIL` = your verified sender email
   - `RECIPIENT_EMAIL` = where you want to receive submissions

---

**Need help?** Check out the SendGrid documentation: https://docs.sendgrid.com
