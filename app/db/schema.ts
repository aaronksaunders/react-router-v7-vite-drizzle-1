import { InferInsertModel, InferModel, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
/**
 * Defines a SQLite table named 'users' with the following columns:
 * - `id`: an integer primary key
 * - `name`: a text field that is required to be not null
 * - `username`: a text field that is required to be not null
 * - `email`: a text field that is required to be not null and unique
 */

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
});

/**
 * Defines a SQLite table named 'posts' with the following columns:
 * - `id`: an integer primary key
 * - `title`: a text field that is required to be not null
 * - `content`: a text field that is required to be not null
 * - `authorId`: an integer field that references the `id` column of the `users` table
 */
export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").references(() => users.id),
});

/**
 * Defines the shape of a user record that can be selected from the `users` table.
 */
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type EditUser = Partial<NewUser>;
