/**
 * Configures the Drizzle database connection and schema for the application.
 *
 * This configuration object specifies the location of the database schema file,
 * the output directory for the generated Drizzle files, the database dialect
 * (SQLite in this case), and the URL for the SQLite database file.
 */
import type { Config } from "drizzle-kit";

export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./sqlite.db",
  },
} satisfies Config;
