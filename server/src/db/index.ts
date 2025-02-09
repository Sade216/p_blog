import { commentsRelations, commentsTable, postsRelations, postsTable } from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DATABASE_URL!, {
    schema: { post: postsTable, comment: commentsTable, postsRelations, commentsRelations } //вот она проблема всех проблем добавить relations 
});