import bcrypt from "bcryptjs";
import { db, initSchema } from "./db.js";
import { cars } from "./data/cars.js";

// Rebuilds the catalog and a demo account from scratch. Safe to run repeatedly.
function seed() {
  initSchema();

  const reset = db.transaction(() => {
    db.exec("DELETE FROM car_colors; DELETE FROM cars;");
    db.exec("DELETE FROM sqlite_sequence WHERE name IN ('cars', 'car_colors')");

    const insertCar = db.prepare(`
      INSERT INTO cars (model, trim, year, body, horsepower, zero_to_sixty,
                        top_speed, transmission, fuel, price, tagline, description, hero_image)
      VALUES (@model, @trim, @year, @body, @horsepower, @zeroToSixty,
              @topSpeed, @transmission, @fuel, @price, @tagline, @description, @heroImage)
    `);
    const insertColor = db.prepare(`
      INSERT INTO car_colors (car_id, name, hex, image) VALUES (?, ?, ?, ?)
    `);

    for (const car of cars) {
      const { lastInsertRowid } = insertCar.run(car);
      for (const color of car.colors) {
        insertColor.run(lastInsertRowid, color.name, color.hex, color.image);
      }
    }
  });
  reset();

  // A ready-to-use account so the login flow can be demoed immediately.
  const demoEmail = "demo@porsche.dev";
  const exists = db.prepare("SELECT 1 FROM users WHERE email = ?").get(demoEmail);
  if (!exists) {
    db.prepare(`
      INSERT INTO users (name, surname, email, phone, birthdate, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run("Demo", "Driver", demoEmail, "+1 555 0100", "1995-05-20", bcrypt.hashSync("demo1234", 12));
  }

  const carCount = db.prepare("SELECT COUNT(*) AS n FROM cars").get() as { n: number };
  console.log(`Seeded ${carCount.n} cars. Demo login: ${demoEmail} / demo1234`);
}

seed();
