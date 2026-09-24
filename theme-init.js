// Runs SYNCHRONOUSLY in <head> to prevent flash of unstyled theme
(function() {
  var THEME_VARS = {
    original:   {'--bg':'#0f0f13','--surface':'#1a1a24','--surface2':'#232333','--border':'#2e2e44','--accent':'#7c5cfc','--accent2':'#a78bfa','--accent-glow':'rgba(124,92,252,0.25)','--text':'#e8e8f0','--text-muted':'#8888aa','--danger':'#f87171','--success':'#4ade80'},
    dark:       {'--bg':'#0a0a0a','--surface':'#141414','--surface2':'#1e1e1e','--border':'#2a2a2a','--accent':'#3b82f6','--accent2':'#60a5fa','--accent-glow':'rgba(59,130,246,0.22)','--text':'#f0f0f0','--text-muted':'#777777','--danger':'#f87171','--success':'#4ade80'},
    light:      {'--bg':'#f5f5f7','--surface':'#ffffff','--surface2':'#f0f0f3','--border':'#dddde8','--accent':'#6d28d9','--accent2':'#7c3aed','--accent-glow':'rgba(109,40,217,0.18)','--text':'#18181b','--text-muted':'#71717a','--danger':'#dc2626','--success':'#16a34a'},
    loveDark:   {'--bg':'#120a0e','--surface':'#1e1017','--surface2':'#281520','--border':'#3d1f2d','--accent':'#e8326a','--accent2':'#f472b6','--accent-glow':'rgba(232,50,106,0.25)','--text':'#f5e6ec','--text-muted':'#9c7388','--danger':'#fb7185','--success':'#4ade80'},
    loveLight:  {'--bg':'#fff0f5','--surface':'#ffffff','--surface2':'#fce7ef','--border':'#f9a8c9','--accent':'#db2777','--accent2':'#ec4899','--accent-glow':'rgba(219,39,119,0.18)','--text':'#3d0a22','--text-muted':'#9d4870','--danger':'#be123c','--success':'#15803d'},
    neonCity:   {'--bg':'#050d0d','--surface':'#091818','--surface2':'#0d2424','--border':'#0f3d3d','--accent':'#00ffc8','--accent2':'#00e5b0','--accent-glow':'rgba(0,255,200,0.20)','--text':'#d0fff6','--text-muted':'#5aada0','--danger':'#ff4f6e','--success':'#00ffc8'},
    solarFlare: {'--bg':'#100a00','--surface':'#1c1200','--surface2':'#271a00','--border':'#3d2800','--accent':'#f59e0b','--accent2':'#fbbf24','--accent-glow':'rgba(245,158,11,0.25)','--text':'#fff7e6','--text-muted':'#a07a3a','--danger':'#ef4444','--success':'#84cc16'},
    arctic:     {'--bg':'#f0f6ff','--surface':'#ffffff','--surface2':'#e8f0fb','--border':'#c8d9f5','--accent':'#0ea5e9','--accent2':'#38bdf8','--accent-glow':'rgba(14,165,233,0.18)','--text':'#0c1a2e','--text-muted':'#5578a0','--danger':'#ef4444','--success':'#10b981'},
    forest:     {'--bg':'#060e07','--surface':'#0d1a0f','--surface2':'#122115','--border':'#1e3d22','--accent':'#22c55e','--accent2':'#4ade80','--accent-glow':'rgba(34,197,94,0.22)','--text':'#e0f4e4','--text-muted':'#527a59','--danger':'#f87171','--success':'#22c55e'},
    candy:      {'--bg':'#fef9ff','--surface':'#ffffff','--surface2':'#f3e8ff','--border':'#e9d5ff','--accent':'#a855f7','--accent2':'#c084fc','--accent-glow':'rgba(168,85,247,0.18)','--text':'#1e0a3c','--text-muted':'#8b5cf6','--danger':'#e11d48','--success':'#10b981'},
  };
  var key = localStorage.getItem('aq_theme') || 'original';
  var vars = THEME_VARS[key] || THEME_VARS['original'];
  var root = document.documentElement;
  for (var k in vars) root.style.setProperty(k, vars[k]);
})();
