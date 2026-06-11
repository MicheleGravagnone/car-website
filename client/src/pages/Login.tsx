import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthShell } from "../components/AuthShell";
import { Field } from "../components/Field";
import { Spinner } from "../components/Spinner";
import { ApiError } from "../lib/api";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell eyebrow="Welcome back" title="Sign in">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-bone py-3.5 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent disabled:opacity-60"
        >
          {submitting ? <Spinner /> : "Sign in"}
        </button>
      </form>

      <p className="mt-6 rounded-lg border border-line bg-ink-2 px-4 py-3 text-xs text-muted">
        Demo account — <span className="text-bone">demo@porsche.dev</span> /{" "}
        <span className="text-bone">demo1234</span>
      </p>

      <p className="mt-8 text-sm text-muted">
        New here?{" "}
        <Link to="/signup" className="text-accent transition-colors hover:text-accent-soft">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
