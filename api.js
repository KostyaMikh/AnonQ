// ============================================================
//  AnonQ — Frontend API client (consolidated endpoints)
// ============================================================

const API = {
  getToken() { return localStorage.getItem('aq_token'); },
  setToken(t) { localStorage.setItem('aq_token', t); },
  clearToken() { localStorage.removeItem('aq_token'); localStorage.removeItem('aq_user'); },
  getUser() { try { return JSON.parse(localStorage.getItem('aq_user')); } catch { return null; } },
  setUser(u) { localStorage.setItem('aq_user', JSON.stringify(u)); },

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
    const data = await this._fetch('/api/auth?action=register', { method: 'POST', body: { username, display_name, password, phone, telegram } });
    this.setToken(data.token); this.setUser(data.user);
    return data.user;
  },

  async login(username, password) {
    const data = await this._fetch('/api/auth?action=login', { method: 'POST', body: { username, password } });
    this.setToken(data.token); this.setUser(data.user);
    return data.user;
  },

  logout() { this.clearToken(); },

  async me() {
    const data = await this._fetch('/api/auth?action=me');
    this.setUser(data.user);
    return data.user;
  },

  // ── Users ──────────────────────────────────────────────────
  async findUser(by, value) {
    const data = await this._fetch(`/api/users?action=find&by=${encodeURIComponent(by)}&value=${encodeURIComponent(value)}`);
    return data.user;
  },

  async getProfile(username) {
    const data = await this._fetch(`/api/users?action=profile&username=${encodeURIComponent(username)}`);
    return data.user;
  },

  // ── Questions ──────────────────────────────────────────────
  async ask(to_username, text) {
    const data = await this._fetch('/api/questions?action=ask', { method: 'POST', body: { to_username, text } });
    return data.question;
  },

  async listMyQuestions(filter = 'all') {
    const data = await this._fetch(`/api/questions?action=list&filter=${filter}`);
    return data.questions;
  },

  async listPublicQuestions(username) {
    const data = await this._fetch(`/api/questions?action=list&username=${encodeURIComponent(username)}&public=1`);
    return data.questions;
  },

  async answer(id, answer) {
    const data = await this._fetch('/api/questions?action=answer', { method: 'POST', body: { id, answer } });
    return data.question;
  },

  async deleteQuestion(id) {
    await this._fetch('/api/questions?action=delete', { method: 'POST', body: { id } });
  },

  // ── Leaderboard ────────────────────────────────────────────
  async leaderboard(type = 'received', limit = 20) {
    const data = await this._fetch(`/api/misc?action=leaderboard&type=${type}&limit=${limit}`);
    return data.board;
  },

  // ── Block ──────────────────────────────────────────────────
  async blockSender(question_id) {
    await this._fetch('/api/misc?action=block_add', { method: 'POST', body: { question_id } });
  },

  async listBlocked() {
    const data = await this._fetch('/api/misc?action=block_list');
    return data.blocked;
  },

  async unblock(ip) {
    await this._fetch('/api/misc?action=block_remove', { method: 'POST', body: { ip } });
  },

  // ── Email ──────────────────────────────────────────────────
  async sendEmail(to_email, question) {
    await this._fetch('/api/misc?action=email_send', { method: 'POST', body: { to_email, question } });
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
