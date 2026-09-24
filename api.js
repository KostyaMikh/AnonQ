// ============================================================
//  AnonQ — Frontend API client
//  Replaces data.js localStorage calls with real API calls
// ============================================================

const API = {

  // ── Auth token (stored in localStorage) ───────────────────
  getToken()        { return localStorage.getItem('aq_token'); },
  setToken(t)       { localStorage.setItem('aq_token', t); },
  clearToken()      { localStorage.removeItem('aq_token'); localStorage.removeItem('aq_user'); },
  getUser()         { try { return JSON.parse(localStorage.getItem('aq_user')); } catch { return null; } },
  setUser(u)        { localStorage.setItem('aq_user', JSON.stringify(u)); },

  // ── Base fetch ─────────────────────────────────────────────
  async _fetch(path, options = {}) {
    const token = this.getToken();
    const res = await fetch(path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: 'Bearer ' + token } : {}),
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  },

  // ── Auth ───────────────────────────────────────────────────
  async register({ username, display_name, password, phone, telegram }) {
    const data = await this._fetch('/api/auth/register', {
      method: 'POST',
      body: { username, display_name, password, phone, telegram },
    });
    this.setToken(data.token);
    this.setUser(data.user);
    return data.user;
  },

  async login(username, password) {
    const data = await this._fetch('/api/auth/login', {
      method: 'POST',
      body: { username, password },
    });
    this.setToken(data.token);
    this.setUser(data.user);
    return data.user;
  },

  logout() { this.clearToken(); },

  async me() {
    const data = await this._fetch('/api/auth/me');
    this.setUser(data.user);
    return data.user;
  },

  // ── Users ──────────────────────────────────────────────────
  async findUser(by, value) {
    const data = await this._fetch(`/api/users/find?by=${encodeURIComponent(by)}&value=${encodeURIComponent(value)}`);
    return data.user;
  },

  async getProfile(username) {
    const data = await this._fetch(`/api/users/profile?username=${encodeURIComponent(username)}`);
    return data.user;
  },

  // ── Questions ──────────────────────────────────────────────
  async ask(to_username, text) {
    const data = await this._fetch('/api/questions/ask', {
      method: 'POST',
      body: { to_username, text },
    });
    return data.question;
  },

  async listMyQuestions(filter = 'all') {
    const data = await this._fetch(`/api/questions/list?filter=${filter}`);
    return data.questions;
  },

  async listPublicQuestions(username) {
    const data = await this._fetch(`/api/questions/list?username=${encodeURIComponent(username)}&public=1`);
    return data.questions;
  },

  async answer(id, answer) {
    const data = await this._fetch('/api/questions/answer', {
      method: 'PATCH',
      body: { id, answer },
    });
    return data.question;
  },

  async deleteQuestion(id) {
    await this._fetch('/api/questions/delete', {
      method: 'DELETE',
      body: { id },
    });
  },

  // ── Helpers ────────────────────────────────────────────────
  timeAgo(ts) {
    const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  },

  formatDate(ts) {
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },
};
