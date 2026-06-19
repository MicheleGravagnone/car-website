import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-me",
  databasePath: process.env.DATABASE_PATH ?? "./data/app.db",
  publicDir: process.env.PUBLIC_DIR ?? path.resolve(here, "../../public"),
  isProduction: (process.env.NODE_ENV ?? "development") === "production",
};

if (config.isProduction && config.jwtSecret === "dev-secret-change-me") {
  throw new Error("JWT_SECRET must be set to a strong value in production");
}
