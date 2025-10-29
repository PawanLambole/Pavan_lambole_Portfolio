// Vercel Serverless Function for visitor tracking
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface VisitorData {
  name?: string;
  timestamp: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  timezone: string;
  referrer: string;
  pageUrl: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const visitorData: VisitorData = req.body;
    
    // Get IP from request
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown';
    
    // Get location from IP
    let location = 'Unknown';
    try {
      const ipResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const ipData = await ipResponse.json();
      location = `${ipData.city || 'Unknown'}, ${ipData.country_name || 'Unknown'}`;
    } catch (error) {
      console.error('IP lookup failed:', error);
    }

    // Prepare email content
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #FF9933, #138808); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .info-row { padding: 10px 0; border-bottom: 1px solid #ddd; }
    .label { font-weight: bold; color: #FF9933; }
    .value { color: #333; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎉 New Visitor on Your Portfolio!</h2>
      ${visitorData.name ? `<h3 style="margin-top: 10px; font-size: 18px;">👤 ${visitorData.name}</h3>` : ''}
    </div>
    <div class="content">
      ${visitorData.name ? `
      <div class="info-row">
        <span class="label">👤 Name:</span>
        <span class="value">${visitorData.name}</span>
      </div>
      ` : ''}
      <div class="info-row">
        <span class="label">⏰ Time:</span>
        <span class="value">${new Date(visitorData.timestamp).toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'long'
        })}</span>
      </div>
      <div class="info-row">
        <span class="label">📍 Location:</span>
        <span class="value">${location}</span>
      </div>
      <div class="info-row">
        <span class="label">🌐 IP Address:</span>
        <span class="value">${ip}</span>
      </div>
      <div class="info-row">
        <span class="label">🖥️ Screen:</span>
        <span class="value">${visitorData.screenResolution}</span>
      </div>
      <div class="info-row">
        <span class="label">🌍 Language:</span>
        <span class="value">${visitorData.language}</span>
      </div>
      <div class="info-row">
        <span class="label">⏱️ Timezone:</span>
        <span class="value">${visitorData.timezone}</span>
      </div>
      <div class="info-row">
        <span class="label">🔗 Referrer:</span>
        <span class="value">${visitorData.referrer}</span>
      </div>
      <div class="info-row">
        <span class="label">📱 Device:</span>
        <span class="value">${visitorData.userAgent}</span>
      </div>
      <div class="info-row">
        <span class="label">🔗 Page URL:</span>
        <span class="value">${visitorData.pageUrl}</span>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Send email using Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_Lcg9jHFM_MYYkmquaFN7XeqxWArji6GxK';
    const YOUR_EMAIL = process.env.NOTIFICATION_EMAIL || 'pavanlambole578@gmail.com';

    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Tracker <onboarding@resend.dev>',
          to: [YOUR_EMAIL],
          subject: `🎯 ${visitorData.name ? visitorData.name + ' visited' : 'New Visitor'} from ${location} - ${new Date(visitorData.timestamp).toLocaleString()}`,
          html: emailContent,
        }),
      });
    }

    return res.status(200).json({ success: true, message: 'Visitor tracked' });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
