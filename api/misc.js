// ============================================================
//  /api/misc  — leaderboard, block, email
//  Route by: ?action=leaderboard|block_add|block_list|email_send
// ============================================================
import { getSupabase, requireAuth, cors, handleOptions } from './lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;

  const action = req.query.action || req.body?.action;
  const supabase = getSupabase();

  // ── GET ?action=leaderboard&type=received|answered ────────
  if (req.method === 'GET' && action === 'leaderboard') {
    const type  = req.query.type  || 'received';
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);

    const onlyAnswered = type === 'answered';
    let query = supabase.from('questions').select('to_username');
    if (onlyAnswered) query = query.not('answer', 'is', null);

    const { data: questions } = await query;
    if (!questions) return res.status(500).json({ error: 'Could not fetch leaderboard.' });

    const counts = {};
    questions.forEach(q => { counts[q.to_username] = (counts[q.to_username] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
    if (!sorted.length) return res.status(200).json({ board: [] });

    const { data: users } = await supabase.from('users').select('username, display_name').in('username', sorted.map(([u]) => u));
    const userMap = {};
    (users || []).forEach(u => { userMap[u.username] = u.display_name; });

    return res.status(200).json({
      board: sorted.map(([username, count]) => ({ username, display_name: userMap[username] || username, count }))
    });
  }

  // ── GET ?action=block_list ────────────────────────────────
  if (req.method === 'GET' && action === 'block_list') {
    const payload = requireAuth(req, res);
    if (!payload) return;
    const { data, error } = await supabase.from('blocked_ips').select('id, ip, created_at')
      .eq('username', payload.username).order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: 'Could not fetch blocked list.' });
    return res.status(200).json({ blocked: data });
  }

  // ── POST ?action=block_add ────────────────────────────────
  if (req.method === 'POST' && action === 'block_add') {
    const payload = requireAuth(req, res);
    if (!payload) return;
    const { question_id } = req.body || {};
    if (!question_id) return res.status(400).json({ error: 'question_id is required.' });

    const { data: question } = await supabase.from('questions').select('id, to_username, sender_ip').eq('id', question_id).maybeSingle();
    if (!question) return res.status(404).json({ error: 'Question not found.' });
    if (question.to_username !== payload.username) return res.status(403).json({ error: 'Not your question.' });
    if (!question.sender_ip || question.sender_ip === 'unknown')
      return res.status(400).json({ error: 'Cannot block — sender IP unknown.' });

    const { error } = await supabase.from('blocked_ips')
      .upsert({ username: payload.username, ip: question.sender_ip }, { onConflict: 'username,ip' });
    if (error) return res.status(500).json({ error: 'Could not block sender.' });
    return res.status(200).json({ ok: true });
  }

  // ── DELETE ?action=block_remove ───────────────────────────
  if (req.method === 'DELETE' && action === 'block_remove') {
    const payload = requireAuth(req, res);
    if (!payload) return;
    const { ip } = req.body || {};
    if (!ip) return res.status(400).json({ error: 'ip is required.' });
    const { error } = await supabase.from('blocked_ips').delete().eq('username', payload.username).eq('ip', ip);
    if (error) return res.status(500).json({ error: 'Could not unblock.' });
    return res.status(200).json({ ok: true });
  }

  // ── POST ?action=email_send ───────────────────────────────
  if (req.method === 'POST' && action === 'email_send') {
    const { to_email, question } = req.body || {};
    if (!to_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to_email))
      return res.status(400).json({ error: 'Valid email address is required.' });
    if (!question?.trim()) return res.status(400).json({ error: 'Question text is required.' });
    if (question.trim().length > 500) return res.status(400).json({ error: 'Question too long.' });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Email service not configured.' });

    const siteUrl = process.env.SITE_URL || 'https://sasha-bald.vercel.app';
    const safeQ = question.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
      <style>body{font-family:Inter,system-ui,sans-serif;background:#0f0f13;color:#e8e8f0;margin:0;padding:0}
      .wrap{max-width:520px;margin:40px auto;padding:0 20px}
      .card{background:#1a1a24;border:1px solid #2e2e44;border-radius:14px;padding:36px}
      .logo{font-size:1.5rem;font-weight:800;color:#e8e8f0;margin-bottom:24px}
      .logo span{color:#7c5cfc}h2{font-size:1.2rem;margin:0 0 20px;color:#e8e8f0}
      .qbox{background:#232333;border-left:4px solid #7c5cfc;border-radius:0 8px 8px 0;padding:18px 20px;font-size:1.05rem;color:#e8e8f0;line-height:1.6;margin-bottom:28px}
      .muted{color:#8888aa;font-size:.9rem;margin-bottom:24px;line-height:1.6}
      .btn{display:inline-block;background:#7c5cfc;color:#fff;padding:14px 28px;border-radius:8px;font-weight:700;font-size:.95rem;text-decoration:none}
      .footer{margin-top:28px;font-size:.8rem;color:#555577;text-align:center}</style></head>
      <body><div class="wrap"><div class="card">
      <div class="logo">Anon<span>Q</span></div>
      <h2>💬 Someone sent you an anonymous question</h2>
      <div class="qbox">${safeQ}</div>
      <p class="muted">They want to stay anonymous 🤫<br>Sign up to answer and get your own link.</p>
      <a href="${siteUrl}/register.html" class="btn">Sign up &amp; answer →</a>
      </div><div class="footer">AnonQ · <a href="${siteUrl}" style="color:#7c5cfc;">anonq</a></div></div></body></html>`;

    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'AnonQ <onboarding@resend.dev>', to: [to_email], subject: '💬 Someone sent you an anonymous question on AnonQ', html }),
      });
      const data = await r.json();
      if (!r.ok) return res.status(500).json({ error: data.message || 'Failed to send.' });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to send email.' });
    }
  }

  return res.status(400).json({ error: 'Unknown action.' });
}
