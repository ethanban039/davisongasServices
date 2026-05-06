/* ============================================================
   DAVISON GAS SERVICES — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Sticky Navigation ---------- */
  const navHeader = document.getElementById('nav-header');

  function handleScroll() {
    if (window.scrollY > 20) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Hamburger Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ---------- Smooth Scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- Read More / Read Less ---------- */
  document.querySelectorAll('.read-more-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = btn.closest('.review-body');
      const hidden = card.querySelector('.review-hidden');
      const ellipsis = card.querySelector('.review-ellipsis');
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      if (expanded) {
        hidden.style.display = 'none';
        if (ellipsis) ellipsis.style.display = '';
        btn.textContent = 'Read More';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        hidden.style.display = 'inline';
        if (ellipsis) ellipsis.style.display = 'none';
        btn.textContent = 'Read Less';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Scroll Reveal ---------- */
  function addRevealClasses() {
    const targets = [
      'main > section',
      '.footer',
      '.brand-logo-img',
      '.section-title',
      '.section-subtitle',
      '.service-card',
      '.service-detail',
      '.why-item',
      '.review-card',
      '.hero-left',
      '.hero-card',
      '.page-kicker',
      '.page-title',
      '.page-intro',
      '.prose > *',
      '.side-panel',
      '.contact-form',
      '.contact-info',
      '.cta-band-inner > *',
      '.credentials-inline img',
    ];

    targets.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add('reveal');
      });
    });

    document.querySelectorAll('main > section, .footer').forEach(function (section) {
      section.querySelectorAll('.reveal').forEach(function (el, i) {
        el.style.transitionDelay = (i * 0.1) + 's';
      });
    });
  }

  addRevealClasses();

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.reveal').forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (item) {
      item.classList.add('visible');
    });
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      if (!item) return;

      var isOpen = item.classList.contains('open');

      // Close all panels first
      document.querySelectorAll('.faq-item').forEach(function (i) {
        var question = i.querySelector('.faq-question');
        i.classList.remove('open');
        if (question) question.setAttribute('aria-expanded', 'false');
      });

      // Open the clicked panel if it was previously closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!contactForm || !formStatus) return;

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
  }

  function clearStatus() {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }

  function validateField(field) {
    const val = field.value.trim();
    if (field.hasAttribute('required') && !val) {
      field.classList.add('error');
      return false;
    }
    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      field.classList.add('error');
      return false;
    }
    field.classList.remove('error');
    return true;
  }

  // Live validation on blur
  contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('blur', function () {
      validateField(field);
    });
    field.addEventListener('input', function () {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearStatus();

    const fields = Array.from(contactForm.querySelectorAll('input, select, textarea'));
    const allValid = fields.reduce(function (valid, field) {
      return validateField(field) && valid;
    }, true);

    if (!allValid) {
      showStatus('Please fill in all required fields correctly.', 'error-msg');
      const firstError = contactForm.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate form submission (no backend in pure HTML version)
    setTimeout(function () {
      showStatus('Thank you! Your message has been sent. Darren will be in touch within the hour.', 'success');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }, 1200);
  });

})();
