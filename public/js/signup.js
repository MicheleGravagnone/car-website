import { api, ApiError } from "./api.js";

const form = document.getElementById("signupForm");
const submit = document.getElementById("submit");
const formError = document.getElementById("formError");

const birthdate = form.birthdate;
birthdate.max = new Date().toISOString().slice(0, 10);

const fields = ["name", "surname", "email", "phone", "birthdate", "password", "confirm"];

function clearErrors() {
  formError.textContent = "";
  fields.forEach((f) => {
    const el = document.getElementById(`err-${f}`);
    if (el) el.textContent = "";
  });
}

function showError(field, message) {
  const el = document.getElementById(`err-${field}`);
  if (el) el.textContent = message;
  else formError.textContent = message;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  if (form.password.value !== form.confirm.value) {
    showError("confirm", "Passwords do not match");
    return;
  }

  submit.disabled = true;
  const label = submit.textContent;
  submit.innerHTML = '<span class="spinner"></span>';

  try {
    await api.post("/auth/signup", {
      name: form.name.value,
      surname: form.surname.value,
      email: form.email.value,
      phone: form.phone.value,
      birthdate: form.birthdate.value,
      password: form.password.value,
    });
    location.href = "/dashboard.html";
  } catch (err) {
    if (err instanceof ApiError && err.details?.length) {
      err.details.forEach((d) => showError(d.field, d.message));
    } else {
      formError.textContent = err instanceof ApiError ? err.message : "Something went wrong";
    }
    submit.disabled = false;
    submit.textContent = label;
  }
});
