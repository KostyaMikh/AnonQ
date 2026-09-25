// GET /api/auth/me  — returns current user from JWT
import { getSupabase, requireAuth, cors, handleOptions } from '../lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

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
