import type { NextFunction, Request, Response } from "express";
import { AUTH_COOKIE, verifyToken } from "../lib/auth.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

// Reads the auth cookie if present; never blocks the request.
export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.[AUTH_COOKIE];
  if (token) {
    const userId = verifyToken(token);
    if (userId) req.userId = userId;
  }
  next();
}

// Rejects the request when there is no valid session.
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}
