import path from "node:path";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config.js";
import { initSchema } from "./db.js";
import { optionalAuth } from "./middleware/auth.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { authRouter } from "./routes/auth.js";
import { carsRouter } from "./routes/cars.js";

initSchema();

const app = express();

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
      },
    },
  })
);
app.use(morgan(config.isProduction ? "combined" : "dev"));
app.use(express.json());
app.use(cookieParser());
app.use(optionalAuth);

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/cars", carsRouter);
app.use("/api", notFound);

app.use(express.static(config.publicDir, { extensions: ["html"] }));
app.use((_req, res) => res.status(404).sendFile(path.join(config.publicDir, "404.html")));

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
