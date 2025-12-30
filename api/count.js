import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const dynamicTable = (tableName) => {
    return pgTable(tableName, {
        id: serial('id').primaryKey(),
        name: varchar('name', { length: 255 }),
        createdAt: timestamp('created_at').defaultNow(),
    });
};

let client;
let db;

function getDb() {
    if (!db) {
        const connectionString =
            process.env.DATABASE_URL ||
            'postgresql://postgres:postgres@172.17.0.1:1010/postgres?sslmode=disable';
        client = postgres(connectionString);
        db = drizzle(client);
    }
    return db;
}

function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', reject);
    });
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    if (req.method === 'GET' || req.method === 'POST') {
        try {
            let table = 'migrations';

            if (req.method === 'GET') {
                const url = new URL(req.url, `https://${req.headers.host}`);
                table = url.searchParams.get('table') || table;
            } else if (req.method === 'POST') {
                const body = await parseRequestBody(req);
                table = body.table || table;
            }

            const database = getDb();
            const tableSchema = dynamicTable(table);
            const result = await database.select({ count: sql`count(*)` }).from(tableSchema);
            const count = Number(result[0].count);

            res.status(200).json({ count, table });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Internal server error', message: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
