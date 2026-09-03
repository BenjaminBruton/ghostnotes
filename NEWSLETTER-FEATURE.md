# Newsletter Signup Feature

## Overview
A newsletter signup section has been added to the home page to allow visitors to subscribe for updates about the film's progress.

## Files Created/Modified

### 1. `/app/api/subscribe-newsletter/route.ts` (NEW)
- API endpoint that handles newsletter subscription requests
- Validates email addresses
- Sends two emails using SendGrid:
  - **Notification email** to the film team with subscriber details
  - **Confirmation email** to the subscriber welcoming them

### 2. `/app/page.tsx` (MODIFIED)
- Converted to a client component with `"use client"` directive
- Added state management for the newsletter form
- Added newsletter signup form UI between "Latest Updates" and "Get Involved" sections
- Includes form validation and user feedback

## Features

### User Experience
- **Two-field form**: Optional name field and required email field
- **Responsive design**: Works on mobile and desktop
- **Loading states**: Shows "Subscribing..." while processing
- **Success/Error feedback**: Visual confirmation with color-coded messages
- **Form reset**: Clears fields after successful submission
- **Privacy notice**: Reassures users about data handling

### Email Notifications

#### Confirmation Email (to Subscriber)
Includes:
- Welcome message
- List of what updates they'll receive
- Film logline
- Professional styling matching the site theme

#### Notification Email (to Film Team)
Includes:
- Subscriber's name (if provided)
- Email address
- Subscription timestamp

## Styling
- Matches existing design system using:
  - `primary-blue` for borders and accents
  - `primary-red` for the submit button
  - `primary-black` for input backgrounds
- Consistent with other forms on the site (casting, crew)

## Usage

### For Visitors
1. Visit the home page
2. Scroll to "Stay Updated" section
3. Enter name (optional) and email (required)
4. Click "Subscribe to Updates"
5. Receive confirmation email

### For Administrators
- All subscriptions are emailed to `RECIPIENT_EMAIL` (from `.env.local`)
- Store/manage subscriber emails as needed for your email marketing platform

## Environment Variables Required
Ensure these are set in `.env.local`:
- `SENDGRID_API_KEY` - Your SendGrid API key
- `SENDER_EMAIL` - Your verified SendGrid sender email
- `RECIPIENT_EMAIL` - Email address to receive subscription notifications

## Testing
1. Start the dev server: `npm run dev`
2. Visit http://localhost:3000
3. Test the newsletter form with a valid email
4. Check both inboxes for confirmation emails

## Future Enhancements
Consider adding:
- Database storage for subscribers (MongoDB, PostgreSQL, etc.)
- Integration with email marketing platforms (Mailchimp, ConvertKit, etc.)
- Unsubscribe functionality
- Admin dashboard to view/manage subscribers
- Email preferences/frequency options
