/**
 * WebP Fallback Handler
 * Detecta soporte para WebP y carga fallbacks PNG/JPG si es necesario
 * 
 * Uso: Agregar al HTML después de las imágenes críticas
 */

(function() {
  'use strict';

  // Función para detectar soporte WebP
  function supportsWebP() {
    return new Promise(function(resolve) {
      var webP = new Image();
      webP.onload = webP.onerror = function() {
        resolve(webP.width === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
    });
  }

  // Manejar fallback para background images
  function handleBackgroundFallback() {
    var headerImage = document.querySelector('.page-header-image');
    if (!headerImage) return;

    var style = window.getComputedStyle(headerImage);
    var backgroundImage = style.backgroundImage;

    // Si la imagen de fondo contiene .webp y el navegador no soporta WebP
    if (backgroundImage && backgroundImage.indexOf('.webp') !== -1) {
      // Verificar si el navegador realmente puede mostrar WebP
      var testImg = new Image();
      testImg.onload = function() {
        // WebP está soportado, no hacer nada
      };
      testImg.onerror = function() {
        // WebP NO está soportado, usar fallback PNG
        headerImage.style.backgroundImage = "url('images/header-bg.png')";
      };
      testImg.src = 'images/header-bg.webp';
    }
  }

  // Manejar fallback para imágenes de contenido
  function handleImageFallbacks() {
    var pictures = document.querySelectorAll('picture source[type="image/webp"]');
    
    pictures.forEach(function(source) {
      var testImg = new Image();
      testImg.onload = function() {
        // WebP está soportado, el navegador usará el source correcto automáticamente
      };
      testImg.onerror = function() {
        // WebP NO está soportado, remover el source WebP
        source.remove();
      };
      testImg.src = source.srcset;
    });
  }

  // Inicializar cuando el DOM esté listo
  function init() {
    handleBackgroundFallback();
    handleImageFallbacks();
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
