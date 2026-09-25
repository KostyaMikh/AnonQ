// GET /api/users/find?by=username|phone|telegram&value=xxx
// Public — no auth required
import { getSupabase, cors, handleOptions } from '../lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

  const { by, value } = req.query;

  if (!by || !value) {
    return res.status(400).json({ error: 'Query params "by" and "value" are required.' });
  }

  const supabase = getSupabase();
  const SAFE_FIELDS = 'id, username, display_name, phone, telegram, created_at';
  let query;

  if (by === 'username') {
    query = supabase
      .from('users')
      .select(SAFE_FIELDS)
      .eq('username', value.toLowerCase().trim())
      .maybeSingle();

  } else if (by === 'phone') {
    query = supabase
      .from('users')
      .select(SAFE_FIELDS)
      .eq('phone', value.trim())
      .maybeSingle();

  } else if (by === 'telegram') {
    // normalise: strip leading @, lowercase
    const clean = value.trim().replace(/^@/, '').toLowerCase();
    query = supabase
      .from('users')
      .select(SAFE_FIELDS)
      .ilike('telegram', clean)   // case-insensitive match
      .maybeSingle();

  } else {
    return res.status(400).json({ error: 'Invalid "by" value. Use: username, phone, or telegram.' });
  }

  const { data: user, error } = await query;

  if (error) {
    console.error('find error', error);
    return res.status(500).json({ error: 'Lookup failed.' });
  }

  if (!user) return res.status(404).json({ error: 'No user found.' });

  return res.status(200).json({ user });
}
