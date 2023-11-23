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
        e.title,
        e.year,
        'without author', //
        e.language,
        e.description,
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
        book.title,
        book.description,
        book.year,
        book.language,
        book.pages,
        book.rating,
        book.views,
        book.clicks,
    ];

    con.execute(sqlQuery, values);
}

export const getBookById = async (id: number): Promise<BookModel> => {
    const sqlQuery = await readFile('src/db-controls/sql/get-book-by-id.sql', 'utf-8');
    const values = [id];
    const [row] = await con.execute<RowDataPacket[]>(sqlQuery, values);
    console.log(row[0]);
    return new BookModel(
        row[0].title,
        row[0].year,
        "row[0].author",
        row[0].language,
        row[0].description,
        row[0].id,
        row[0].pages,
        row[0].views,
        row[0].clicks
    );
}

export const getBookByTitle = async (title: string) => {
    const q: string = await readFile('src/db-controls/sql/get-book-by-title.sql', 'utf-8');
    const r = await con.execute(q, [title]);
    // return new BookModel();
}

export const getBookByYear = async (year: number) => {
    const q: string = await readFile('src/db-controls/sql/get-books-by-year.sql', 'utf-8');
    const [rows] = await con.execute(q, [year]);

    return [];
}

export const removeBookById = async (id: number)=> {
    
}