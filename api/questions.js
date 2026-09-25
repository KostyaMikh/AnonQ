// ============================================================
//  /api/questions  — ask, list, answer, delete
//  Route by: method + ?action=ask|list|answer|delete
// ============================================================
import { getSupabase, requireAuth, cors, handleOptions } from './lib.js';

function getIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0].trim()
    || req.headers['x-real-ip']
    || req.socket?.remoteAddress
    || 'unknown';
}

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;

  const action = req.query.action || req.body?.action;
  const supabase = getSupabase();

  // ── GET ?action=list ──────────────────────────────────────
  if (req.method === 'GET' && action === 'list') {
    const { username, filter = 'all', public: isPublic } = req.query;

    if (isPublic === '1') {
      if (!username) return res.status(400).json({ error: 'username is required.' });
      const { data: questions, error } = await supabase
        .from('questions')
        .select('id, text, answer, answered_at, created_at')
        .eq('to_username', username.toLowerCase())
        .not('answer', 'is', null)
        .order('answered_at', { ascending: false });
      if (error) return res.status(500).json({ error: 'Could not fetch questions.' });
      return res.status(200).json({ questions });
    }

    const payload = requireAuth(req, res);
    if (!payload) return;
    let query = supabase
      .from('questions')
      .select('id, to_username, text, answer, answered_at, created_at')
      .eq('to_username', payload.username)
      .order('created_at', { ascending: false });
    if (filter === 'answered') query = query.not('answer', 'is', null);
    if (filter === 'unanswered') query = query.is('answer', null);
    const { data: questions, error } = await query;
    if (error) return res.status(500).json({ error: 'Could not fetch questions.' });
    return res.status(200).json({ questions });
  }

  // ── POST ?action=ask ──────────────────────────────────────
  if (req.method === 'POST' && action === 'ask') {
    const { to_username, text } = req.body || {};
    if (!to_username) return res.status(400).json({ error: 'to_username is required.' });
    if (!text?.trim()) return res.status(400).json({ error: 'Question text is required.' });
    if (text.trim().length > 500) return res.status(400).json({ error: 'Question too long (max 500 chars).' });

    const ip = getIP(req);
    const { data: target } = await supabase.from('users').select('username').eq('username', to_username.toLowerCase().trim()).maybeSingle();
    if (!target) return res.status(404).json({ error: 'User not found.' });

    const { data: blocked } = await supabase.from('blocked_ips').select('id').eq('username', target.username).eq('ip', ip).maybeSingle();
    if (blocked) return res.status(200).json({ question: { id: 'blocked', fake: true } });

    const { data: question, error } = await supabase
      .from('questions')
      .insert({ to_username: target.username, text: text.trim(), sender_ip: ip })
      .select('id, to_username, text, answer, answered_at, created_at')
      .single();
    if (error) { console.error('ask error', error); return res.status(500).json({ error: 'Could not send question.' }); }
    return res.status(201).json({ question });
  }

  // ── PATCH ?action=answer ──────────────────────────────────
  if ((req.method === 'PATCH' || req.method === 'POST') && action === 'answer') {
    const payload = requireAuth(req, res);
    if (!payload) return;
    const { id, answer } = req.body || {};
    if (!id) return res.status(400).json({ error: 'Question id is required.' });

    const { data: existing } = await supabase.from('questions').select('id, to_username').eq('id', id).maybeSingle();
    if (!existing) return res.status(404).json({ error: 'Question not found.' });
    if (existing.to_username !== payload.username) return res.status(403).json({ error: 'Not your question.' });

    const update = answer?.trim()
      ? { answer: answer.trim(), answered_at: new Date().toISOString() }
      : { answer: null, answered_at: null };
    const { data: question, error } = await supabase.from('questions').update(update).eq('id', id)
      .select('id, to_username, text, answer, answered_at, created_at').single();
    if (error) return res.status(500).json({ error: 'Could not save answer.' });
    return res.status(200).json({ question });
  }

  // ── DELETE ?action=delete ─────────────────────────────────
  if ((req.method === 'DELETE' || req.method === 'POST') && action === 'delete') {
    const payload = requireAuth(req, res);
    if (!payload) return;
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'Question id is required.' });

    const { data: existing } = await supabase.from('questions').select('id, to_username').eq('id', id).maybeSingle();
    if (!existing) return res.status(404).json({ error: 'Question not found.' });
    if (existing.to_username !== payload.username) return res.status(403).json({ error: 'Not your question.' });

    const { error } = await supabase.from('questions').delete().eq('id', id);
    if (error) return res.status(500).json({ error: 'Could not delete question.' });
    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ error: 'Unknown action.' });
}
