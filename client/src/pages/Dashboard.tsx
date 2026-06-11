import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Reveal } from "../components/Reveal";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return { date, time };
}

export function Dashboard() {
  const { user } = useAuth();
  const { date, time } = useClock();
  if (!user) return null;

  const details = [
    { label: "Name", value: user.name },
    { label: "Surname", value: user.surname },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Birth date", value: user.birthdate },
  ];

  return (
    <>
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <img
          src="/img/dashboard_image.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <p className="eyebrow mb-4">Your garage</p>
          <h1 className="text-5xl sm:text-7xl">Welcome, {user.name}.</h1>
          <p className="mt-4 font-display text-xl text-muted">
            {date} — <span className="tabular-nums">{time}</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="eyebrow mb-6">Account</p>
            <h2 className="text-3xl">My details</h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {details.map((d) => (
                <div key={d.label} className="flex items-center justify-between py-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-faint">{d.label}</dt>
                  <dd className="text-bone">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between border border-line bg-ink-2 p-10">
              <div>
                <p className="eyebrow mb-6">Unlocked</p>
                <h2 className="text-balance text-3xl">
                  Full performance figures are now yours to explore.
                </h2>
                <p className="mt-6 leading-relaxed text-muted">
                  As a member you can view complete specifications — horsepower, acceleration and top
                  track speed — across the entire range.
                </p>
              </div>
              <Link
                to="/shop"
                className="mt-10 inline-flex items-center gap-3 self-start rounded-full bg-accent px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent-soft"
              >
                View our cars →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
