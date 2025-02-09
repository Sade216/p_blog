import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description").notNull(),
});

export const commentsTable = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    text: varchar("text").notNull(),
    post_id: uuid("post_id")
        .notNull()
        .references(() => postsTable.id, { onDelete: "cascade" }),
})
export const postsRelations = relations(postsTable, ({ many }) => ({
    comments: many(commentsTable),
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
    post: one(postsTable, {
        fields: [commentsTable.post_id],
        references: [postsTable.id],
    }),
}));
