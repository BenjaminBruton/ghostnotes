# SendFox Integration - Quick Start Checklist

Follow these steps to get your newsletter system working with SendFox.

## ☐ Step 1: Get Your Personal Access Token

1. Log in to SendFox: https://sendfox.com
2. Go to Account Settings → API Tokens: https://sendfox.com/account/oauth
3. Under "Personal Access Token", click **"Create Token"**
4. Name it: `Ghost Notes Website`
5. **COPY THE TOKEN** (you'll only see it once!)
6. Save it somewhere safe temporarily

## ☐ Step 2: Get Your List ID

1. Go to your SendFox Lists page
2. Create a new list (or use existing): `Ghost Notes Newsletter`
3. Click on the list to open it
4. Look at the browser URL bar
5. Find the number at the end: `https://sendfox.com/lists/12345`
6. That number (`12345`) is your List ID
7. Write it down

## ☐ Step 3: Add to Environment Variables

1. Open your `.env.local` file (in the project root)
2. Add these lines:

```env
# SendFox Configuration
SENDFOX_API_TOKEN=paste_your_token_here
SENDFOX_LIST_ID=paste_your_list_id_here
```

3. Replace `paste_your_token_here` with the token from Step 1
4. Replace `paste_your_list_id_here` with the number from Step 2
5. Save the file

## ☐ Step 4: Restart Your Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## ☐ Step 5: Test It!

### Test Subscription
1. Open http://localhost:3000 in your browser
2. Scroll to the "Stay Updated" section
3. Enter your email and name
4. Click "Subscribe to Updates"
5. You should see a success message

### Verify in SendFox
1. Go to your SendFox dashboard
2. Click on your list
3. You should see your test contact!

### Test Unsubscribe
1. Go to http://localhost:3000/unsubscribe
2. Enter the same email
3. Click "Unsubscribe"
4. Check SendFox - contact should be marked as unsubscribed

## ✅ Done!

Your newsletter system is now fully integrated with SendFox!

## What Happens Now?

Every time someone subscribes:
- ✅ They're automatically added to your SendFox list
- ✅ They receive a welcome email
- ✅ You receive a notification email
- ✅ Their data is saved in SendFox forever

## Next: Send Your First Campaign

1. Log in to SendFox
2. Go to **Campaigns** → **Create Campaign**
3. Choose your "Ghost Notes Newsletter" list
4. Write your update email
5. Send or schedule it!

## Troubleshooting

### "SendFox API error" in console
- **Check**: Did you copy the token correctly?
- **Check**: Is it the Personal Access Token (not OAuth)?
- **Check**: Do you have Lifetime or Empire plan?

### Contact not showing in SendFox
- **Check**: Is the List ID correct?
- **Check**: Look at browser console for errors
- **Try**: Test API directly with curl (see SENDFOX-SETUP.md)

### Still stuck?
- Read `SENDFOX-SETUP.md` for detailed troubleshooting
- Check server logs for error messages
- Verify all environment variables are set

## Important Notes

- ⚠️ Never commit `.env.local` to git (it's in `.gitignore`)
- ⚠️ Keep your API token secret
- ⚠️ Free SendFox accounts don't have API access
- ✅ System works even if SendFox fails (email notifications still sent)

## Production Deployment

When deploying to Vercel:
1. Add `SENDFOX_API_TOKEN` to Vercel environment variables
2. Add `SENDFOX_LIST_ID` to Vercel environment variables
3. Redeploy
4. Test on production site

---

**Need more help?** See `SENDFOX-SETUP.md` for the complete guide.
