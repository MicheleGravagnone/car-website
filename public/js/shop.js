import { api, formatPrice } from "./api.js";
import { initLayout, observeReveals } from "./layout.js";

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const count = document.getElementById("count");

let cars = [];
let filter = "All";

function carCard(car, index) {
  const delay = ((index % 3) * 0.08).toFixed(2);
  return `
    <a class="car-card reveal" href="/car.html?id=${car.id}" style="transition-delay:${delay}s">
      <div class="frame">
        <img src="${car.heroImage}" alt="${car.model} ${car.trim}" loading="lazy" />
      </div>
      <div class="body">
        <div class="row">
          <h3>${car.model}</h3>
          <span class="trim">${car.trim}</span>
        </div>
        <p class="tagline">${car.tagline}</p>
        <div class="foot">
          <span class="price">${formatPrice(car.price)}</span>
          <span class="more">View →</span>
        </div>
      </div>
    </a>`;
}

function render() {
  const visible = filter === "All" ? cars : cars.filter((c) => c.fuel === filter);
  count.textContent = `${visible.length} ${visible.length === 1 ? "car" : "cars"}`;
  grid.innerHTML = visible.map(carCard).join("");
  observeReveals();
}

function renderFilters() {
  const fuels = ["All", ...new Set(cars.map((c) => c.fuel))];
  if (fuels.length <= 2) return;
  filters.innerHTML = fuels
    .map(
      (fuel) =>
        `<button class="chip${fuel === filter ? " active" : ""}" data-fuel="${fuel}">${fuel}</button>`
    )
    .join("");
  filters.querySelectorAll("[data-fuel]").forEach((btn) =>
    btn.addEventListener("click", () => {
      filter = btn.dataset.fuel;
      filters.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === btn));
      render();
    })
  );
}

async function load() {
  try {
    cars = await api.get("/cars");
    renderFilters();
    render();
  } catch (e) {
    grid.innerHTML = `<p class="state">Could not load the collection. Is the API running?</p>`;
    count.textContent = "";
  }
}

initLayout();
load();
