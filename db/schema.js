import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const items = pgTable('items', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const dynamicItem = (table, options = null) => {
    options = options || {
        id: serial('id').primaryKey(),
        name: varchar('name', { length: 255 }).notNull(),
        createdAt: timestamp('created_at').defaultNow(),
    };

    return pgTable(table, options);
};
