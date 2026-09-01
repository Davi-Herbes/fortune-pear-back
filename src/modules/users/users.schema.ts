import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import { int, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  name: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  credit: real().default(20).notNull(),

  createdAt: int("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
