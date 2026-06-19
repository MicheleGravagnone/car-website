import { api, formatPrice } from "./api.js";
import { initLayout } from "./layout.js";

const root = document.getElementById("car");
const params = new URLSearchParams(location.search);
const id = params.get("id");

let car = null;
let activeColor = 0;

function specGrid() {
  const s = car.specs;
  const items = [
    { k: "Horsepower", v: s.horsepower, u: "hp" },
    { k: "0–60 mph", v: s.zeroToSixty, u: "s" },
    { k: "Top track speed", v: s.topSpeed, u: "mph" },
    { k: "Fuel", v: car.fuel, u: "" },
    { k: "Transmission", v: s.transmission, u: "" },
    { k: "Body", v: car.body, u: "" },
  ];
  return `<div class="spec-grid">${items
    .map(
      (i) =>
        `<div class="spec"><p class="k">${i.k}</p><p class="v">${i.v}${
          i.u ? `<span class="u">${i.u}</span>` : ""
        }</p></div>`
    )
    .join("")}</div>`;
}

function lockedSpecs() {
  const ghost = ["620 hp", "3.1 s", "190 mph", "PDK"]
    .map((v) => `<div>${v}</div>`)
    .join("");
  return `
    <div class="locked">
      <div class="ghost">${ghost}</div>
      <div class="overlay">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 10V8a6 6 0 1 1 12 0v2m-9 0h6a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Sign in to reveal the full performance figures for this model.</p>
        <a class="btn btn-light" href="/login.html?from=${encodeURIComponent(location.pathname + location.search)}">Log in</a>
      </div>
    </div>`;
}

function render() {
  const image = car.colors[activeColor]?.image ?? car.heroImage;
  const swatches = car.colors.length
    ? `<div class="swatches">
        <p class="eyebrow" id="colorName" style="margin-bottom:.75rem">${car.colors[activeColor].name}</p>
        <div class="swatch-row">
          ${car.colors
            .map(
              (c, i) =>
                `<button class="swatch${i === activeColor ? " active" : ""}" data-color="${i}" style="background-color:${c.hex}" aria-label="${c.name}"></button>`
            )
            .join("")}
        </div>
      </div>`
    : "";

  root.innerHTML = `
    <a class="back-link" href="/shop.html">← All models</a>
    <div class="detail">
      <div>
        <div class="gallery"><img id="hero" src="${image}" alt="${car.model} ${car.trim}" /></div>
        ${swatches}
      </div>
      <div>
        <p class="eyebrow">${car.year} · ${car.body}</p>
        <h1 class="detail-title">${car.model}</h1>
        <p class="detail-trim">${car.trim}</p>
        <p class="detail-tagline">${car.tagline}</p>
        <p class="detail-desc">${car.description}</p>
        <div class="price-row">
          <span class="label">Starting at</span>
          <span class="value">${formatPrice(car.price)}</span>
        </div>
        <div class="perf">
          <p class="eyebrow" style="margin-bottom:1.25rem">Performance</p>
          ${car.specs ? specGrid() : lockedSpecs()}
        </div>
      </div>
    </div>`;

  root.querySelectorAll("[data-color]").forEach((btn) =>
    btn.addEventListener("click", () => {
      activeColor = Number(btn.dataset.color);
      const hero = document.getElementById("hero");
      hero.src = car.colors[activeColor].image;
      hero.style.animation = "none";
      void hero.offsetWidth;
      hero.style.animation = "";
      document.getElementById("colorName").textContent = car.colors[activeColor].name;
      root.querySelectorAll(".swatch").forEach((s, i) =>
        s.classList.toggle("active", i === activeColor)
      );
    })
  );
}

async function load() {
  if (!id) {
    root.innerHTML = notFoundMarkup();
    return;
  }
  try {
    car = await api.get(`/cars/${id}`);
    document.title = `${car.model} ${car.trim} — Porsche`;
    render();
  } catch (e) {
    root.innerHTML = notFoundMarkup();
  }
}

function notFoundMarkup() {
  return `
    <div class="state">
      <h1 style="font-size:clamp(2.5rem,8vw,3.5rem)">Car not found</h1>
      <a class="back-link" style="margin-top:2rem" href="/shop.html">← Back to models</a>
    </div>`;
}

initLayout();
load();
