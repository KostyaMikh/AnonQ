// POST /api/auth/register
import bcrypt from 'bcryptjs';
import { getSupabase, signToken, cors, handleOptions } from '../lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const { username, display_name, password, phone = '', telegram = '' } = req.body || {};

  // ── Validate ─────────────────────────────────────────────
  if (!username || !/^[a-z0-9_]{3,20}$/.test(username)) {
    return res.status(400).json({ error: 'Username must be 3–20 chars: letters, numbers, underscores only.' });
  }
  if (!display_name || !display_name.trim()) {
    return res.status(400).json({ error: 'Display name is required.' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  const supabase = getSupabase();

  // ── Check username taken ──────────────────────────────────
  const { data: existing } = await supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ error: 'Username is already taken.' });
  }

  // ── Hash password & insert ────────────────────────────────
  const password_hash = await bcrypt.hash(password, 10);

  const { data: user, error } = await supabase
    .from('users')
    .insert({
      username,
      display_name: display_name.trim(),
      password_hash,
      phone: phone.trim(),
      telegram: telegram.trim(),
    })
    .select('id, username, display_name, phone, telegram, created_at')
    .single();

  if (error) {
    console.error('register error', error);
    return res.status(500).json({ error: 'Could not create account. Please try again.' });
  }

  const token = signToken({ id: user.id, username: user.username, display_name: user.display_name });

  return res.status(201).json({ token, user });
}
