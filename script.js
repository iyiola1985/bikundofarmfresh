/**
 * Bikundo Farm Fresh - Main JavaScript
 * jQuery animations, sticky nav, lightbox, smooth scroll
 */
(function ($) {
  'use strict';

  // WhatsApp link - replace XXXXX with actual number (e.g. 254712345678)
  const WHATSAPP_NUMBER = 'XXXXXXXXXXX';
  const WHATSAPP_MESSAGE = 'Hello Bikundo Farm Fresh, I want to order 35-day broiler chickens.';

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function (e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate(
          { scrollTop: target.offset().top },
          600,
          'swing'
        );
        // Close mobile menu if open
        $('#mobile-menu').addClass('hidden');
        $('#menu-toggle').attr('aria-expanded', 'false');
      }
    });
  }

  /**
   * Sticky header - add background when scrolled
   */
  function initStickyHeader() {
    var header = $('#main-header');
    var scrollThreshold = 80;

    function updateHeader() {
      if ($(window).scrollTop() > scrollThreshold) {
        header.addClass('scrolled');
      } else {
        header.removeClass('scrolled');
      }
    }

    $(window).on('scroll', $.throttle(100, updateHeader));
    updateHeader();
  }

  /**
   * Mobile hamburger menu
   */
  function initMobileMenu() {
    $('#menu-toggle').on('click', function () {
      var menu = $('#mobile-menu');
      var isExpanded = menu.hasClass('hidden');
      menu.toggleClass('hidden');
      $(this).attr('aria-expanded', !isExpanded);
    });

    $(document).on('click', '#mobile-menu a', function () {
      $('#mobile-menu').addClass('hidden');
      $('#menu-toggle').attr('aria-expanded', 'false');
    });
  }

  /**
   * Hero text animation on load
   */
  function initHeroAnimation() {
    var delay = 200;
    $('.hero-sub').css({ opacity: 0, transform: 'translateY(20px)' });
    $('.hero-title').css({ opacity: 0, transform: 'translateY(24px)' });
    $('.hero-text').css({ opacity: 0, transform: 'translateY(24px)' });
    $('.animate-cta').css({ opacity: 0, transform: 'translateY(24px)' });

    setTimeout(function () {
      $('.hero-sub').animate({ opacity: 1 }, { duration: 600 }).css('transform', 'translateY(0)');
    }, delay);
    setTimeout(function () {
      $('.hero-title').animate({ opacity: 1 }, { duration: 600 }).css('transform', 'translateY(0)');
    }, delay + 150);
    setTimeout(function () {
      $('.hero-text').animate({ opacity: 1 }, { duration: 600 }).css('transform', 'translateY(0)');
    }, delay + 300);
    setTimeout(function () {
      $('.animate-cta').animate({ opacity: 1 }, { duration: 600 }).css('transform', 'translateY(0)');
    }, delay + 450);
  }

  /**
   * Scroll reveal - fade in sections when in view
   */
  function initScrollReveal() {
    var $sections = $('.scroll-reveal');
    var windowHeight = $(window).height();
    var offset = 0.15;

    function reveal() {
      var scrollTop = $(window).scrollTop();
      $sections.each(function () {
        var $el = $(this);
        if ($el.hasClass('revealed')) return;
        var top = $el.offset().top;
        if (scrollTop + windowHeight * (1 - offset) > top) {
          $el.addClass('revealed');
        }
      });
    }

    $(window).on('scroll resize', $.throttle(80, reveal));
    reveal();
  }

  /**
   * Gallery lightbox
   */
  function initLightbox() {
    var $lightbox = $('#lightbox');
    var $lightboxImg = $('#lightbox-img');
    var $close = $('#lightbox-close');

    $('.gallery-item').on('click', function (e) {
      e.preventDefault();
      var src = $(this).attr('data-src') || $(this).find('.gallery-img').attr('data-src');
      if (src) {
        $lightboxImg.attr('src', src);
        $lightbox.removeClass('hidden').addClass('show').css('display', 'flex');
        $('body').css('overflow', 'hidden');
      }
    });

    function closeLightbox() {
      $lightbox.addClass('hidden').removeClass('show');
      $('body').css('overflow', '');
    }

    $close.on('click', closeLightbox);
    $lightbox.on('click', function (e) {
      if (e.target === this) closeLightbox();
    });
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape' && $lightbox.hasClass('show')) closeLightbox();
    });
  }

  /**
   * Scroll to top button
   */
  function initScrollTop() {
    var $btn = $('#scroll-top');
    var showAfter = 400;

    $(window).on('scroll', $.throttle(100, function () {
      if ($(window).scrollTop() > showAfter) {
        $btn.addClass('visible');
      } else {
        $btn.removeClass('visible');
      }
    }));

    $btn.on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
    });
  }

  /**
   * Footer year
   */
  function setFooterYear() {
    $('#footer-year').text(new Date().getFullYear());
  }

  /**
   * Lazy load images in gallery (optional enhancement)
   */
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var $el = $(entry.target);
              var src = $el.data('src') || $el.attr('data-src');
              if (src && $el.hasClass('lazy-img')) {
                $el.css('background-image', 'url(' + src + ')');
                observer.unobserve(entry.target);
              }
            }
          });
        },
        { rootMargin: '50px' }
      );
      document.querySelectorAll('.lazy-img[data-src]').forEach(function (img) {
        observer.observe(img);
      });
    }
  }

  /**
   * Simple throttle helper (if not present)
   */
  if (!$.throttle) {
    $.throttle = function (delay, fn) {
      var last = 0,
        timer;
      return function () {
        var now = Date.now();
        var elapsed = now - last;
        var context = this;
        var args = arguments;
        if (elapsed >= delay) {
          last = now;
          fn.apply(context, args);
        } else if (!timer) {
          timer = setTimeout(function () {
            last = Date.now();
            timer = null;
            fn.apply(context, args);
          }, delay - elapsed);
        }
      };
    };
  }

  /**
   * Build WhatsApp URL
   */
  function getWhatsAppUrl() {
    var num = WHATSAPP_NUMBER.replace(/\D/g, '');
    var text = encodeURIComponent(WHATSAPP_MESSAGE);
    return 'https://wa.me/' + num + '?text=' + text;
  }

  /**
   * Apply WhatsApp links (edit WHATSAPP_NUMBER at top of script.js)
   */
  function applyWhatsAppLinks() {
    var url = getWhatsAppUrl();
    $('.whatsapp-link').attr('href', url);
  }

  // Run on DOM ready
  $(function () {
    initSmoothScroll();
    initStickyHeader();
    initMobileMenu();
    initHeroAnimation();
    initScrollReveal();
    initLightbox();
    initScrollTop();
    setFooterYear();
    initLazyLoad();
    applyWhatsAppLinks();
  });
})(jQuery);
