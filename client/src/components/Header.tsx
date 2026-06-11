import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Models" },
];

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || menuOpen
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <img src="/img/porsche_white.png" alt="Porsche" className="brand-logo h-4 w-auto" />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.to}>
                <NavItem to={link.to} end={link.end}>
                  {link.label}
                </NavItem>
              </li>
            ))}
            {user && (
              <li>
                <NavItem to="/dashboard">Dashboard</NavItem>
              </li>
            )}
          </ul>

          {user ? (
            <button
              onClick={handleLogout}
              className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-bone"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-line-strong px-5 py-2 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:border-accent hover:text-accent"
            >
              Account
            </Link>
          )}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
          <div className="relative h-3 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-bone transition-transform duration-300 ${
                menuOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-bone transition-transform duration-300 ${
                menuOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-2 px-6 pb-8 pt-2">
              {links.map((link) => (
                <li key={link.to}>
                  <MobileItem to={link.to} end={link.end} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </MobileItem>
                </li>
              ))}
              {user && (
                <li>
                  <MobileItem to="/dashboard" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </MobileItem>
                </li>
              )}
              <li className="pt-2">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="font-display text-2xl text-muted"
                  >
                    Sign out
                  </button>
                ) : (
                  <MobileItem to="/login" onClick={() => setMenuOpen(false)}>
                    Account
                  </MobileItem>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({ to, end, children }: { to: string; end?: boolean; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group relative text-xs uppercase tracking-[0.2em] transition-colors ${
          isActive ? "text-bone" : "text-muted hover:text-bone"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

function MobileItem({
  to,
  end,
  onClick,
  children,
}: {
  to: string;
  end?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `block font-display text-2xl transition-colors ${
          isActive ? "text-accent" : "text-bone"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
