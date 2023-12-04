import { readFile } from 'fs/promises';
import { con } from '../server.js';

export const version: string = 'v1';

/**
 * Update db structure.
 */
export const migrateUp = async () => {
    const sql: string = await readFile(`src/db-controls/sql/migrations/migrate-up.sql`, 'utf-8');
    await con.query(sql);
}

/**
 * Downgrade db structure.
 */
export const migrateDown = async () => {
    const sql: string = await readFile(`src/db-controls/sql/migrations/migrate-down.sql`, 'utf-8');
    await con.query(sql);
}