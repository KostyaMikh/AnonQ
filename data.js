// ============================================================
//  AnonQ — Data Layer (localStorage)
// ============================================================

const DB = {
  // ---------- helpers ----------
  _get(key) {
    try { return JSON.parse(localStorage.getItem(key)) ?? null; }
    catch { return null; }
  },
  _set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },

  // ---------- users ----------
  getUsers() { return this._get('aq_users') ?? {}; },
  saveUsers(u) { this._set('aq_users', u); },

  registerUser({ username, displayName, phone, telegram, password }) {
    const users = this.getUsers();
    if (users[username]) return { ok: false, error: 'Username already taken.' };
    const id = 'u_' + Date.now();
    users[username] = { id, username, displayName, phone: phone || '', telegram: telegram || '', password, createdAt: Date.now() };
    this.saveUsers(users);
    return { ok: true, user: users[username] };
  },

  loginUser(username, password) {
    const users = this.getUsers();
    const u = users[username];
    if (!u) return { ok: false, error: 'User not found.' };
    if (u.password !== password) return { ok: false, error: 'Wrong password.' };
    return { ok: true, user: u };
  },

  getUserByUsername(username) {
    return this.getUsers()[username] ?? null;
  },

  getUserByPhone(phone) {
    const users = this.getUsers();
    return Object.values(users).find(u => u.phone && u.phone === phone) ?? null;
  },

  getUserByTelegram(telegram) {
    const clean = telegram.replace(/^@/, '').toLowerCase();
    const users = this.getUsers();
    return Object.values(users).find(u => u.telegram && u.telegram.replace(/^@/, '').toLowerCase() === clean) ?? null;
  },

  // ---------- session ----------
  setSession(username) { sessionStorage.setItem('aq_session', username); },
  getSession() { return sessionStorage.getItem('aq_session'); },
  clearSession() { sessionStorage.removeItem('aq_session'); },

  // ---------- questions ----------
  getQuestions() { return this._get('aq_questions') ?? []; },
  saveQuestions(q) { this._set('aq_questions', q); },

  askQuestion({ toUsername, text }) {
    const questions = this.getQuestions();
    const q = {
      id: 'q_' + Date.now() + '_' + Math.random().toString(36).slice(2),
      toUsername,
      text,
      answer: null,
      answeredAt: null,
      createdAt: Date.now(),
    };
    questions.push(q);
    this.saveQuestions(questions);
    return q;
  },

  getQuestionsForUser(username) {
    return this.getQuestions().filter(q => q.toUsername === username).sort((a, b) => b.createdAt - a.createdAt);
  },

  answerQuestion(id, answer) {
    const questions = this.getQuestions();
    const q = questions.find(q => q.id === id);
    if (!q) return false;
    q.answer = answer;
    q.answeredAt = Date.now();
    this.saveQuestions(questions);
    return true;
  },

  deleteQuestion(id) {
    const questions = this.getQuestions().filter(q => q.id !== id);
    this.saveQuestions(questions);
  },

  // ---------- utils ----------
  timeAgo(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  },

  formatDate(ts) {
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
};
