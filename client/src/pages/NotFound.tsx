import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-[clamp(4rem,18vw,12rem)] leading-none">Lost</h1>
      <p className="mt-4 text-muted">This road doesn't lead anywhere.</p>
      <Link
        to="/"
        className="mt-10 rounded-full bg-bone px-8 py-3 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent"
      >
        Back home
      </Link>
    </div>
  );
}
