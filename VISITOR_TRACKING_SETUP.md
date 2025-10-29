# Visitor Tracking Setup Guide

## 🎯 What This Does

Your portfolio now tracks every visitor and sends you an email notification with:
- ⏰ Visit timestamp
- 📍 Location (City, Country)
- 🌐 IP Address
- 🖥️ Screen Resolution
- 🌍 Language & Timezone
- 🔗 Referrer (where they came from)
- 📱 Device information

## 📧 Setup Email Notifications

### Option 1: Using Resend (Recommended - Free & Easy)

1. **Create a Resend account** (free):
   - Go to https://resend.com/signup
   - Sign up with your email

2. **Get your API key**:
   - Go to https://resend.com/api-keys
   - Click "Create API Key"
   - Copy the key (starts with `re_...`)

3. **Add to Vercel**:
   - Go to your Vercel dashboard: https://vercel.com/dashboard
   - Select your project: `Pavan_lambole_Portfolio`
   - Go to Settings → Environment Variables
   - Add these variables:
     ```
     Name: RESEND_API_KEY
     Value: re_your_api_key_here
     
     Name: NOTIFICATION_EMAIL
     Value: your-email@gmail.com
     ```
   - Click "Save"

4. **Redeploy**:
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment

### Option 2: Using Gmail (Free but requires App Password)

If you prefer Gmail, I can modify the API to use Nodemailer with Gmail SMTP:

1. Enable 2-Step Verification on your Google account
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Add to Vercel environment variables:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-app-password
   NOTIFICATION_EMAIL=your-email@gmail.com
   ```

Let me know if you want to use Gmail instead of Resend.

## 🔒 Privacy & Performance

- Tracking only happens once per session (not on every page)
- Uses sessionStorage to prevent duplicate tracking
- IP lookup is done server-side
- No personal data is stored (only sent to your email)
- Lightweight - doesn't slow down your site

## 📊 What You'll Receive

Every time someone visits your portfolio, you'll get an email like:

```
Subject: 🎯 New Visitor from Mumbai, India - Oct 30, 2025, 2:59:30 PM IST

⏰ Time: Wednesday, October 30, 2025 at 2:59:30 PM GMT+5:30
📍 Location: Mumbai, India
🌐 IP Address: 103.xxx.xxx.xxx
🖥️ Screen: 1920x1080
🌍 Language: en-US
⏱️ Timezone: Asia/Kolkata
🔗 Referrer: https://google.com
📱 Device: Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
🔗 Page URL: https://pavanlambole.vercel.app/
```

## 🚀 Current Status

✅ Frontend tracking code integrated
✅ API endpoint created (`/api/track-visitor`)
✅ Vercel serverless function configured
⏳ Waiting for email service credentials

## Next Steps

1. Choose email service (Resend recommended)
2. Add API keys to Vercel environment variables
3. Push changes to deploy
4. Test by visiting your site in incognito mode
5. Check your email for notification!

## 🛠️ Testing

After setup, test by:
1. Opening your site in incognito/private mode
2. Wait 2-3 seconds
3. Check your email inbox
4. You should see the visitor notification!

## 📝 Notes

- Free tier of Resend: 100 emails/day
- IP API (ipapi.co): 1000 requests/day free
- Tracking happens 2 seconds after page load (won't slow down site)
- One email per browser session (not per page view)
