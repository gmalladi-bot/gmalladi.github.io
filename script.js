/* ============================================================
   MALLADI GAYATHRI — ROYAL LEGAL PORTFOLIO
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Preloader ──────────────────────────────────────────────
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1600);
  });
  // Fallback
  setTimeout(() => preloader.classList.add('hidden'), 3200);


  // ── Navbar scroll ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // ── Active nav links ──────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));


  // ── Mobile menu ───────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });


  // ── Scroll reveal ─────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));


  // ── Smooth scroll for all anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ── Active nav link highlight style injection ────────────
  const style = document.createElement('style');
  style.textContent = `.nav-links a.active { color: var(--gold) !important; } .nav-links a.active::after { width: 100% !important; }`;
  document.head.appendChild(style);


  // ── Parallax subtle hero ─────────────────────────────────
  const heroPattern = document.querySelector('.hero-pattern');
  if (heroPattern) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroPattern.style.transform = `translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }


  // ── Timeline items: stagger per group ────────────────────
  const tlItems = document.querySelectorAll('.tl-item.reveal');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  tlItems.forEach(el => tlObserver.observe(el));


  // ── Copyright year ───────────────────────────────────────
  const yearEls = document.querySelectorAll('.footer-copy');
  const yr = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = el.textContent.replace(/\d{4}/, yr);
  });

});
