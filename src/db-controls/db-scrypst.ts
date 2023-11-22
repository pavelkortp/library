import { Connection, RowDataPacket } from 'mysql2/promise';
import { readFile } from 'fs/promises';
import { BookModel } from '../models/book-model.js';
import { con } from '../server.js';

/**
 * Connects to db.
 */
export const connect = async (db: Connection) => {
    try {
        await db.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

/**
 * Creates tables books, authors ... if not exists
 * @param db database.
 */
export const createTables = async (db: Connection) => {
    await createTable(db, 'src/db-controls/sql/create-books-table.sql');
    await createTable(db, 'src/db-controls/sql/create-authors-table.sql');
}

/**
 * Creates tables if not exist.
 * @param db database.
 * @param scryptPath path to scrypt which creates table.
 */
const createTable = async (db: Connection, scryptPath: string) => {
    const q = await readFile(scryptPath, 'utf-8');
    db.query(q);
}

/**
 * Returns all book's table entries.
 * @returns book array.
 */
export const getAllBooks = async (): Promise<BookModel[]> => {
    const q = await readFile('src/db-controls/sql/get-all-books.sql', 'utf-8');
    const [rows] = await con.execute<RowDataPacket[]>(q);

    return rows.map((e: any) => new BookModel(
        e.name,
        e.year,
        'without author', //
        e.language,
        e.description,
        e.art,
        e.id,
        e.pages,
        e.views,
        e.clicks
    ));
}

/**
 * Creates new entry in books's table.
 * @param book new book.
 */
export const createBook = async (book: BookModel) => {
    const sqlQuery = await readFile('src/db-controls/sql/create-book.sql', 'utf-8');
    const values = [
        book.name,
        book.description,
        book.year,
        book.language,
        book.art,
        book.rating,
        book.views,
        book.clicks,
    ];

    con.execute(sqlQuery, values);
}