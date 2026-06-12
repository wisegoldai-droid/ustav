/* ===== ÚSTAV ŠKOLSTVÍ — main.js ===== */

(function () {
  'use strict';

  /* ── Mobile hamburger ── */
  const hamburger = document.querySelector('.hamburger');
  const nav       = document.querySelector('.navbar__nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      nav.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      }
    });
    // Close on nav link click
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      })
    );
  }

  /* ── Active nav link ── */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current) a.classList.add('active');
  });

  /* ── Smooth reveal on scroll ── */
  if ('IntersectionObserver' in window) {
    const style = document.createElement('style');
    style.textContent = `.reveal{opacity:0;transform:translateY(24px);transition:opacity .5s ease,transform .5s ease}.reveal.visible{opacity:1;transform:none}`;
    document.head.appendChild(style);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.card, .activity-item, .school-card, .contact-person, .highlight-box, .event-card, .quote-card')
      .forEach(el => { el.classList.add('reveal'); io.observe(el); });
  }

  /* ── Current year in footer ── */
  document.querySelectorAll('.js-year').forEach(el => { el.textContent = new Date().getFullYear(); });

})();
