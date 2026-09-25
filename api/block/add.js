// POST /api/block/add
// Body: { question_id }  — blocks the IP that sent this question
// Requires auth
import { getSupabase, requireAuth, cors, handleOptions } from '../lib.js';

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const payload = requireAuth(req, res);
  if (!payload) return;

  const { question_id } = req.body || {};
  if (!question_id) return res.status(400).json({ error: 'question_id is required.' });

  const supabase = getSupabase();

  // Get the question to find the sender IP
  const { data: question } = await supabase
    .from('questions')
    .select('id, to_username, sender_ip')
    .eq('id', question_id)
    .maybeSingle();

  if (!question) return res.status(404).json({ error: 'Question not found.' });
  if (question.to_username !== payload.username) return res.status(403).json({ error: 'Not your question.' });
  if (!question.sender_ip || question.sender_ip === 'unknown') {
    return res.status(400).json({ error: 'Cannot block — sender IP is unknown.' });
  }

  // Upsert the block (ignore if already blocked)
  const { error } = await supabase
    .from('blocked_ips')
    .upsert({ username: payload.username, ip: question.sender_ip }, { onConflict: 'username,ip' });

  if (error) {
    console.error('block error', error);
    return res.status(500).json({ error: 'Could not block sender.' });
  }

  return res.status(200).json({ ok: true });
}
