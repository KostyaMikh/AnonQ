// DELETE /api/questions/delete
// Body: { id }
// Requires auth — only the question recipient can delete
import { getSupabase, requireAuth, cors, handleOptions } from '../_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed.' });

  const payload = requireAuth(req, res);
  if (!payload) return;

  const { id } = req.body || {};
  if (!id) return res.status(400).json({ error: 'Question id is required.' });

  const supabase = getSupabase();

  // Verify ownership before deleting
  const { data: existing } = await supabase
    .from('questions')
    .select('id, to_username')
    .eq('id', id)
    .maybeSingle();

  if (!existing) return res.status(404).json({ error: 'Question not found.' });
  if (existing.to_username !== payload.username) {
    return res.status(403).json({ error: 'Not your question.' });
  }

  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('delete error', error);
    return res.status(500).json({ error: 'Could not delete question.' });
  }

  return res.status(200).json({ ok: true });
}
