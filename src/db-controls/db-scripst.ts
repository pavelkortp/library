import { Connection, RowDataPacket } from 'mysql2/promise';
import { readFile, writeFile, unlink } from 'fs/promises';
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
    await createTable(db, 'src/db-controls/sql/v1/create-books-table.sql');
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
 * @returns books array.
 */
export const getAllBooks = async (filter: Filter = 'all', search?: string): Promise<BookModel[]> => {
    let q;
    let rows;
    if (search) {
        q = await readFile(`src/db-controls/sql/v1/search-book.sql`, 'utf-8');
        let f = 'id ASC';
        if (filter == 'new') f = 'creation_date DESC';
        else if (filter == 'popular') f = 'views DESC';

        q += ` ORDER BY ${f}`;
        [rows] = await con.execute<RowDataPacket[]>(q, [`%${search}%`]);
    } else {
        q = await readFile(`src/db-controls/sql/v1/get-${filter}-books.sql`, 'utf-8');
        [rows] = await con.execute<RowDataPacket[]>(q);
    }


    return rows.map((e: any) => new BookModel(
        e.title,
        e.year,
        e.author,
        e.language,
        e.description,
        e.pages,
        undefined,
        e.id,
        e.views,
        e.clicks
    ));
}

/**
 * Creates new entry in books's table.
 * @param book new book.
 */
export const createBook = async (book: BookModel) => {
    const sqlQuery = await readFile('src/db-controls/sql/v1/create-book.sql', 'utf-8');
    const values = [
        book.title,
        book.author,
        book.description,
        book.year,
        book.language,
        book.pages,
        0, 0, 0
    ];

    const [res] = await con.query(sqlQuery, values);
    
    if('insertId' in res){
        const id = res.insertId as number;
        await writeFile(`static/img/books/${id}.jpg`, book.image!.buffer);
    }else{
        throw new Error("Saving book error");
    }
}

/**
 * Searches and returns book from 'books' table or endefined.
 * @param id unique book id.
 * @returns found book.
 */
export const getBookById = async (id: number): Promise<BookModel | undefined> => {
    const sqlQuery = await readFile('src/db-controls/sql/v1/get-book-by-id.sql', 'utf-8');
    const values = [id];
    const [row] = await con.execute<RowDataPacket[]>(sqlQuery, values);
    if (row[0]) {
        await updateBookData(id);
        return new BookModel(
            row[0].title,
            row[0].year,
            row[0].author,
            row[0].language,
            row[0].description,
            row[0].pages,
            undefined,
            row[0].id,
            ++row[0].views,
            row[0].clicks
        );
    }
}

export const updateBookData = async (id: number, option: 'views' | 'clicks' = 'views'): Promise<void> => {
    const sqlQuery = await readFile(`src/db-controls/sql/v1/update-book-${option}.sql`, 'utf-8');
    await con.execute<RowDataPacket[]>(sqlQuery, [id]);
}

/**
 * Removes book entry in books.
 * @param id unique value.
 */
export const removeBookById = async (id: number) => {
    const q: string = await readFile('src/db-controls/sql/v1/remove-book-by-id.sql', 'utf-8');
    await con.execute(q, [id]);
    await unlink(`static/img/books/${id}.jpg`);
}