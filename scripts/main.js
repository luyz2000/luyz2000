// Main application script (vanilla - no jQuery, no AOS)

// Smooth scroll for navigation links (replaces jQuery animate)
document.addEventListener('click', function (event) {
  var link = event.target.closest('a.smooth-scroll');
  if (!link) return;
  var hash = link.hash;
  if (!hash || hash === '#') return;
  // same-page check
  if (link.pathname.replace(/^\//, '') !== location.pathname.replace(/^\//, '') || link.hostname !== location.hostname) return;
  var target = document.querySelector(hash);
  if (!target) {
    var nameTarget = document.querySelector('[name="' + hash.slice(1) + '"]');
    if (nameTarget) target = nameTarget;
  }
  if (target) {
    event.preventDefault();
    var top = target.getBoundingClientRect().top + window.pageYOffset - 75;
    window.scrollTo({ top: top, behavior: 'smooth' });
    // focus management for accessibility
    setTimeout(function () {
      target.focus({ preventScroll: true });
      if (document.activeElement !== target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }, 800);
    // close mobile nav if open
    var collapse = document.getElementById('navigation');
    var toggler = document.querySelector('.navbar-toggler');
    if (collapse && collapse.classList.contains('show')) {
      collapse.classList.remove('show');
      document.documentElement.classList.remove('nav-open');
      var bodyClick = document.getElementById('bodyClick');
      if (bodyClick) bodyClick.remove();
      if (toggler) {
        toggler.classList.remove('toggled');
        toggler.setAttribute('aria-expanded', 'false');
      }
      if (typeof nowuiKit !== 'undefined') nowuiKit.misc.navbar_menu_visible = 0;
    }
  }
});

// Enable form submit button when all fields are valid (vanilla)
document.addEventListener('input', function (event) {
  if (!event.target.matches('form input, form textarea')) return;
  var form = event.target.closest('form');
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');
  if (btn) btn.disabled = !form.checkValidity();
});
