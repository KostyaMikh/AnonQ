// POST /api/auth/login
import bcrypt from 'bcryptjs';
import { getSupabase, signToken, cors, handleOptions } from '../lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const supabase = getSupabase();

  const { data: user, error } = await supabase
    .from('users')
    .select('id, username, display_name, password_hash, phone, telegram, created_at')
    .eq('username', username.toLowerCase().trim())
    .maybeSingle();

  if (error || !user) {
    return res.status(401).json({ error: 'User not found.' });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.status(401).json({ error: 'Wrong password.' });
  }

  const token = signToken({ id: user.id, username: user.username, display_name: user.display_name });

  // Don't send password hash to client
  const { password_hash: _, ...safeUser } = user;

  return res.status(200).json({ token, user: safeUser });
}
