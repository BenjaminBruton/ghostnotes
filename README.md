# Ghost Notes - Indie Short Film Website

A Next.js website for promoting the indie short film "Ghost Notes" with a landing page and casting submission form.

## Features

- 🎬 Landing page with film information, logline, and blog updates
- 📝 Casting submission form with email notifications
- 🎨 Muted color scheme (black, blue, and red)
- 📱 Fully responsive design
- ✉️ Email integration using SendGrid
- 🚀 Ready for Vercel deployment

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Email Service:** SendGrid
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A [SendGrid](https://sendgrid.com) account for email functionality

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. **Configure your environment variables in `.env.local`:**

   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   SENDER_EMAIL=your-verified-sender@example.com
   RECIPIENT_EMAIL=your-email@example.com
   ```

   To get your SendGrid API key:
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Go to Settings → API Keys
   - Create a new API key
   - Copy it to your `.env.local` file
   - See `SENDGRID-SETUP-INSTRUCTIONS.md` for detailed setup

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Email Setup with SendGrid

See `SENDGRID-SETUP-INSTRUCTIONS.md` for complete setup instructions.

### Quick Setup

1. Get your SendGrid API key from Settings → API Keys
2. Verify a sender email in Settings → Sender Authentication
3. Add credentials to `.env.local`
4. Restart your dev server

## Deployment to Vercel

### Step 1: Push to GitHub

1. Initialize a git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push your code:
   ```bash
   git remote add origin https://github.com/yourusername/endofwatch.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** ./
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** .next (default)

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add `SENDGRID_API_KEY` with your SendGrid API key
   - Add `SENDER_EMAIL` with your verified sender email
   - Add `RECIPIENT_EMAIL` with your email address

6. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app`

### Step 3: Custom Domain (Optional)

1. In your Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions

## Customization

### Updating Content

- **Film Title & Info:** Edit `app/page.tsx`
- **Blog Updates:** Add new articles in the "Latest Updates" section in `app/page.tsx`
- **Casting Form Fields:** Modify `app/casting/page.tsx`
- **Colors:** Update theme colors in `tailwind.config.ts`
- **Metadata:** Update SEO info in `app/layout.tsx`

### Color Scheme

The site uses a muted color palette defined in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    black: '#0a0a0a',  // Background
    blue: '#1e3a5f',   // Borders and accents
    red: '#8b2e2e',    // Call-to-action elements
  },
}
```

## Project Structure

```
EndOfWatch/
├── app/
│   ├── api/
│   │   └── submit-casting/
│   │       └── route.ts          # API endpoint for form submissions
│   ├── casting/
│   │   └── page.tsx              # Casting submission page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with navigation
│   └── page.tsx                  # Landing page
├── .env.local                    # Environment variables (not in git)
├── .env.example                  # Example environment variables
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Support

For issues with:
- **Next.js:** [Next.js Documentation](https://nextjs.org/docs)
- **SendGrid:** [SendGrid Documentation](https://docs.sendgrid.com)
- **Vercel:** [Vercel Documentation](https://vercel.com/docs)
- **Tailwind CSS:** [Tailwind Documentation](https://tailwindcss.com/docs)

## License

This project is open source and available for personal and commercial use.

---

© 2026 Ghost Notes. All rights reserved.
