import { initLayout } from "./layout.js";

function initCountUp() {
  const els = document.querySelectorAll("[data-countup]");
  if (!els.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        observer.unobserve(el);

        const target = parseFloat(el.dataset.countup);
        const suffix = el.dataset.suffix ?? "";
        const isDecimal = !Number.isInteger(target);
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );

  els.forEach((el) => observer.observe(el));
}

function initParallax() {
  const img = document.querySelector(".hero-img");
  if (!img || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        img.style.transform = `scale(1) translateY(${window.scrollY * 0.22}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }

  img.addEventListener("animationend", () => {
    window.addEventListener("scroll", onScroll, { passive: true });
  }, { once: true });
}

initLayout();
initCountUp();
initParallax();
