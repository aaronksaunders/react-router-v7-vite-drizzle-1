import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { users, posts } from "./schema";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

const seedUsers = [
  { name: "John Doe", username: "johnd", email: "john@example.com" },
  { name: "Jane Smith", username: "janes", email: "jane@example.com" },
];

const seedPosts = [
  { title: "First Post", content: "This is the first post", authorId: 1 },
  { title: "Second Post", content: "This is the second post", authorId: 2 },
];

async function seed() {
  console.log("Clearing database...");

  await db.delete(posts).run();
  await db.delete(users).run();

  console.log("Seeding database...");

  await db.insert(users).values(seedUsers);
  await db.insert(posts).values(seedPosts);

  console.log("Seeding completed.");
}

seed().catch(console.error);
