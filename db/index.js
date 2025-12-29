import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const connectionString =
    process.env.DATABASE_URL || 'postgresql://postgres:postgres@172.17.0.1:1010/postgres?sslmode=false';

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
