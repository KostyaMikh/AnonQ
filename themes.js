// ============================================================
//  AnonQ — Theme Engine
// ============================================================

const THEMES = {
  // ── Original (default dark purple) ───────────────────────
  original: {
    label: 'Original',
    emoji: '🟣',
    vars: {
      '--bg':           '#0f0f13',
      '--surface':      '#1a1a24',
      '--surface2':     '#232333',
      '--border':       '#2e2e44',
      '--accent':       '#7c5cfc',
      '--accent2':      '#a78bfa',
      '--accent-glow':  'rgba(124,92,252,0.25)',
      '--text':         '#e8e8f0',
      '--text-muted':   '#8888aa',
      '--danger':       '#f87171',
      '--success':      '#4ade80',
    }
  },

  // ── Dark (deep neutral dark) ──────────────────────────────
  dark: {
    label: 'Dark',
    emoji: '⚫',
    vars: {
      '--bg':           '#0a0a0a',
      '--surface':      '#141414',
      '--surface2':     '#1e1e1e',
      '--border':       '#2a2a2a',
      '--accent':       '#3b82f6',
      '--accent2':      '#60a5fa',
      '--accent-glow':  'rgba(59,130,246,0.22)',
      '--text':         '#f0f0f0',
      '--text-muted':   '#777777',
      '--danger':       '#f87171',
      '--success':      '#4ade80',
    }
  },

  // ── Light (clean white) ───────────────────────────────────
  light: {
    label: 'Light',
    emoji: '☀️',
    vars: {
      '--bg':           '#f5f5f7',
      '--surface':      '#ffffff',
      '--surface2':     '#f0f0f3',
      '--border':       '#dddde8',
      '--accent':       '#6d28d9',
      '--accent2':      '#7c3aed',
      '--accent-glow':  'rgba(109,40,217,0.18)',
      '--text':         '#18181b',
      '--text-muted':   '#71717a',
      '--danger':       '#dc2626',
      '--success':      '#16a34a',
    }
  },

  // ── Love Dark (deep rose / valentines dark) ───────────────
  loveDark: {
    label: 'Love Dark',
    emoji: '🖤',
    vars: {
      '--bg':           '#120a0e',
      '--surface':      '#1e1017',
      '--surface2':     '#281520',
      '--border':       '#3d1f2d',
      '--accent':       '#e8326a',
      '--accent2':      '#f472b6',
      '--accent-glow':  'rgba(232,50,106,0.25)',
      '--text':         '#f5e6ec',
      '--text-muted':   '#9c7388',
      '--danger':       '#fb7185',
      '--success':      '#4ade80',
    }
  },

  // ── Love Light (soft pink / rosy) ────────────────────────
  loveLight: {
    label: 'Love Light',
    emoji: '🌸',
    vars: {
      '--bg':           '#fff0f5',
      '--surface':      '#ffffff',
      '--surface2':     '#fce7ef',
      '--border':       '#f9a8c9',
      '--accent':       '#db2777',
      '--accent2':      '#ec4899',
      '--accent-glow':  'rgba(219,39,119,0.18)',
      '--text':         '#3d0a22',
      '--text-muted':   '#9d4870',
      '--danger':       '#be123c',
      '--success':      '#15803d',
    }
  },

  // ── Neon City (cyberpunk teal/green on black) ─────────────
  neonCity: {
    label: 'Neon City',
    emoji: '🌆',
    vars: {
      '--bg':           '#050d0d',
      '--surface':      '#091818',
      '--surface2':     '#0d2424',
      '--border':       '#0f3d3d',
      '--accent':       '#00ffc8',
      '--accent2':      '#00e5b0',
      '--accent-glow':  'rgba(0,255,200,0.20)',
      '--text':         '#d0fff6',
      '--text-muted':   '#5aada0',
      '--danger':       '#ff4f6e',
      '--success':      '#00ffc8',
    }
  },

  // ── Solar Flare (warm amber/orange on dark) ───────────────
  solarFlare: {
    label: 'Solar Flare',
    emoji: '🔥',
    vars: {
      '--bg':           '#100a00',
      '--surface':      '#1c1200',
      '--surface2':     '#271a00',
      '--border':       '#3d2800',
      '--accent':       '#f59e0b',
      '--accent2':      '#fbbf24',
      '--accent-glow':  'rgba(245,158,11,0.25)',
      '--text':         '#fff7e6',
      '--text-muted':   '#a07a3a',
      '--danger':       '#ef4444',
      '--success':      '#84cc16',
    }
  },

  // ── Arctic (icy blue/white minimal) ──────────────────────
  arctic: {
    label: 'Arctic',
    emoji: '🧊',
    vars: {
      '--bg':           '#f0f6ff',
      '--surface':      '#ffffff',
      '--surface2':     '#e8f0fb',
      '--border':       '#c8d9f5',
      '--accent':       '#0ea5e9',
      '--accent2':      '#38bdf8',
      '--accent-glow':  'rgba(14,165,233,0.18)',
      '--text':         '#0c1a2e',
      '--text-muted':   '#5578a0',
      '--danger':       '#ef4444',
      '--success':      '#10b981',
    }
  },

  // ── Forest (deep green nature) ────────────────────────────
  forest: {
    label: 'Forest',
    emoji: '🌿',
    vars: {
      '--bg':           '#060e07',
      '--surface':      '#0d1a0f',
      '--surface2':     '#122115',
      '--border':       '#1e3d22',
      '--accent':       '#22c55e',
      '--accent2':      '#4ade80',
      '--accent-glow':  'rgba(34,197,94,0.22)',
      '--text':         '#e0f4e4',
      '--text-muted':   '#527a59',
      '--danger':       '#f87171',
      '--success':      '#22c55e',
    }
  },

  // ── Candy (pastel rainbow soft light) ────────────────────
  candy: {
    label: 'Candy',
    emoji: '🍬',
    vars: {
      '--bg':           '#fef9ff',
      '--surface':      '#ffffff',
      '--surface2':     '#f3e8ff',
      '--border':       '#e9d5ff',
      '--accent':       '#a855f7',
      '--accent2':      '#c084fc',
      '--accent-glow':  'rgba(168,85,247,0.18)',
      '--text':         '#1e0a3c',
      '--text-muted':   '#8b5cf6',
      '--danger':       '#e11d48',
      '--success':      '#10b981',
    }
  },
};

