import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { CarCard } from "../components/CarCard";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import type { CarSummary } from "../types";

export function Shop() {
  const [cars, setCars] = useState<CarSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api
      .get<CarSummary[]>("/cars")
      .then(setCars)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const fuels = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((c) => c.fuel)))],
    [cars]
  );
  const visible = filter === "All" ? cars : cars.filter((c) => c.fuel === filter);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-36 lg:px-10">
      <header className="flex flex-col justify-between gap-8 border-b border-line pb-10 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-4">The collection</p>
          <h1 className="text-5xl sm:text-7xl">Models</h1>
        </div>
        {!loading && !error && (
          <p className="text-sm uppercase tracking-[0.18em] text-muted">
            {visible.length} {visible.length === 1 ? "car" : "cars"}
          </p>
        )}
      </header>

      {!loading && !error && fuels.length > 2 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {fuels.map((fuel) => (
            <button
              key={fuel}
              onClick={() => setFilter(fuel)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                filter === fuel
                  ? "border-accent bg-accent text-ink"
                  : "border-line-strong text-muted hover:text-bone"
              }`}
            >
              {fuel}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-32">
          <Spinner />
        </div>
      )}

      {error && (
        <p className="py-32 text-center text-muted">
          Could not load the collection. Is the API running?
        </p>
      )}

      {!loading && !error && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((car, i) => (
            <Reveal key={car.id} delay={(i % 3) * 0.08}>
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
