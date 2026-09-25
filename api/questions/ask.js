// POST /api/questions/ask
// Public — no auth required (anonymous sender)
import { getSupabase, cors, handleOptions } from '../lib.js';

function getIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

export default async function handler(req, res) {
  cors(res);
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const { to_username, text } = req.body || {};

  if (!to_username) return res.status(400).json({ error: 'to_username is required.' });
  if (!text || !text.trim()) return res.status(400).json({ error: 'Question text is required.' });
  if (text.trim().length > 500) return res.status(400).json({ error: 'Question too long (max 500 chars).' });

  const supabase = getSupabase();
  const ip = getIP(req);

  // Verify target user exists
  const { data: target } = await supabase
    .from('users')
    .select('username')
    .eq('username', to_username.toLowerCase().trim())
    .maybeSingle();

  if (!target) return res.status(404).json({ error: 'User not found.' });

  // Check if sender IP is blocked by this user
  const { data: blocked } = await supabase
    .from('blocked_ips')
    .select('id')
    .eq('username', target.username)
    .eq('ip', ip)
    .maybeSingle();

  if (blocked) {
    // Return 200 so the sender doesn't know they're blocked
    return res.status(200).json({ question: { id: 'blocked', fake: true } });
  }

  const { data: question, error } = await supabase
    .from('questions')
    .insert({ to_username: target.username, text: text.trim(), sender_ip: ip })
    .select('id, to_username, text, answer, answered_at, created_at')
    .single();

  if (error) {
    console.error('ask error', error);
    return res.status(500).json({ error: 'Could not send question.' });
  }

  return res.status(201).json({ question });
}
