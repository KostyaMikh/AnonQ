// GET /api/leaderboard?type=received|sent&limit=10
// Public — no auth required
import { getSupabase, cors, handleOptions } from './lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });

  const type  = req.query.type  || 'received';
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);

  const supabase = getSupabase();

  if (type === 'received') {
    // Top users by total questions received
    const { data, error } = await supabase
      .rpc('leaderboard_received', { row_limit: limit });

    if (error) {
      // Fallback: manual query if RPC doesn't exist yet
      console.error('leaderboard_received rpc error', error);
      const { data: questions } = await supabase
        .from('questions')
        .select('to_username');

      if (!questions) return res.status(500).json({ error: 'Could not fetch leaderboard.' });

      const counts = {};
      questions.forEach(q => { counts[q.to_username] = (counts[q.to_username] || 0) + 1; });
      const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);

      // Fetch display names
      const usernames = sorted.map(([u]) => u);
      const { data: users } = await supabase
        .from('users')
        .select('username, display_name')
        .in('username', usernames);

      const userMap = {};
      (users || []).forEach(u => { userMap[u.username] = u.display_name; });

      const board = sorted.map(([username, count]) => ({
        username,
        display_name: userMap[username] || username,
        count,
      }));

      return res.status(200).json({ board });
    }

    return res.status(200).json({ board: data });
  }

  if (type === 'sent') {
    // Top users by questions sent (answered questions — proxy for engagement)
    const { data: questions } = await supabase
      .from('questions')
      .select('to_username')
      .not('answer', 'is', null);

    if (!questions) return res.status(500).json({ error: 'Could not fetch leaderboard.' });

    const counts = {};
    questions.forEach(q => { counts[q.to_username] = (counts[q.to_username] || 0) + 1; });
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    const usernames = sorted.map(([u]) => u);
    if (!usernames.length) return res.status(200).json({ board: [] });

    const { data: users } = await supabase
      .from('users')
      .select('username, display_name')
      .in('username', usernames);

    const userMap = {};
    (users || []).forEach(u => { userMap[u.username] = u.display_name; });

    const board = sorted.map(([username, count]) => ({
      username,
      display_name: userMap[username] || username,
      count,
    }));

    return res.status(200).json({ board });
  }

  return res.status(400).json({ error: 'Invalid type. Use: received or sent.' });
}
