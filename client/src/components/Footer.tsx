import { Link } from "react-router-dom";

const partners = [
  { name: "Michelin", img: "/img/partner_michelin.jpg", href: "https://www.michelinman.com" },
  {
    name: "Mobil 1",
    img: "/img/partner_mobil1.jpg",
    href: "https://www.mobil.com/en/lubricants/for-personal-vehicles",
  },
  { name: "TAG Heuer", img: "/img/partner_tagheuer.jpg", href: "https://www.tagheuer.com" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/img/porsche_white.png" alt="Porsche" className="brand-logo h-4 w-auto" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              A showcase of sports cars built to take the everyday out of every day.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link to="/" className="transition-colors hover:text-bone">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-bone">
                  Models
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="transition-colors hover:text-bone">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Partners</p>
            <ul className="flex flex-wrap gap-3">
              {partners.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block overflow-hidden rounded-lg border border-line opacity-70 transition-opacity hover:opacity-100"
                  >
                    <img src={p.img} alt={p.name} className="h-12 w-12 object-cover" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs uppercase tracking-[0.18em] text-faint sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Porsche Showcase</p>
          <p>Engineered for magic. Every day.</p>
        </div>
      </div>
    </footer>
  );
}
