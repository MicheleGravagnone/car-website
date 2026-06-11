import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthShell } from "../components/AuthShell";
import { Field } from "../components/Field";
import { Spinner } from "../components/Spinner";
import { ApiError } from "../lib/api";

const today = new Date().toISOString().slice(0, 10);

export function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    birthdate: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (form.password !== form.confirm) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }

    setSubmitting(true);
    try {
      const { confirm, ...payload } = form;
      void confirm;
      await signup(payload);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.details?.length) {
        setErrors(Object.fromEntries(err.details.map((d) => [d.field, d.message])));
      } else if (err instanceof ApiError) {
        setErrors({ form: err.message });
      } else {
        setErrors({ form: "Something went wrong" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell eyebrow="Join Porsche" title="Create account">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <Field id="name" label="Name" value={form.name} onChange={update("name")} error={errors.name} required />
          <Field
            id="surname"
            label="Surname"
            value={form.surname}
            onChange={update("surname")}
            error={errors.surname}
            required
          />
        </div>
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            id="phone"
            label="Phone"
            value={form.phone}
            onChange={update("phone")}
            error={errors.phone}
            required
          />
          <Field
            id="birthdate"
            label="Birth date"
            type="date"
            min="1900-01-01"
            max={today}
            value={form.birthdate}
            onChange={update("birthdate")}
            error={errors.birthdate}
            required
          />
        </div>
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={update("password")}
          error={errors.password}
          required
        />
        <Field
          id="confirm"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={update("confirm")}
          error={errors.confirm}
          required
        />

        {errors.form && <p className="text-sm text-red-400">{errors.form}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-bone py-3.5 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent disabled:opacity-60"
        >
          {submitting ? <Spinner /> : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="text-accent transition-colors hover:text-accent-soft">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
