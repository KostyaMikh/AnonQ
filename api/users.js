// ============================================================
//  /api/users  — find, profile
//  Route by: ?action=find|profile
// ============================================================
import { getSupabase, cors, handleOptions } from './lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

  const { action } = req.query;
  const supabase = getSupabase();
  const SAFE = 'id, username, display_name, phone, telegram, created_at';

  // ── GET ?action=profile&username=xxx ──────────────────────
  if (action === 'profile') {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'username is required.' });
    const { data: user, error } = await supabase.from('users').select('id, username, display_name, created_at')
      .eq('username', username.toLowerCase().trim()).maybeSingle();
    if (error) return res.status(500).json({ error: 'Lookup failed.' });
    if (!user)  return res.status(404).json({ error: 'User not found.' });
    const { count } = await supabase.from('questions').select('id', { count: 'exact', head: true })
      .eq('to_username', user.username).not('answer', 'is', null);
    return res.status(200).json({ user: { ...user, answered_count: count ?? 0 } });
  }

  // ── GET ?action=find&by=username|phone|telegram&value=xxx ─
  if (action === 'find') {
    const { by, value } = req.query;
    if (!by || !value) return res.status(400).json({ error: '"by" and "value" are required.' });

    let query;
    if (by === 'username') {
      query = supabase.from('users').select(SAFE).eq('username', value.toLowerCase().trim()).maybeSingle();
    } else if (by === 'phone') {
      query = supabase.from('users').select(SAFE).eq('phone', value.trim()).maybeSingle();
    } else if (by === 'telegram') {
      query = supabase.from('users').select(SAFE).ilike('telegram', value.trim().replace(/^@/, '')).maybeSingle();
    } else {
      return res.status(400).json({ error: 'Invalid "by". Use: username, phone, or telegram.' });
    }

    const { data: user, error } = await query;
    if (error) return res.status(500).json({ error: 'Lookup failed.' });
    if (!user)  return res.status(404).json({ error: 'No user found.' });
    return res.status(200).json({ user });
  }

  return res.status(400).json({ error: 'Unknown action.' });
}
