import mysql, { Connection } from 'mysql2';
import { readFile } from 'fs/promises';
import { BookModel } from '../models/book-model.js';
import { con } from '../server.js';

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
/**
 * Creates new book in books table ----- NOT TESTED
 * @param book 
 */
export const createBook = async (book: BookModel) => {
    const sqlQuery = await readFile('src/db-controls/sql/create-authors-table.sql', 'utf-8');
    const name = mysql.escape(book.name);
    const description = mysql.escape(book.description);
    const year = mysql.escape(book.year);
    const language = mysql.escape(book.language);
    const art = mysql.escape(book.art);

    con.query(sqlQuery, [name, description, year, language, art]);
}