/* ============================================================
   DTECH — Main JavaScript
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Navbar scroll effect ---------- */
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Close mobile menu on link click ---------- */
  const navCollapse = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link, #navMenu .btn').forEach((link) => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) ||
                           new bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  /* ---------- 3. Active nav link ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.dtech-nav .nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

  /* ---------- 4. Back to top ---------- */
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    const toggleBack = () => {
      if (window.scrollY > 500) backBtn.classList.add('show');
      else backBtn.classList.remove('show');
    };
    window.addEventListener('scroll', toggleBack, { passive: true });
    toggleBack();
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 5. Reveal on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('revealed'));
  }

  /* ---------- 6. Filters (courses / services) ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('[data-category]');
  if (filterBtns.length && filterItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        filterItems.forEach((item) => {
          const show = cat === 'all' || item.dataset.category === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- 7. Contact form ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const name = form.querySelector('#jina').value.trim();
      const phone = form.querySelector('#simu').value.trim();
      const email = form.querySelector('#baruaPepe').value.trim();
      const service = form.querySelector('#huduma').value;
      const message = form.querySelector('#ujumbe').value.trim();

      let valid = true;
      if (!name) { form.querySelector('#jina').classList.add('is-invalid'); valid = false; }
      else form.querySelector('#jina').classList.remove('is-invalid');

      if (!phone || !/^[0-9+\s-]{9,}$/.test(phone)) {
        form.querySelector('#simu').classList.add('is-invalid'); valid = false;
      } else form.querySelector('#simu').classList.remove('is-invalid');

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        form.querySelector('#baruaPepe').classList.add('is-invalid'); valid = false;
      } else form.querySelector('#baruaPepe').classList.remove('is-invalid');

      if (!service) { form.querySelector('#huduma').classList.add('is-invalid'); valid = false; }
      else form.querySelector('#huduma').classList.remove('is-invalid');

      if (!message) { form.querySelector('#ujumbe').classList.add('is-invalid'); valid = false; }
      else form.querySelector('#ujumbe').classList.remove('is-invalid');

      if (!valid) return;

      // Build WhatsApp message
      const text =
        `Habari DTECH!%0A%0A` +
        `*Jina:* ${encodeURIComponent(name)}%0A` +
        `*Simu:* ${encodeURIComponent(phone)}%0A` +
        (email ? `*Barua pepe:* ${encodeURIComponent(email)}%0A` : '') +
        `*Huduma/Mafunzo:* ${encodeURIComponent(service)}%0A%0A` +
        `*Ujumbe:*%0A${encodeURIComponent(message)}`;

      const waURL = `https://wa.me/255654405432?text=${text}`;

      // Show success preview
      const alertBox = document.getElementById('formAlert');
      if (alertBox) {
        alertBox.innerHTML = `
          <div class="glass-card" style="border-color: rgba(34,211,238,0.4);">
            <div class="d-flex align-items-start gap-3">
              <i class="bi bi-check-circle-fill" style="color:#22d3ee;font-size:1.6rem;"></i>
              <div>
                <h6 class="mb-1">Taarifa zako ziko tayari!</h6>
                <p class="mb-2" style="font-size:0.9rem;">Bofya kitufe hapa chini kukamilisha na kutuma ujumbe wako kwa DTECH kupitia WhatsApp.</p>
                <a href="${waURL}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
                  <i class="bi bi-whatsapp me-1"></i> Tuma kwa WhatsApp
                </a>
              </div>
            </div>
          </div>`;
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Auto open WhatsApp
      window.open(waURL, '_blank', 'noopener');
    });
  }

  /* ---------- 8. Year in footer (optional) ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();