(function () {
  /* ---------- Scroll Handling ---------- */
  var header = document.getElementById('siteHeader');
  var scrollBadge = document.getElementById('scrollBadge');
  var rotor = document.getElementById('scrollRotor');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (scrollBadge) scrollBadge.classList.toggle('visible', y > 320);

    if (!reduceMotion && rotor) {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? y / docHeight : 0;
      var deg = progress * 720; /* two full rotations across full page */
      rotor.style.transform = 'rotate(' + deg + 'deg)';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile Navigation & Drawer ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');

  function closeMenu() {
    if (navLinks) navLinks.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    if (navLinks) navLinks.classList.add('open');
    if (navOverlay) navOverlay.classList.add('open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close menu');
    }
    document.body.classList.add('menu-open');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }

    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ---------- Interactive Revenue & Covers Calculator ---------- */
  var spendSlider = document.getElementById('calcSpend');
  var tablesSlider = document.getElementById('calcTables');
  var spendDisplay = document.getElementById('spendDisplay');
  var tablesDisplay = document.getElementById('tablesDisplay');
  var resultDisplay = document.getElementById('calcResult');

  function updateCalculator() {
    if (!spendSlider || !tablesSlider || !resultDisplay) return;
    var avgSpend = parseInt(spendSlider.value, 10) || 120;
    var tablesPerWeek = parseInt(tablesSlider.value, 10) || 18;

    if (spendDisplay) spendDisplay.textContent = '$' + avgSpend;
    if (tablesDisplay) tablesDisplay.textContent = tablesPerWeek + ' tables/wk';

    /* Monthly calculation: tables/wk * 4.33 weeks * avgSpend */
    var monthlyRevenue = Math.round(tablesPerWeek * 4.33 * avgSpend);
    resultDisplay.textContent = '+$' + monthlyRevenue.toLocaleString() + ' /mo';
  }

  if (spendSlider && tablesSlider) {
    spendSlider.addEventListener('input', updateCalculator);
    tablesSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  /* ---------- Interactive FAQ Accordion ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');
        faqItems.forEach(function (other) {
          other.classList.remove('active');
        });
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ---------- Contact / Free Audit Form ---------- */
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var success = document.getElementById('formSuccess');

  if (form && submitBtn && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitBtn.textContent = 'Submitting your request…';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.textContent = 'Claim Your Free Audit';
        submitBtn.disabled = false;
        success.classList.add('show');
        form.reset();
        setTimeout(function () {
          success.classList.remove('show');
        }, 6000);
      }, 700);
    });
  }
})();
