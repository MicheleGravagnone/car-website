import { initLayout } from "./layout.js";

const pad = (n) => String(n).padStart(2, "0");

function startClock() {
  const dateEl = document.getElementById("clockDate");
  const timeEl = document.getElementById("clockTime");
  const tick = () => {
    const now = new Date();
    dateEl.textContent = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
    timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  };
  tick();
  setInterval(tick, 1000);
}

function renderDetails(user) {
  const rows = [
    { label: "Name", value: user.name },
    { label: "Surname", value: user.surname },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Birth date", value: user.birthdate },
  ];
  document.getElementById("greeting").textContent = `Welcome, ${user.name}.`;
  document.getElementById("details").innerHTML = rows
    .map(
      (r) =>
        `<div class="row"><dt>${r.label}</dt><dd>${r.value}</dd></div>`
    )
    .join("");
}

const main = document.getElementById("dashboard");

initLayout().then((user) => {
  if (!user) {
    location.href = "/login.html?from=" + encodeURIComponent("/dashboard.html");
    return;
  }
  main.hidden = false;
  renderDetails(user);
  startClock();
});
