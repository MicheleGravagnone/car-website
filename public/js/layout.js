import { api } from "./api.js";

const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;
const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>`;

function themeIcon() {
  return document.documentElement.getAttribute("data-theme") === "light" ? moonIcon : sunIcon;
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
  document.querySelectorAll(".theme-toggle").forEach((btn) => (btn.innerHTML = themeIcon()));
}

function toggleTheme() {
  const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  setTheme(next);
}

function activeClass(href) {
  const path = location.pathname;
  const here = path === "/" || path.endsWith("/index.html") ? "/" : path;
  return href === here ? " active" : "";
}

function headerMarkup(user) {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop.html", label: "Models" },
  ];
  if (user) navLinks.push({ href: "/dashboard.html", label: "Dashboard" });

  const desktopLinks = navLinks
    .map((l) => `<li><a class="nav-item${activeClass(l.href)}" href="${l.href}">${l.label}</a></li>`)
    .join("");

  const mobileLinks = navLinks
    .map((l) => `<li><a class="mobile-item${activeClass(l.href)}" href="${l.href}">${l.label}</a></li>`)
    .join("");

  const account = user
    ? `<button class="nav-signout" data-signout>Sign out</button>`
    : `<a class="btn-outline" href="/login.html">Account</a>`;

  const mobileAccount = user
    ? `<li><button class="mobile-item" data-signout style="color: var(--muted)">Sign out</button></li>`
    : `<li><a class="mobile-item" href="/login.html">Account</a></li>`;

  return `
    <header class="site-header" id="siteHeader">
      <nav class="nav container">
        <a href="/" aria-label="Porsche home">
          <img class="brand-logo" src="/img/porsche_white.png" alt="Porsche" />
        </a>
        <div class="nav-desktop">
          <ul class="nav-links">${desktopLinks}</ul>
          ${account}
          <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme">${themeIcon()}</button>
        </div>
        <div class="nav-mobile-controls">
          <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme">${themeIcon()}</button>
          <button class="burger" data-burger aria-label="Toggle menu">
            <span class="bars"><span></span><span></span></span>
          </button>
        </div>
      </nav>
      <div class="mobile-menu">
        <ul>${mobileLinks}${mobileAccount}</ul>
      </div>
    </header>`;
}

function footerMarkup() {
  const partners = [
    { name: "Michelin", img: "/img/partner_michelin.jpg", href: "https://www.michelinman.com" },
    {
      name: "Mobil 1",
      img: "/img/partner_mobil1.jpg",
      href: "https://www.mobil.com/en/lubricants/for-personal-vehicles",
    },
    { name: "TAG Heuer", img: "/img/partner_tagheuer.jpg", href: "https://www.tagheuer.com" },
  ];

  const partnerItems = partners
    .map(
      (p) =>
        `<li><a href="${p.href}" target="_blank" rel="noreferrer"><img src="${p.img}" alt="${p.name}" /></a></li>`
    )
    .join("");

  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-about">
          <img class="brand-logo" src="/img/porsche_white.png" alt="Porsche" />
          <p>A showcase of sports cars built to take the everyday out of every day.</p>
        </div>
        <div class="footer-col">
          <p class="eyebrow">Explore</p>
          <ul class="footer-list">
            <li><a href="/">Home</a></li>
            <li><a href="/shop.html">Models</a></li>
            <li><a href="/dashboard.html">Dashboard</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="eyebrow">Partners</p>
          <ul class="partners">${partnerItems}</ul>
        </div>
      </div>
      <div class="container">
        <div class="footer-base">
          <p>&copy; ${new Date().getFullYear()} Porsche Showcase</p>
          <p>Engineered for magic. Every day.</p>
        </div>
      </div>
    </footer>`;
}

function wireChrome() {
  const header = document.getElementById("siteHeader");

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) =>
    btn.addEventListener("click", toggleTheme)
  );

  const burger = header.querySelector("[data-burger]");
  burger?.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    header.classList.toggle("scrolled", open || window.scrollY > 24);
  });

  document.querySelectorAll("[data-signout]").forEach((btn) =>
    btn.addEventListener("click", async () => {
      await api.post("/auth/logout").catch(() => {});
      location.href = "/";
    })
  );
}

function observeReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

export async function getCurrentUser() {
  try {
    const data = await api.get("/auth/me");
    return data.user;
  } catch (e) {
    return null;
  }
}

export async function initLayout() {
  const user = await getCurrentUser();
  const headerSlot = document.getElementById("header");
  const footerSlot = document.getElementById("footer");
  if (headerSlot) headerSlot.innerHTML = headerMarkup(user);
  if (footerSlot) footerSlot.innerHTML = footerMarkup();
  wireChrome();
  observeReveals();
  return user;
}

export { observeReveals };
