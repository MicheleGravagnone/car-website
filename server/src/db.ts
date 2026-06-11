import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { config } from "./config.js";

mkdirSync(dirname(config.databasePath), { recursive: true });

export const db = new Database(config.databasePath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      surname     TEXT    NOT NULL,
      email       TEXT    NOT NULL UNIQUE,
      phone       TEXT    NOT NULL,
      birthdate   TEXT    NOT NULL,
      password    TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS cars (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      model         TEXT    NOT NULL,
      trim          TEXT    NOT NULL,
      year          INTEGER NOT NULL,
      body          TEXT    NOT NULL,
      horsepower    INTEGER NOT NULL,
      zero_to_sixty REAL    NOT NULL,
      top_speed     INTEGER NOT NULL,
      transmission  TEXT    NOT NULL,
      fuel          TEXT    NOT NULL,
      price         INTEGER NOT NULL,
      tagline       TEXT    NOT NULL,
      description   TEXT    NOT NULL,
      hero_image    TEXT    NOT NULL
    );

    CREATE TABLE IF NOT EXISTS car_colors (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      car_id  INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
      name    TEXT    NOT NULL,
      hex     TEXT    NOT NULL,
      image   TEXT    NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_car_colors_car_id ON car_colors(car_id);
  `);
}
