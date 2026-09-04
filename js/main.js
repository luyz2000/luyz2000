(() => {
  'use strict';

  const NAV_OFFSET = 75;

  const closeMobileMenu = () => {
    const collapse = document.getElementById('navigation');
    const toggler = document.querySelector('.navbar-toggler');
    document.getElementById('bodyClick')?.remove();
    document.documentElement.classList.remove('nav-open');
    collapse?.classList.remove('show');
    toggler?.classList.remove('toggled');
    toggler?.setAttribute('aria-expanded', 'false');
  };

  const openMobileMenu = () => {
    const collapse = document.getElementById('navigation');
    const toggler = document.querySelector('.navbar-toggler');
    toggler?.classList.add('toggled');
    toggler?.setAttribute('aria-expanded', 'true');
    collapse?.classList.add('show');
    const overlay = document.createElement('div');
    overlay.id = 'bodyClick';
    overlay.addEventListener('click', closeMobileMenu);
    document.body.appendChild(overlay);
    document.documentElement.classList.add('nav-open');
  };

  const enableSubmitButton = function () {
    const form = this.closest('form');
    if (!form) return;
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = !form.checkValidity();
  };

  document.addEventListener('DOMContentLoaded', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.getElementById('navigation');
    if (toggler && collapse) {
      toggler.addEventListener('click', () => {
        if (document.documentElement.classList.contains('nav-open')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    document.querySelectorAll('.form-control').forEach((input) => {
      input.addEventListener('input', enableSubmitButton);
    });
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a.smooth-scroll');
    if (!link) return;
    const hash = link.hash;
    if (!hash || hash === '#') return;
    if (
      link.pathname.replace(/^\//, '') !== location.pathname.replace(/^\//, '') ||
      link.hostname !== location.hostname
    ) return;
    let target = document.querySelector(hash);
    if (!target) {
      target = document.querySelector(`[name="${hash.slice(1)}"]`);
    }
    if (!target) return;
    event.preventDefault();
    closeMobileMenu();
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => {
      target.focus({ preventScroll: true });
      if (document.activeElement !== target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }, 800);
  });
})();
