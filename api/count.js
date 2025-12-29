import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const items = pgTable('items', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

let client;
let db;

function getDb() {
    if (!db) {
        const connectionString =
            process.env.DATABASE_URL || 'postgresql://postgres:postgres@172.17.0.1:1010/postgres?sslmode=disable';
        client = postgres(connectionString);
        db = drizzle(client, { schema: { items } });
    }
    return db;
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    if (req.method === 'GET') {
        try {
            const database = getDb();
            const result = await database.select({ count: sql`count(*)` }).from(items);
            const count = Number(result[0].count);

            res.status(200).json({ count });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
