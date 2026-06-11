# Porsche Showcase

A full-stack Porsche showcase site: browse the model range, create an account, and
unlock full performance figures for every car. Built as a modern rebuild of an earlier
university project, with a fresh React frontend and a secure REST API.

![Home](screenshots/home-dark.png)

## Highlights

- **Slick, responsive UI** with a dark/light theme toggle, scroll-reveal motion, and a
  cohesive editorial design system.
- **Real authentication** — bcrypt-hashed passwords and JWTs delivered via `httpOnly`
  cookies, with session restore on reload.
- **Auth-gated content** — anyone can browse models, but full performance specs are
  revealed only to signed-in users (enforced on the server, not just the UI).
- **Zero-setup database** — SQLite via `better-sqlite3`, seeded with one command. No
  external database to install.

## Tech stack

| Layer    | Tools |
| -------- | ----- |
| Frontend | React, TypeScript, Vite, Tailwind CSS v4, Motion, React Router |
| Backend  | Node.js, Express, TypeScript, SQLite (`better-sqlite3`), Zod, JWT, bcrypt |

## Project structure

```
.
├── client/          # React + Vite single-page app
│   ├── src/
│   │   ├── components/   # Header, Footer, cards, form fields, theme toggle…
│   │   ├── context/      # auth + theme providers
│   │   ├── pages/        # Home, Shop, CarDetail, Login, Signup, Dashboard
│   │   └── lib/          # api client, formatting
│   └── public/img/       # car & brand imagery
├── server/          # Express API
│   └── src/
│       ├── routes/       # /auth and /cars
│       ├── middleware/   # auth + error handling
│       ├── lib/          # token helpers
│       ├── data/         # seed catalog
│       ├── db.ts         # schema + connection
│       └── seed.ts       # (re)seed the database
└── scripts/dev.mjs  # runs both dev servers together
```

## Getting started

Requires Node.js 18+.

```bash
# install all workspaces
npm install

# create and seed the SQLite database
npm run seed

# run API (http://localhost:4000) and web (http://localhost:5173) together
npm run dev
```

Then open <http://localhost:5173>.

**Demo account:** `demo@porsche.dev` / `demo1234`

### Useful scripts

| Command         | What it does                              |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start the API and web dev servers         |
| `npm run seed`  | Rebuild the catalog and demo user         |
| `npm run build` | Type-check and build both apps            |
| `npm start`     | Run the compiled API (after `npm run build`) |

The API reads optional config from `server/.env` (see `server/.env.example`). The defaults
work out of the box for local development.

## API

| Method | Route             | Description                                   |
| ------ | ----------------- | --------------------------------------------- |
| POST   | `/api/auth/signup`| Create an account, sets the auth cookie       |
| POST   | `/api/auth/login` | Sign in, sets the auth cookie                 |
| POST   | `/api/auth/logout`| Clear the session                             |
| GET    | `/api/auth/me`    | Current user (requires auth)                  |
| GET    | `/api/cars`       | Public catalog summary                        |
| GET    | `/api/cars/:id`   | Car detail — performance specs require auth   |

## What changed from the original

The first version was vanilla HTML/CSS/JS with a PHP + PostgreSQL backend. The rebuild
keeps the spirit of the site while modernising it end to end:

- Replaced raw, string-interpolated SQL with **parameterized queries** (no SQL injection).
- Replaced `md5` password hashing with **bcrypt**.
- Moved hard-coded credentials into **environment variables**.
- Split a set of standalone PHP pages into a **typed REST API and a component-based SPA**.
- Swapped PostgreSQL for **embedded SQLite**, so the project runs anywhere with no setup.

The original files are preserved locally under `legacy/` for reference.

## Screenshots

| Models | Car detail |
| ------ | ---------- |
| ![Shop](screenshots/shop.png) | ![Car detail](screenshots/car-detail.png) |

| Dashboard | Light theme |
| --------- | ----------- |
| ![Dashboard](screenshots/dashboard.png) | ![Light theme](screenshots/home-light.png) |