// ── Apply a theme ─────────────────────────────────────────────
function applyTheme(key) {
  const theme = THEMES[key];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  localStorage.setItem('aq_theme', key);
  // Update picker active state if open
  document.querySelectorAll('.theme-option').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === key);
  });
}

// ── Load saved theme on page load ────────────────────────────
function loadTheme() {
  const saved = localStorage.getItem('aq_theme') || 'original';
  applyTheme(saved);
}

// ── Build & inject theme picker into navbar ───────────────────
function injectThemePicker() {
  // Find navbar-actions or append to navbar
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const currentKey = localStorage.getItem('aq_theme') || 'original';

  const pickerHTML = `
    <div class="theme-picker-wrap" id="themePicker">
      <button class="theme-toggle-btn" onclick="toggleThemePicker(event)" title="Change theme" aria-label="Change theme">
        <span id="themeEmoji">${THEMES[currentKey]?.emoji || '🎨'}</span>
      </button>
      <div class="theme-dropdown" id="themeDropdown">
        <div class="theme-dropdown-title">Theme</div>
        ${Object.entries(THEMES).map(([key, t]) => `
          <button class="theme-option${key === currentKey ? ' active' : ''}"
                  data-theme="${key}"
                  onclick="selectTheme('${key}')">
            <span class="theme-emoji">${t.emoji}</span>
            <span class="theme-label">${t.label}</span>
            <span class="theme-check">✓</span>
          </button>`).join('')}
      </div>
    </div>`;

  // Inject before the first child of navbar-actions, or append to navbar
  const actions = navbar.querySelector('.navbar-actions');
  if (actions) {
    actions.insertAdjacentHTML('afterbegin', pickerHTML);
  } else {
    navbar.insertAdjacentHTML('beforeend', pickerHTML);
  }
}

function toggleThemePicker(e) {
  e.stopPropagation();
  const dd = document.getElementById('themeDropdown');
  dd.classList.toggle('open');
}

function selectTheme(key) {
  applyTheme(key);
  document.getElementById('themeEmoji').textContent = THEMES[key]?.emoji || '🎨';
  document.getElementById('themeDropdown').classList.remove('open');
}

// Close dropdown on outside click
document.addEventListener('click', () => {
  const dd = document.getElementById('themeDropdown');
  if (dd) dd.classList.remove('open');
});

// ── Theme picker styles (injected once) ──────────────────────
(function injectPickerStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .theme-picker-wrap {
      position: relative;
    }
    .theme-toggle-btn {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm, 8px);
      width: 36px; height: 36px;
      font-size: 1.1rem;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: border-color .2s;
    }
    .theme-toggle-btn:hover { border-color: var(--accent2); }

    .theme-dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius, 14px);
      padding: 8px;
      min-width: 180px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.45);
      z-index: 9999;
    }
    .theme-dropdown.open { display: block; }

    .theme-dropdown-title {
      font-size: .72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .07em;
      color: var(--text-muted);
      padding: 4px 8px 8px;
    }

    .theme-option {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      background: transparent;
      border: none;
      border-radius: 8px;
      padding: 9px 10px;
      cursor: pointer;
      color: var(--text);
      font-size: .9rem;
      font-family: inherit;
      transition: background .15s;
    }
    .theme-option:hover { background: var(--surface2); }
    .theme-option.active { background: var(--surface2); }

    .theme-emoji { font-size: 1rem; width: 22px; text-align: center; }
    .theme-label { flex: 1; text-align: left; font-weight: 500; }
    .theme-check { color: var(--accent2); font-size: .85rem; opacity: 0; }
    .theme-option.active .theme-check { opacity: 1; }
  `;
  document.head.appendChild(style);
})();

// Auto-run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  injectThemePicker();
});
