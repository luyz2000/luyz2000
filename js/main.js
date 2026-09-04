(function () {
  'use strict';

  var NAV_OFFSET = 75;

  function closeMobileMenu() {
    var collapse = document.getElementById('navigation');
    var toggler = document.querySelector('.navbar-toggler');
    var bodyClick = document.getElementById('bodyClick');
    if (bodyClick) bodyClick.remove();
    document.documentElement.classList.remove('nav-open');
    if (collapse) collapse.classList.remove('show');
    if (toggler) toggler.classList.remove('toggled');
    if (toggler) toggler.setAttribute('aria-expanded', 'false');
  }

  function openMobileMenu() {
    var collapse = document.getElementById('navigation');
    var toggler = document.querySelector('.navbar-toggler');
    if (toggler) {
      toggler.classList.add('toggled');
      toggler.setAttribute('aria-expanded', 'true');
    }
    if (collapse) collapse.classList.add('show');
    var overlay = document.createElement('div');
    overlay.id = 'bodyClick';
    overlay.addEventListener('click', closeMobileMenu);
    document.body.appendChild(overlay);
    document.documentElement.classList.add('nav-open');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggler = document.querySelector('.navbar-toggler');
    var collapse = document.getElementById('navigation');
    if (toggler && collapse) {
      toggler.addEventListener('click', function () {
        if (document.documentElement.classList.contains('nav-open')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    var inputs = document.querySelectorAll('.form-control');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', enableSubmitButton);
    }
  });

  function enableSubmitButton() {
    var form = this.closest('form');
    if (!form) return;
    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = !form.checkValidity();
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a.smooth-scroll');
    if (!link) return;
    var hash = link.hash;
    if (!hash || hash === '#') return;
    if (link.pathname.replace(/^\//, '') !== location.pathname.replace(/^\//, '') || link.hostname !== location.hostname) return;
    var target = document.querySelector(hash);
    if (!target) {
      var nameTarget = document.querySelector('[name="' + hash.slice(1) + '"]');
      if (nameTarget) target = nameTarget;
    }
    if (!target) return;
    event.preventDefault();
    closeMobileMenu();
    var top = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top: top, behavior: 'smooth' });
    setTimeout(function () {
      target.focus({ preventScroll: true });
      if (document.activeElement !== target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }, 800);
  });
})();
