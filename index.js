import 'dotenv/config';

import { sql } from 'drizzle-orm';
import http from 'http';
import { URL } from 'url';

import { db } from './db/index.js';
import { dynamicItem } from './db/schema.js';

const PORT = process.env.PORT || 3000;

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

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/count' && (req.method === 'GET' || req.method === 'POST')) {
        try {
            let table = 'users';

            if (req.method === 'GET') {
                table = url.searchParams.get('table') || table;
            } else if (req.method === 'POST') {
                const body = await parseRequestBody(req);
                table = body.table || table;
            }

            const tableSchema = dynamicItem(table);

            const result = await db.select({ count: sql`count(*)` }).from(tableSchema);
            const count = Number(result[0].count);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ count, table }));
        } catch (error) {
            console.error('Database error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error', message: error.message }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found', url: req.url }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
