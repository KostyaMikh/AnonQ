// ============================================================
//  AnonQ — Mobile navbar hamburger (auto-injected)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const navbar  = document.querySelector('.navbar');
  const actions = navbar?.querySelector('.navbar-actions');
  if (!navbar || !actions) return;

  // Make navbar position:relative so dropdown is anchored
  navbar.style.position = 'sticky';

  // Create burger button
  const burger = document.createElement('button');
  burger.className = 'navbar-burger';
  burger.setAttribute('aria-label', 'Menu');
  burger.innerHTML = '<span></span><span></span><span></span>';
  navbar.appendChild(burger);

  // Create dropdown — clone the actions links into it
  const dropdown = document.createElement('div');
  dropdown.className = 'navbar-dropdown';

  // We need to watch for dynamic nav changes (logged-in state updates navActions)
  // Use a MutationObserver to keep dropdown in sync
  function syncDropdown() {
    dropdown.innerHTML = '';
    actions.querySelectorAll('a, button').forEach(el => {
      const clone = el.cloneNode(true);
      // Forward click events to original element
      clone.addEventListener('click', (e) => {
        // For buttons with onclick, trigger the original
        if (el.tagName === 'BUTTON' && el.onclick) {
          el.onclick.call(el, e);
        } else if (el.tagName === 'A') {
          window.location.href = el.href;
        }
        closeMenu();
      });
      dropdown.appendChild(clone);
    });
  }

  // Insert dropdown right after navbar in the DOM
  navbar.parentNode.insertBefore(dropdown, navbar.nextSibling);

  // Observe navActions for dynamic changes (logged-in state)
  const observer = new MutationObserver(syncDropdown);
  observer.observe(actions, { childList: true, subtree: true, characterData: true });
  syncDropdown();

  function closeMenu() {
    burger.classList.remove('open');
    dropdown.classList.remove('open');
  }

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    syncDropdown(); // always fresh
    burger.classList.toggle('open');
    dropdown.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !dropdown.contains(e.target)) closeMenu();
  });

  // Close on any navigation link click
  dropdown.addEventListener('click', closeMenu);
});
