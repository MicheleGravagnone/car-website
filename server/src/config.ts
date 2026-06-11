import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-me",
  databasePath: process.env.DATABASE_PATH ?? "./data/app.db",
  isProduction: (process.env.NODE_ENV ?? "development") === "production",
};

if (config.isProduction && config.jwtSecret === "dev-secret-change-me") {
  throw new Error("JWT_SECRET must be set to a strong value in production");
}
