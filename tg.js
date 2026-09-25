// ============================================================
//  AnonQ — Telegram Mini App helper
//  Safe to include on all pages — gracefully no-ops outside TG
// ============================================================

const TG = {
  app: null,      // window.Telegram?.WebApp
  ready: false,

  init() {
    this.app = window.Telegram?.WebApp || null;
    if (!this.app) return;

    // Tell Telegram the app is ready
    this.app.ready();
    this.app.expand();
    this.ready = true;

    // Sync theme on load and whenever it changes
    this._applyTheme();
    this.app.onEvent('themeChanged', () => this._applyTheme());
  },

  // ── Theme sync ─────────────────────────────────────────────
  // Maps Telegram theme params → our CSS variables
  // Only overrides when inside Telegram (outside keeps our own themes)
  _applyTheme() {
    if (!this.app) return;
    const p = this.app.themeParams;
    if (!p || !Object.keys(p).length) return;

    const root = document.documentElement;
    const set = (k, v) => v && root.style.setProperty(k, v);

    set('--bg',         p.bg_color);
    set('--surface',    p.secondary_bg_color || p.bg_color);
    set('--surface2',   p.secondary_bg_color);
    set('--text',       p.text_color);
    set('--text-muted', p.hint_color);
    set('--accent',     p.button_color);
    set('--accent2',    p.button_color);
    set('--border',     p.hint_color + '44'); // hint color at 27% opacity

    // Navbar background = Telegram header color
    if (p.header_bg_color) {
      root.style.setProperty('--navbar-bg', p.header_bg_color);
    }
  },

  // ── Back button ────────────────────────────────────────────
  showBack(callback) {
    if (!this.app) return;
    this.app.BackButton.show();
    this.app.BackButton.onClick(callback);
  },

  hideBack() {
    if (!this.app) return;
    this.app.BackButton.hide();
  },

  // ── Main button (bottom CTA) ───────────────────────────────
  showMain({ text, color, callback }) {
    if (!this.app) return;
    const btn = this.app.MainButton;
    btn.setText(text);
    if (color) btn.color = color;
    btn.onClick(callback);
    btn.show();
  },

  hideMain() {
    if (!this.app) return;
    this.app.MainButton.hide();
  },

  setMainLoading(loading) {
    if (!this.app) return;
    loading
      ? this.app.MainButton.showProgress()
      : this.app.MainButton.hideProgress();
  },

  // ── Haptic feedback ────────────────────────────────────────
  haptic(type = 'light') {
    // type: light | medium | heavy | rigid | soft
    this.app?.HapticFeedback?.impactOccurred(type);
  },

  hapticNotification(type = 'success') {
    // type: success | warning | error
    this.app?.HapticFeedback?.notificationOccurred(type);
  },

  // ── Utilities ──────────────────────────────────────────────
  // Is the app running inside Telegram?
  isInsideTG() {
    return !!this.app && this.app.initData !== '';
  },

  // Close the mini app
  close() {
    this.app?.close();
  },

  // Get Telegram user info (if available)
  getUser() {
    return this.app?.initDataUnsafe?.user || null;
  },
};

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => TG.init());
