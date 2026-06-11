import type { ReactNode } from "react";
import { Link } from "react-router-dom";

// Split-screen frame shared by the login and signup pages.
export function AuthShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src="/img/img3.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12">
          <Link to="/">
            <img src="/img/porsche_white.png" alt="Porsche" className="brand-logo h-5 w-auto" />
          </Link>
          <p className="mt-6 max-w-xs font-display text-3xl leading-tight">
            Engineered for magic. Every day.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-32 lg:py-20">
        <div className="w-full max-w-md">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
