import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../lib/format";
import { Spinner } from "../components/Spinner";
import type { CarDetail as Car } from "../types";

const ease = [0.16, 1, 0.3, 1] as const;

export function CarDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeColor, setActiveColor] = useState(0);

  // Refetch when the id changes, or when auth changes (so specs unlock after login).
  useEffect(() => {
    setLoading(true);
    api
      .get<Car>(`/cars/${id}`)
      .then((data) => {
        setCar(data);
        setActiveColor(0);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (notFound || !car) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-28 pt-44 text-center">
        <h1 className="text-5xl">Car not found</h1>
        <Link to="/shop" className="mt-8 inline-block text-sm uppercase tracking-[0.2em] text-accent">
          ← Back to models
        </Link>
      </div>
    );
  }

  const image = car.colors[activeColor]?.image ?? car.heroImage;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-32 lg:px-10">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-bone"
      >
        ← All models
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden border border-line bg-ink-2">
            <motion.img
              key={image}
              src={image}
              alt={`${car.model} ${car.trim}`}
              className="aspect-[4/3] w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease }}
            />
          </div>

          {car.colors.length > 0 && (
            <div className="mt-6">
              <p className="eyebrow mb-3">{car.colors[activeColor]?.name}</p>
              <div className="flex flex-wrap gap-3">
                {car.colors.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(i)}
                    aria-label={color.name}
                    className={`h-9 w-9 rounded-full border transition-transform ${
                      i === activeColor
                        ? "border-accent ring-1 ring-accent ring-offset-2 ring-offset-ink"
                        : "border-line-strong hover:scale-110"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:pt-4">
          <p className="eyebrow mb-4">
            {car.year} · {car.body}
          </p>
          <h1 className="text-6xl sm:text-7xl">{car.model}</h1>
          <p className="mt-3 text-xl text-accent">{car.trim}</p>
          <p className="mt-6 max-w-md text-lg text-bone">{car.tagline}</p>
          <p className="mt-4 max-w-md leading-relaxed text-muted">{car.description}</p>

          <div className="mt-8 flex items-baseline gap-3 border-t border-line pt-6">
            <span className="text-xs uppercase tracking-[0.18em] text-faint">Starting at</span>
            <span className="font-display text-3xl">{formatPrice(car.price)}</span>
          </div>

          <div className="mt-10">
            <p className="eyebrow mb-5">Performance</p>
            {car.specs ? (
              <SpecGrid car={car} />
            ) : (
              <LockedSpecs />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecGrid({ car }: { car: Car }) {
  const specs = car.specs!;
  const items = [
    { label: "Horsepower", value: `${specs.horsepower}`, unit: "hp" },
    { label: "0–60 mph", value: `${specs.zeroToSixty}`, unit: "s" },
    { label: "Top track speed", value: `${specs.topSpeed}`, unit: "mph" },
    { label: "Fuel", value: car.fuel, unit: "" },
    { label: "Transmission", value: specs.transmission, unit: "" },
    { label: "Body", value: car.body, unit: "" },
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
      {items.map((item) => (
        <div key={item.label} className="bg-ink-2 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-faint">{item.label}</p>
          <p className="mt-2 font-display text-2xl">
            {item.value}
            {item.unit && <span className="ml-1 text-sm text-muted">{item.unit}</span>}
          </p>
        </div>
      ))}
    </div>
  );
}

function LockedSpecs() {
  return (
    <div className="relative overflow-hidden border border-line bg-ink-2 p-8">
      <div className="pointer-events-none grid grid-cols-2 gap-px opacity-20 blur-sm">
        {["620 hp", "3.1 s", "190 mph", "PDK"].map((v) => (
          <div key={v} className="p-4">
            <p className="font-display text-2xl">{v}</p>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink-2/40 text-center backdrop-blur-[2px]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path
            d="M6 10V8a6 6 0 1 1 12 0v2m-9 0h6a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="max-w-xs text-sm text-muted">
          Sign in to reveal the full performance figures for this model.
        </p>
        <Link
          to="/login"
          className="rounded-full bg-bone px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
