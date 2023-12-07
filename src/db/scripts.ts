import {Connection, RowDataPacket} from 'mysql2/promise';
import {readFile, writeFile, unlink} from 'fs/promises';
import {BookModel} from '../models/book-model.js';
import {connection} from '../config/db-connection.js';
import {Filter} from "../declarations.js";
import {version} from './migrator.js';
import {addJob} from '../cron.js';

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
 * Creates tables books, authors ... if not exists
 * @param db database.
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
    let q;
    let rows;
    if (search) {
        q = await readFile(`src/sql/v1/search-book.sql`, 'utf-8');
        let f = 'id ASC';
        if (filter == 'new') f = 'creation_date DESC';
        else if (filter == 'popular') f = 'views DESC';

        q += ` ORDER BY ${f}`;
        [rows] = await connection.query<RowDataPacket[]>(q, [`%${search}%`]);
    } else {
        q = await readFile(`src/sql/v1/get-${filter}-books.sql`, 'utf-8');
        [rows] = await connection.query<RowDataPacket[]>(q);
    }

    return rows.map((e: any) => e as BookModel);

}

/**
 * Creates new entry in books's table.
 * @param book new book.
 */
export const createBook = async (book: BookModel): Promise<void> => {
    const sqlQuery = await readFile('src/sql/v1/create-book.sql', 'utf-8');
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

    const [res] = await connection.execute(sqlQuery, values);

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
    const createAuthor = await readFile('src/sql/v2/create-author.sql', 'utf-8');
    let id = -1;
    const res = await connection.query(createAuthor, [name]);
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
    const searchAuthor = await readFile('src/sql/v2/get-author-by-name.sql', 'utf-8');
    const [res] = await connection.query<RowDataPacket[]>(searchAuthor, [`%${name}%`]);
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
    const sqlQuery = await readFile('src/sql/v1/get-book-by-id.sql', 'utf-8');
    const values = [id];
    const [row] = await connection.query<RowDataPacket[]>(sqlQuery, values);
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
            ++row[0].views,
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
    const sqlQuery = await readFile(`src/sql/v1/update-book-${option}.sql`, 'utf-8');
    await connection.execute<RowDataPacket[]>(sqlQuery, [id]);
}

/**
 * Removes book entry in books.
 * @param id unique value.
 */
export const removeBookById = async (id: number): Promise<void> => {
    const markToDelete: string = await readFile('src/sql/v1/mark-as-deleted.sql', 'utf-8');
    await connection.execute(markToDelete, [id]);
    await addJob(1, false, async () => {
        console.log('HEREEEEEEE')
        const deleteBook = await readFile('src/sql/v1/remove-book.sql', 'utf-8');
        console.log(await connection.execute(deleteBook, [id]));
        await unlink(`static/img/books/${id}.jpg`);
    });
}