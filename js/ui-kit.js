var transparent = true;
var scroll_distance = 400;
var debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

var nowuiKit = {
  misc: { navbar_menu_visible: 0 },
  checkScrollForTransparentNavbar: debounce(function() {
    var navbar = document.querySelector('.navbar[color-on-scroll]');
    if (!navbar) return;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > scroll_distance) {
      if (transparent) {
        transparent = false;
        navbar.classList.remove('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        navbar.classList.add('navbar-transparent');
      }
    }
  }, 17)
};

document.addEventListener('DOMContentLoaded', function() {
  var navbar = document.querySelector('.navbar[color-on-scroll]');
  if (navbar) {
    scroll_distance = parseInt(navbar.getAttribute('color-on-scroll'), 10) || 400;
    nowuiKit.checkScrollForTransparentNavbar();
    window.addEventListener('scroll', nowuiKit.checkScrollForTransparentNavbar, { passive: true });
  }

  // input focus effect (replaces jQuery .form-control focus)
  document.querySelectorAll('.form-control').forEach(function(input) {
    input.addEventListener('focus', function() {
      var group = this.closest('.input-group');
      if (group) group.classList.add('input-group-focus');
    });
    input.addEventListener('blur', function() {
      var group = this.closest('.input-group');
      if (group) group.classList.remove('input-group-focus');
    });
  });

  // navbar toggler (replaces jQuery + Bootstrap collapse)
  var toggler = document.querySelector('.navbar-toggler');
  var collapse = document.getElementById('navigation');
  if (toggler && collapse) {
    toggler.addEventListener('click', function() {
      var isOpen = nowuiKit.misc.navbar_menu_visible === 1;
      if (isOpen) {
        document.documentElement.classList.remove('nav-open');
        nowuiKit.misc.navbar_menu_visible = 0;
        var bodyClick = document.getElementById('bodyClick');
        if (bodyClick) bodyClick.remove();
        collapse.classList.remove('show');
        toggler.classList.remove('toggled');
        toggler.setAttribute('aria-expanded', 'false');
        setTimeout(function() { toggler.classList.remove('toggled'); }, 550);
      } else {
        toggler.classList.add('toggled');
        toggler.setAttribute('aria-expanded', 'true');
        collapse.classList.add('show');
        var div = document.createElement('div');
        div.id = 'bodyClick';
        div.addEventListener('click', function() {
          document.documentElement.classList.remove('nav-open');
          nowuiKit.misc.navbar_menu_visible = 0;
          var bc = document.getElementById('bodyClick');
          if (bc) bc.remove();
          collapse.classList.remove('show');
          toggler.setAttribute('aria-expanded', 'false');
          setTimeout(function() {
            toggler.classList.remove('toggled');
            if (document.getElementById('bodyClick')) document.getElementById('bodyClick').remove();
          }, 550);
        });
        document.body.appendChild(div);
        document.documentElement.classList.add('nav-open');
        nowuiKit.misc.navbar_menu_visible = 1;
      }
    });
  }
});
