import {Connection, RowDataPacket} from 'mysql2/promise';
import {readFile, writeFile} from 'fs/promises';
import {BookModel} from '../models/book-model.js';
import {connection} from '../config/db-connection.js';
import {migrator} from './migrator.js';

/**
 * Establishes connection with the database.
 */
export const connect = async () => {
    try {
        await connection.connect();
    } catch (err) {
        console.log(err);
    }
}

/**
 * Returns sql query from .sql
 * @param version db version.
 * @param name name of query.
 */
export const getSqlQuery = async (name: string, version: 'v1' | 'v2' = 'v1'): Promise<string> => {
    return await readFile(`src/sql/${version}/${name}.sql`, 'utf-8');
}


/**
 * Creates tables books, authors ... if not exists
 */
export const createTables = async (): Promise<void> => {
    await createTable(connection, 'src/sql/v1/create-books-table.sql');
}

/**
 * Creates tables if not exist.
 * @param db database.
 * @param scryptPath path to scrypt which creates table.
 */
const createTable = async (db: Connection, scryptPath: string): Promise<void> => {
    const q = await readFile(scryptPath, 'utf-8');
    await db.execute(q);
}

/**
 * Returns all book's table entries.
 * @returns books array.
 */
export const getAllBooks = async (filter: Filter = 'all', search?: string): Promise<BookModel[]> => {
    let sql;
    let rows;
    if (search) {
        sql = await getSqlQuery(`search-book-${filter}`);
        [rows] = await connection.query<RowDataPacket[]>(sql, [`%${search}%`]);
    } else {
        sql = await getSqlQuery(`get-${filter}-books`);
        [rows] = await connection.execute<RowDataPacket[]>(sql);
    }

    return rows.map((e: any) => e as BookModel);
}

/**
 * Creates new entry in book's table.
 * @param book new book.
 */
export const createBook = async (book: BookModel): Promise<void> => {
    const sql = await getSqlQuery('create-book');
    const values = [
        book.title,
        book.author,
        book.description,
        book.year,
        book.language,
        book.pages,
        book.rating,
        0, 0
    ];

    const [res] = await connection.execute(sql, values);

    if ('insertId' in res) {
        const id = res.insertId as number;
        await writeFile(`static/img/books/${id}.jpg`, book.image!.buffer);
    } else {
        throw new Error("Saving book error");
    }
}

/**
 * Creates new author in author's table.
 * @param name nea author name.
 */
const createAuthor = async (name: string): Promise<number> => {
    const sql = await getSqlQuery('create-author', 'v2');
    let id = -1;
    const res = await connection.query(sql, [name]);
    if ('insertId' in res) {
        id = res.insertId as number;
    }
    return id;
}


/**
 * Searches and returns author id from 'authors' or -1.
 * @param name author's name
 */
const getAuthorByName = async (name: string): Promise<number> => {
    const sql = await getSqlQuery('get-author-by-name', 'v2');
    const [res] = await connection.query<RowDataPacket[]>(sql, [`%${name}%`]);
    if (res) {
        return res[0].id;
    }
    return -1;
}

/**
 * Searches and returns book from 'books' table or undefined.
 * @param id unique book id.
 * @returns found book.
 */
export const getBookById = async (id: number): Promise<BookModel | undefined> => {
    const sql = await getSqlQuery('get-book-by-id');
    const values = [id];
    const [row] = await connection.query<RowDataPacket[]>(sql, values);
    if (row[0]) {
        await updateBookData(id);
        return new BookModel(
            row[0].title,
            row[0].year,
            row[0].author,
            row[0].language,
            row[0].description,
            row[0].pages,
            row[0].rating,
            undefined,
            row[0].id,
            row[0].views + 1,
            row[0].clicks
        );
    }
}

/**
 * Updates book's statistics values (clicks or views)
 * @param id unique book's id.
 * @param option which data need to update, default views.
 */
export const updateBookData = async (id: number, option: 'views' | 'clicks' = 'views'): Promise<void> => {
    const sql = await getSqlQuery(`update-book-${option}`);
    await connection.execute<RowDataPacket[]>(sql, [id]);
}

/**
 * Removes book entry in books.
 * @param id unique value.
 */
export const removeBookById = async (id: number): Promise<void> => {
    const sql: string = await getSqlQuery('mark-as-deleted');
    await connection.execute(sql, [id]);
}

/**
 * Returns all books id
 */
export const getDeletedId = async (): Promise<number[]> => {
    const getAllId: string = await getSqlQuery('get-deleted-id');
    const [rows] = await connection.query<RowDataPacket[]>(getAllId);
    return rows.map((e) => e.id);
}


