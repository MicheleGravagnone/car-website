import { Link } from "react-router-dom";
import { formatPrice } from "../lib/format";
import type { CarSummary } from "../types";

export function CarCard({ car }: { car: CarSummary }) {
  return (
    <Link
      to={`/cars/${car.id}`}
      className="group relative flex flex-col overflow-hidden border border-line bg-surface transition-colors duration-500 hover:border-line-strong"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <img
          src={car.heroImage}
          alt={`${car.model} ${car.trim}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full border border-line-strong bg-ink/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-bone backdrop-blur">
          {car.fuel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl">{car.model}</h3>
          <span className="text-sm text-muted">{car.year}</span>
        </div>
        <p className="mt-1 text-sm text-accent">{car.trim}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{car.tagline}</p>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <span className="text-xs uppercase tracking-[0.18em] text-faint">From</span>
          <span className="font-display text-lg">{formatPrice(car.price)}</span>
        </div>
      </div>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}
