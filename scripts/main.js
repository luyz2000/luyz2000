// Main application script
$(document).ready(function () {
  // Initialize AOS (Animate On Scroll)
  AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });
});

// Smooth scroll for navigation links
$('a.smooth-scroll').click(function (event) {
  if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 75 }, 800, function () {
        var $target = $(target);
        $target.focus();
        if (!$target.is(":focus")) {
          $target.attr('tabindex', '-1').focus();
        }
      });
    }
  }
});

// Enable form submit button when all fields are valid
$(document).on('input', 'form input, form textarea', function() {
  var form = $(this).closest('form');
  var isValid = form[0].checkValidity();
  form.find('button[type="submit"]').prop('disabled', !isValid);
});
