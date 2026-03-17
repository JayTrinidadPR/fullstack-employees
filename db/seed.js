import { createEmployee } from "#db/queries/employees";

import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alicia Park", birthday: "1990-03-14", salary: 70000 },
    { name: "Brianna Stone", birthday: "1988-11-02", salary: 92000 },
    { name: "Carl Jenkins", birthday: "1993-07-21", salary: 64000 },
    { name: "Derek Wu", birthday: "1985-09-18", salary: 88000 },
    { name: "Elena Novak", birthday: "1992-01-09", salary: 76000 },
    { name: "Fatima Idris", birthday: "1996-04-30", salary: 69000 },
    { name: "Glen Rivera", birthday: "1989-12-11", salary: 82000 },
    { name: "Hannah Lee", birthday: "1994-06-25", salary: 67000 },
    { name: "Iris Bennett", birthday: "1991-02-17", salary: 73000 },
    { name: "Jamal Ortiz", birthday: "1987-10-08", salary: 90000 },
  ];

  await Promise.all(employees.map(createEmployee));
}
