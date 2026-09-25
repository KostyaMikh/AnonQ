// GET /api/block/list — returns blocked IPs for current user
// DELETE /api/block/list  body: { ip } — unblocks an IP
import { getSupabase, requireAuth, cors, handleOptions } from '../lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;

  const payload = requireAuth(req, res);
  if (!payload) return;

  const supabase = getSupabase();

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('blocked_ips')
      .select('id, ip, created_at')
      .eq('username', payload.username)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: 'Could not fetch blocked list.' });
    return res.status(200).json({ blocked: data });
  }

  if (req.method === 'DELETE') {
    const { ip } = req.body || {};
    if (!ip) return res.status(400).json({ error: 'ip is required.' });

    const { error } = await supabase
      .from('blocked_ips')
      .delete()
      .eq('username', payload.username)
      .eq('ip', ip);

    if (error) return res.status(500).json({ error: 'Could not unblock.' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
