// ============================================================
//  AnonQ — Shared API utilities
// ============================================================
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// ── Supabase client (service role — server-side only) ────────
export function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// ── JWT helpers ──────────────────────────────────────────────
export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// Extract JWT from Authorization header: "Bearer <token>"
export function getTokenFromReq(req) {
  const auth = req.headers['authorization'] || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

// Returns decoded payload or sends 401 and returns null
export function requireAuth(req, res) {
  const token = getTokenFromReq(req);
  if (!token) { res.status(401).json({ error: 'Not authenticated.' }); return null; }
  const payload = verifyToken(token);
  if (!payload) { res.status(401).json({ error: 'Invalid or expired token.' }); return null; }
  return payload; // { username, display_name, id }
}

// ── CORS headers (allow all origins for now) ─────────────────
export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Handle preflight
export function handleOptions(req, res) {
  if (req.method === 'OPTIONS') { cors(res); res.status(204).end(); return true; }
  return false;
}
