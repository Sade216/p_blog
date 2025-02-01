import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  desc: varchar().notNull()
});