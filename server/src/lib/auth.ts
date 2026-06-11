import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";
import { config } from "../config.js";

const TOKEN_TTL = "7d";
export const AUTH_COOKIE = "token";

export function signToken(userId: number): string {
  return jwt.sign({ sub: String(userId) }, config.jwtSecret, { expiresIn: TOKEN_TTL });
}

export function verifyToken(token: string): number | null {
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { sub: string };
    const id = Number(payload.sub);
    return Number.isInteger(id) ? id : null;
  } catch {
    return null;
  }
}

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: config.isProduction,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};
