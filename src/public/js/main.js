/* =============================================================================
   Portofolio — main.js
   Handles: Navigation scroll, mobile menu, scroll reveal, project filters,
            lightbox gallery, and utility interactions.
   ============================================================================= */

'use strict';

// =============================================================================
// 1. NAVIGATION — Scroll effect & mobile toggle
// =============================================================================
(function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (!nav) return;

  // Scroll state
  function updateNavScroll() {
    const scrolled = window.scrollY > 20;
    nav.classList.toggle('scrolled', scrolled);
  }

  window.addEventListener('scroll', updateNavScroll, { passive: true });
  updateNavScroll(); // Run on initial load

  // Mobile menu toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);

      // Animate hamburger → X
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close mobile menu when a link is clicked
    links.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        toggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') &&
          !nav.contains(e.target)) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        toggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      }
    });
  }
})();


// =============================================================================
// 2. SCROLL REVEAL — Animate elements into view using IntersectionObserver
// =============================================================================
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el, i) => {
    // Staggered delay for grid children
    el.style.transitionDelay = `${i * 60}ms`;
    observer.observe(el);
  });
})();


// =============================================================================
// 3. PROJECT FILTER — Filter cards by data-type attribute
// =============================================================================
(function initProjectFilter() {
  const filterBar = document.getElementById('filter-bar');
  const grid = document.getElementById('projects-grid');
  const emptyState = document.getElementById('empty-state');

  if (!filterBar || !grid) return;

  const cards = Array.from(grid.querySelectorAll('[data-type]'));
  const buttons = filterBar.querySelectorAll('.filter-btn');

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active button
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.type === filter;
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    // Show/hide empty state
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
})();


// =============================================================================
// 4. LIGHTBOX — Full-screen image viewer with keyboard and touch support
// =============================================================================
const lightboxData = [];
let currentLightboxIndex = 0;

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  if (!lightbox || !lightboxData.length) return;

  currentLightboxIndex = index;
  const item = lightboxData[index];

  img.src = item.src;
  img.alt = item.caption || '';
  if (caption) caption.textContent = item.caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Show/hide nav buttons
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  if (prevBtn) prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
  if (nextBtn) nextBtn.style.visibility = index < lightboxData.length - 1 ? 'visible' : 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  const newIndex = currentLightboxIndex + direction;
  if (newIndex >= 0 && newIndex < lightboxData.length) {
    openLightbox(newIndex);
  }
}

(function initLightbox() {
  // Collect all photo-grid items that have images
  const photoItems = document.querySelectorAll('.photo-grid__item img');
  photoItems.forEach((img, i) => {
    lightboxData.push({ src: img.src, caption: img.alt });
    img.closest('.photo-grid__item').addEventListener('click', () => openLightbox(i));
  });

  // Wire close button
  const closeBtn = document.getElementById('lightbox-close');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // Wire prev/next
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

  // Click outside image to close
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('active')) return;

    if (e.key === 'Escape' || e.key === 'Esc') closeLightbox();
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Swipe support (mobile)
  let touchStartX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 60) {
        navigateLightbox(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }
})();


// =============================================================================
// 5. ACTIVE NAV LINK — Highlight current page link
// =============================================================================
(function setActiveNavLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    const isActive = href === currentPath ||
                     (href !== '/' && currentPath.startsWith(href.replace('.html', '')));
    link.classList.toggle('active', isActive);
  });
})();


// =============================================================================
// 6. SMOOTH ANCHOR SCROLL
// =============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
      ) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
