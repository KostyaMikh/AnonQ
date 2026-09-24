// GET /api/questions/list?username=xxx&filter=all|answered|unanswered
// Private (own questions) — requires auth
// Public answered questions for a profile page — no auth, pass ?username=xxx&public=1
import { getSupabase, requireAuth, cors, handleOptions } from '../_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

  const { username, filter = 'all', public: isPublic } = req.query;
  const supabase = getSupabase();

  // ── Public profile feed (answered only, no auth) ──────────
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

  // ── Private dashboard (requires auth) ─────────────────────
  const payload = requireAuth(req, res);
  if (!payload) return;

  let query = supabase
    .from('questions')
    .select('id, to_username, text, answer, answered_at, created_at')
    .eq('to_username', payload.username)
    .order('created_at', { ascending: false });

  if (filter === 'answered')   query = query.not('answer', 'is', null);
  if (filter === 'unanswered') query = query.is('answer', null);

  const { data: questions, error } = await query;

  if (error) {
    console.error('list error', error);
    return res.status(500).json({ error: 'Could not fetch questions.' });
  }

  return res.status(200).json({ questions });
}
