import { randomUUID } from "crypto";
import { uuid } from "drizzle-orm/cockroach-core/columns/uuid";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  name: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  createdAt: int("created_at", { mode: "timestamp" }),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
