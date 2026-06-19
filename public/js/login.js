import { api, ApiError } from "./api.js";

const form = document.getElementById("loginForm");
const errorEl = document.getElementById("formError");
const submit = document.getElementById("submit");

const params = new URLSearchParams(location.search);
const redirect = params.get("from") || "/dashboard.html";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.textContent = "";
  submit.disabled = true;
  submit.dataset.label = submit.textContent;
  submit.innerHTML = '<span class="spinner"></span>';

  try {
    await api.post("/auth/login", {
      email: form.email.value,
      password: form.password.value,
    });
    location.href = redirect;
  } catch (err) {
    errorEl.textContent = err instanceof ApiError ? err.message : "Something went wrong";
    submit.disabled = false;
    submit.textContent = submit.dataset.label;
  }
});
