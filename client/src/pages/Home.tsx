import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Reveal } from "../components/Reveal";

const models = [
  {
    name: "718",
    image: "/img/porsche_718.jpg",
    copy: "Mid-engined roadsters that unite the sporting spirit of the legendary 718 with the sports car of tomorrow.",
  },
  {
    name: "911",
    image: "/img/porsche_911.jpg",
    copy: "An unmistakable flyline that has defined the sports car since 1963. Purism, distilled.",
  },
  {
    name: "Cayenne",
    image: "/img/porsche_cayenne.jpg",
    copy: "Driving pleasure on every terrain, paired with the design typical of a Porsche.",
  },
  {
    name: "Panamera",
    image: "/img/porsche_panamera.jpg",
    copy: "For those who use freedom to follow their instincts — a sports car that seats four.",
  },
  {
    name: "Taycan",
    image: "/img/porsche_taycan.jpg",
    copy: "Electricity, made electrifying. Performance even more impressive than you imagined.",
  },
  {
    name: "Macan",
    image: "/img/porsche_macan.jpg",
    copy: "Five doors, five seats — yet incomparable, unmistakable and unstoppable.",
  },
];

const stats = [
  { value: "75", label: "Years of sports cars" },
  { value: "9", label: "Models in the range" },
  { value: "2.6s", label: "Fastest 0–60 mph" },
  { value: "640", label: "Peak horsepower" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative flex h-screen min-h-[640px] items-end overflow-hidden">
        <motion.img
          src="/img/img1.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,10,11,0.7))]" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            Dr. Ing. h.c. F. Porsche
          </motion.p>
          <motion.h1
            className="font-display text-[clamp(4rem,16vw,15rem)] font-extrabold leading-[0.85]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease }}
          >
            Porsche
          </motion.h1>
          <motion.div
            className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
          >
            <p className="max-w-md text-lg text-muted">Engineered for magic. Every day.</p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 self-start rounded-full bg-bone px-7 py-3 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent"
            >
              Explore the range
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-line-strong" />
        </motion.div>
      </section>

      {/* ------------------------------------------------------- Welcome */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden">
              <img
                src="/img/img2.jpg"
                alt="Porsche on the road"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-6">Performance, redefined</p>
            <h2 className="text-balance text-4xl sm:text-5xl">
              A world where every drive is an exhilarating experience.
            </h2>
            <p className="mt-8 max-w-md leading-relaxed text-muted">
              Embark on a journey through luxury and precision engineering. We transcend the
              ordinary, crafting iconic sports cars that blend cutting-edge technology with
              unparalleled design — pushing the boundaries of innovation and setting new standards in
              automotive excellence.
            </p>
            <Link
              to="/shop"
              className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-bone transition-colors hover:text-accent"
            >
              <span className="h-px w-8 bg-accent" />
              Browse models
            </Link>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Stats */}
      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 lg:grid-cols-4 lg:px-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="py-12 text-center">
                <p className="font-display text-5xl text-accent sm:text-6xl">{s.value}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- Models */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-4">The range</p>
              <h2 className="text-5xl sm:text-6xl">Our Models</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Six families, one philosophy. Each built to take the everyday out of every day.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model, i) => (
            <Reveal key={model.name} delay={(i % 3) * 0.1}>
              <Link
                to="/shop"
                className="group relative block overflow-hidden border border-line"
              >
                <div className="aspect-[4/3] overflow-hidden bg-ink">
                  <img
                    src={model.image}
                    alt={model.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-3xl">{model.name}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-muted opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {model.copy}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- CTA */}
      <section className="relative overflow-hidden border-t border-line">
        <img
          src="/img/img3.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center">
          <Reveal>
            <h2 className="text-balance text-4xl sm:text-6xl">Find the Porsche that is yours.</h2>
            <p className="mx-auto mt-6 max-w-md text-muted">
              Create an account to unlock full performance figures and configure every model in the
              range.
            </p>
            <Link
              to="/signup"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent-soft"
            >
              Create account
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
