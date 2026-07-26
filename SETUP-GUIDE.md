# Quick Setup Guide

## ✅ What's Been Created

Your "Ghost Notes" indie film website is ready! Here's what you have:

### Pages
1. **Landing Page** (`/`) - Features your film's title, logline, story, and blog updates
2. **Casting Page** (`/casting`) - Professional casting submission form
3. **Crew Page** (`/crew`) - Professional crew submission form

### Features
- Muted color scheme (black #0a0a0a, blue #1e3a5f, red #8b2e2e)
- Fully responsive design
- Email notifications for casting submissions
- Clean, professional layout

## 🚀 Next Steps

### 1. Set Up Email (IMPORTANT)

To receive casting form submissions, you need to configure email:

1. **Use your SendGrid account**:
   - Log in to https://app.sendgrid.com
   - Navigate to Settings → API Keys
   - Create a new API key with "Mail Send" permissions
   - Verify a sender email in Settings → Sender Authentication

2. **Update your `.env.local` file**:
   ```env
   SENDGRID_API_KEY=SG.your_actual_api_key_here
   SENDER_EMAIL=your-verified-sender@example.com
   RECIPIENT_EMAIL=your-email@example.com
   ```

   See `SENDGRID-SETUP-INSTRUCTIONS.md` for complete details.

3. **Restart the development server** after updating `.env.local`

### 2. Customize Content

Edit these files to personalize your site:

- **`app/page.tsx`** - Update film information, logline, and blog posts
- **`app/layout.tsx`** - Change metadata (title, description, author name)
- **`app/casting/page.tsx`** - Modify form fields if needed

### 3. Deploy to Vercel

When ready to go live:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variables:
     - `SENDGRID_API_KEY`
     - `SENDER_EMAIL`
     - `RECIPIENT_EMAIL`
   - Click "Deploy"

## 📝 Testing Checklist

- [ ] Set up SendGrid API key in `.env.local`
- [ ] Add sender email and recipient email to `.env.local`
- [ ] Test the casting and crew form submissions
- [ ] Verify you receive the email
- [ ] Update film content on landing page
- [ ] Customize blog posts
- [ ] Test on mobile devices
- [ ] Deploy to Vercel

## 🎨 Color Reference

Your site uses these muted colors:
- **Background:** `#0a0a0a` (near black)
- **Borders/Accents:** `#1e3a5f` (muted blue)
- **CTAs/Highlights:** `#8b2e2e` (muted red)

These can be changed in `tailwind.config.ts`

## 📧 Email Template

Casting submissions will be sent with:
- Professional HTML formatting
- All form fields included
- Branded with your film's colors
- Easy to read on mobile and desktop

## ⚠️ Important Notes

1. **SendGrid Plan**: Use your existing SendGrid paid plan for email delivery
2. **Custom Domain**: Consider setting up domain authentication in SendGrid for better deliverability
3. **Environment Variables**: Never commit `.env.local` to git (it's already in `.gitignore`)
4. **Form Testing**: Test the form locally before deploying

## 🆘 Need Help?

- Check the full `README.md` for detailed documentation
- Check `SENDGRID-SETUP-INSTRUCTIONS.md` for email setup
- SendGrid docs: https://docs.sendgrid.com
- Next.js docs: https://nextjs.org/docs
- Vercel docs: https://vercel.com/docs

---

Your website is running at: **http://localhost:3000**
