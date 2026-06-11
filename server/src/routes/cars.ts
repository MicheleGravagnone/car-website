import { Router } from "express";
import { db } from "../db.js";

export const carsRouter = Router();

interface CarRow {
  id: number;
  model: string;
  trim: string;
  year: number;
  body: string;
  horsepower: number;
  zero_to_sixty: number;
  top_speed: number;
  transmission: string;
  fuel: string;
  price: number;
  tagline: string;
  description: string;
  hero_image: string;
}

const listStmt = db.prepare(
  "SELECT id, model, trim, year, fuel, price, tagline, hero_image FROM cars ORDER BY price ASC"
);
const carStmt = db.prepare("SELECT * FROM cars WHERE id = ?");
const colorsStmt = db.prepare("SELECT name, hex, image FROM car_colors WHERE car_id = ?");

// Public catalog — enough to browse, never the locked performance figures.
carsRouter.get("/", (_req, res) => {
  const rows = listStmt.all() as Pick<
    CarRow,
    "id" | "model" | "trim" | "year" | "fuel" | "price" | "tagline" | "hero_image"
  >[];
  res.json(
    rows.map((r) => ({
      id: r.id,
      model: r.model,
      trim: r.trim,
      year: r.year,
      fuel: r.fuel,
      price: r.price,
      tagline: r.tagline,
      heroImage: r.hero_image,
    }))
  );
});

// Detail view. Specs are returned only to authenticated users.
carsRouter.get("/:id", (req, res) => {
  const car = carStmt.get(Number(req.params.id)) as CarRow | undefined;
  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }

  const colors = colorsStmt.all(car.id);
  const unlocked = Boolean(req.userId);

  res.json({
    id: car.id,
    model: car.model,
    trim: car.trim,
    year: car.year,
    body: car.body,
    fuel: car.fuel,
    price: car.price,
    tagline: car.tagline,
    description: car.description,
    heroImage: car.hero_image,
    colors,
    locked: !unlocked,
    specs: unlocked
      ? {
          horsepower: car.horsepower,
          zeroToSixty: car.zero_to_sixty,
          topSpeed: car.top_speed,
          transmission: car.transmission,
        }
      : null,
  });
});
