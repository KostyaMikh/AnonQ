// GET /api/users/profile?username=xxx
// Public — returns safe user info (no password_hash)
import { getSupabase, cors, handleOptions } from '../_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'username is required.' });

  const supabase = getSupabase();

  const { data: user, error } = await supabase
    .from('users')
    .select('id, username, display_name, created_at')
    .eq('username', username.toLowerCase().trim())
    .maybeSingle();

  if (error) return res.status(500).json({ error: 'Lookup failed.' });
  if (!user)  return res.status(404).json({ error: 'User not found.' });

  // Get answered question count for the profile
  const { count } = await supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('to_username', user.username)
    .not('answer', 'is', null);

  return res.status(200).json({ user: { ...user, answered_count: count ?? 0 } });
}
