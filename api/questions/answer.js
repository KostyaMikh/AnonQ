// PATCH /api/questions/answer
// Body: { id, answer }  — answer can be null to clear it
// Requires auth — only the question recipient can answer
import { getSupabase, requireAuth, cors, handleOptions } from '../_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed.' });

  const payload = requireAuth(req, res);
  if (!payload) return;

  const { id, answer } = req.body || {};
  if (!id) return res.status(400).json({ error: 'Question id is required.' });

  const supabase = getSupabase();

  // Verify the question belongs to this user
  const { data: existing } = await supabase
    .from('questions')
    .select('id, to_username')
    .eq('id', id)
    .maybeSingle();

  if (!existing) return res.status(404).json({ error: 'Question not found.' });
  if (existing.to_username !== payload.username) {
    return res.status(403).json({ error: 'Not your question.' });
  }

  const update = answer && answer.trim()
    ? { answer: answer.trim(), answered_at: new Date().toISOString() }
    : { answer: null, answered_at: null };

  const { data: question, error } = await supabase
    .from('questions')
    .update(update)
    .eq('id', id)
    .select('id, to_username, text, answer, answered_at, created_at')
    .single();

  if (error) {
    console.error('answer error', error);
    return res.status(500).json({ error: 'Could not save answer.' });
  }

  return res.status(200).json({ question });
}
