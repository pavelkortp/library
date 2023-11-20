import { Connection } from 'mysql2';
import { readFile } from 'fs/promises';

/**
 * Connects to db.
 */
export const connect = async (con: Connection) => {
    try {
        con.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

/**
 * Creates tables books, authors ... if not exists
 * @param con 
 */
export const createTables = async (con: Connection) => {
    await createTable(con, 'src/db-controls/sql/create-books-table.sql');
    await createTable(con, 'src/db-controls/sql/create-authors-table.sql');
}

/**
 * 
 * @param con 
 * @param scryptPath 
 */
const createTable = async (con: Connection, scryptPath: string) => {
    const q = await readFile(scryptPath, 'utf-8');
    con.query(q);
}