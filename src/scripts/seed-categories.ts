//TODO: create a script to seed categories

import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Cars and Vehicles",
  "Comedy",
  "Education",
  "Gaming",
  "Entertainment",
  "Film and Animation",
  "Music",
  "News and Politics",
  "Pets And Animals",
  "Sports",
  "Travel And Events",
];

async function main() {
  console.log("Seeding categories");

  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }));
    await db.insert(categories).values(values);

    console.log("Categories Seeded successfully");
  } catch (error) {
    console.error("Error Seeding Categories", error);
    process.exit(1);
  }
}

main();
