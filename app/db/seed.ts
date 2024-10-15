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
  { title: "Third Post", content: "This is the third post", authorId: 1 },
  { title: "Fourth Post", content: "This is the fourth post", authorId: 2 },
  { title: "Fifth Post", content: "This is the fifth post", authorId: 1 },
  { title: "Sixth Post", content: "This is the sixth post", authorId: 2 },
  { title: "Seventh Post", content: "This is the seventh post", authorId: 1 },
  { title: "Eighth Post", content: "This is the eighth post", authorId: 2 },
  { title: "Ninth Post", content: "This is the ninth post", authorId: 1 },
  { title: "Tenth Post", content: "This is the tenth post", authorId: 2 },
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
