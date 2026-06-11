import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "../db.js";
import { AUTH_COOKIE, cookieOptions, signToken } from "../lib/auth.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(60),
  surname: z.string().trim().min(1, "Surname is required").max(60),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(5, "Enter a valid phone number").max(30),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
});

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

interface UserRow {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  birthdate: string;
  password: string;
}

function publicUser(u: UserRow) {
  return {
    id: u.id,
    name: u.name,
    surname: u.surname,
    email: u.email,
    phone: u.phone,
    birthdate: u.birthdate,
  };
}

authRouter.post("/signup", (req, res, next) => {
  try {
    const data = signupSchema.parse(req.body);

    const taken = db.prepare("SELECT 1 FROM users WHERE email = ?").get(data.email.toLowerCase());
    if (taken) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const passwordHash = bcrypt.hashSync(data.password, 12);
    const { lastInsertRowid } = db
      .prepare(
        `INSERT INTO users (name, surname, email, phone, birthdate, password)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(data.name, data.surname, data.email.toLowerCase(), data.phone, data.birthdate, passwordHash);

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(lastInsertRowid) as UserRow;
    res.cookie(AUTH_COOKIE, signToken(user.id), cookieOptions);
    res.status(201).json({ user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(data.email.toLowerCase()) as UserRow | undefined;

    // Same response whether the email or the password is wrong.
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.cookie(AUTH_COOKIE, signToken(user.id), cookieOptions);
    res.json({ user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(AUTH_COOKIE, { ...cookieOptions, maxAge: undefined });
  res.status(204).end();
});

authRouter.get("/me", requireAuth, (req, res) => {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId) as UserRow | undefined;
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ user: publicUser(user) });
});
