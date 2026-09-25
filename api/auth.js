// ============================================================
//  /api/auth  — register, login, me
//  Route by: POST ?action=register|login   GET ?action=me
// ============================================================
import bcrypt from 'bcryptjs';
import { getSupabase, signToken, requireAuth, cors, handleOptions } from './lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;

  const action = req.query.action || req.body?.action;

  // ── GET /api/auth?action=me ───────────────────────────────
  if (req.method === 'GET' && action === 'me') {
    const payload = requireAuth(req, res);
    if (!payload) return;
    const supabase = getSupabase();
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, display_name, phone, telegram, created_at')
      .eq('username', payload.username)
      .maybeSingle();
    if (error || !user) return res.status(404).json({ error: 'User not found.' });
    return res.status(200).json({ user });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  // ── POST /api/auth?action=login ───────────────────────────
  if (action === 'login') {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required.' });
    const supabase = getSupabase();
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, display_name, password_hash, phone, telegram, created_at')
      .eq('username', username.toLowerCase().trim())
      .maybeSingle();
    if (error || !user) return res.status(401).json({ error: 'User not found.' });
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Wrong password.' });
    const token = signToken({ id: user.id, username: user.username, display_name: user.display_name });
    const { password_hash: _, ...safeUser } = user;
    return res.status(200).json({ token, user: safeUser });
  }

  // ── POST /api/auth?action=register ────────────────────────
  if (action === 'register') {
    const { username, display_name, password, phone = '', telegram = '' } = req.body || {};
    if (!username || !/^[a-z0-9_]{3,20}$/.test(username))
      return res.status(400).json({ error: 'Username must be 3–20 chars: letters, numbers, underscores only.' });
    if (!display_name || !display_name.trim())
      return res.status(400).json({ error: 'Display name is required.' });
    if (!password || password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const supabase = getSupabase();
    const { data: existing } = await supabase.from('users').select('username').eq('username', username).maybeSingle();
    if (existing) return res.status(409).json({ error: 'Username is already taken.' });

    const password_hash = await bcrypt.hash(password, 10);
    const { data: user, error } = await supabase
      .from('users')
      .insert({ username, display_name: display_name.trim(), password_hash, phone: phone.trim(), telegram: telegram.trim() })
      .select('id, username, display_name, phone, telegram, created_at')
      .single();
    if (error) { console.error('register error', error); return res.status(500).json({ error: error.message }); }
    const token = signToken({ id: user.id, username: user.username, display_name: user.display_name });
    return res.status(201).json({ token, user });
  }

  return res.status(400).json({ error: 'Unknown action.' });
}
