// POST /api/email/send
// Sends an anonymous question notification email via Resend
import { cors, handleOptions } from '../lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const { to_email, question } = req.body || {};

  if (!to_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to_email)) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }
  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'Question text is required.' });
  }
  if (question.trim().length > 500) {
    return res.status(400).json({ error: 'Question too long (max 500 chars).' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  const siteUrl = process.env.SITE_URL || 'https://sasha-bald.vercel.app';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        body { font-family: Inter, system-ui, sans-serif; background: #0f0f13; color: #e8e8f0; margin: 0; padding: 0; }
        .wrap { max-width: 520px; margin: 40px auto; padding: 0 20px; }
        .card { background: #1a1a24; border: 1px solid #2e2e44; border-radius: 14px; padding: 36px; }
        .logo { font-size: 1.5rem; font-weight: 800; color: #e8e8f0; margin-bottom: 24px; }
        .logo span { color: #7c5cfc; }
        h2 { font-size: 1.2rem; margin: 0 0 20px; color: #e8e8f0; }
        .question-box {
          background: #232333; border-left: 4px solid #7c5cfc;
          border-radius: 0 8px 8px 0; padding: 18px 20px;
          font-size: 1.05rem; color: #e8e8f0; line-height: 1.6;
          margin-bottom: 28px;
        }
        .muted { color: #8888aa; font-size: 0.9rem; margin-bottom: 24px; line-height: 1.6; }
        .btn {
          display: inline-block; background: #7c5cfc; color: #fff;
          padding: 14px 28px; border-radius: 8px; font-weight: 700;
          font-size: 0.95rem; text-decoration: none;
        }
        .footer { margin-top: 28px; font-size: 0.8rem; color: #555577; text-align: center; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="card">
          <div class="logo">Anon<span>Q</span></div>
          <h2>💬 Someone sent you an anonymous question</h2>
          <div class="question-box">${question.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</div>
          <p class="muted">They want to stay anonymous — so we can't tell you who it is 🤫<br>Sign up for free to answer and share your own question link.</p>
          <a href="${siteUrl}/register.html" class="btn">Sign up & answer →</a>
        </div>
        <div class="footer">AnonQ · Anonymous Q&amp;A · <a href="${siteUrl}" style="color:#7c5cfc;">anonq</a></div>
      </div>
    </body>
    </html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AnonQ <onboarding@resend.dev>',
        to: [to_email],
        subject: '💬 Someone sent you an anonymous question on AnonQ',
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error', data);
      return res.status(500).json({ error: data.message || 'Failed to send email.' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('email send error', e);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
