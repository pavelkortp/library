import {Connection, RowDataPacket} from 'mysql2/promise';
import {readFile, writeFile} from 'fs/promises';
import {BookModel} from '../models/book-model.js';
import {connection} from '../config/db-connection.js';



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

const toBookModel = (entry: RowDataPacket) => {
    return new BookModel(
        entry.title,
        entry.year,
        [entry.author],
        entry.language,
        entry.description,
        entry.pages,
        entry.rating,
        undefined,
        entry.isbn,
        entry.id,
        entry.views,
        entry.clicks
    );

}

// const savePic = async (name:string, picture:Buffer)=>{
//     await writeFile(`static/img/books/${name}.jpg`, picture);
// }

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
export const getAllBooks = async (filter: Filter, search?: string, year?: number): Promise<BookModel[]> => {
    let sql;
    let rows;
    if (search) {
        sql = await getSqlQuery(`search-book-${filter}`);
        [rows] = await connection.query<RowDataPacket[]>(sql, [`%${search}%`]);
    } else {
        sql = await getSqlQuery(`get-${filter}-books`);
        [rows] = await connection.execute<RowDataPacket[]>(sql);
    }

    return rows.map(toBookModel);
}

/**
 * Creates new entry in book's table.
 * @param book new book.
 */
export const createBook = async (book: BookModel): Promise<boolean> => {
    const sql = await getSqlQuery('create-book');
    const values = [
        book.title,
        book.authors[0],
        book.description,
        book.year,
        book.language,
        book.isbn,
        book.pages,
        book.rating,
        0, 0
    ];
    try {
        const [res] = await connection.execute(sql, values);
        if ('insertId' in res) {
            const id = res.insertId as number;
            await writeFile(`static/img/books/${id}.jpg`, book.image!.buffer);
            return true;
        }
    } catch (err) {
        return false;
    }
    return false;
}

/**
 * Searches and returns book from 'books' table or undefined.
 * @param id unique book id.
 * @returns found book.
 */
export const getBookById = async (id: number): Promise<BookModel | null> => {
    const sql = await getSqlQuery('get-book-by-id');
    const values = [id];
    const [row] = await connection.query<RowDataPacket[]>(sql, values);
    if (row[0]) {
        await updateBookData(id);
        return toBookModel(row[0]);
    }
    return null;
}

/**
 * Updates book's statistics values (clicks or views)
 * @param id unique book's id.
 * @param option which data need to update, default views.
 */
export const updateBookData = async (id: number, option: 'views' | 'clicks' = 'views'): Promise<boolean> => {
    const sql = await getSqlQuery(`update-book-${option}`);
    try {
        await connection.execute<RowDataPacket[]>(sql, [id]);
        return true;
    } catch (err) {
        return false;
    }

}

/**
 * Removes book entry in books.
 * @param id unique value.
 */
export const removeBookById = async (id: number): Promise<boolean> => {
    const sql: string = await getSqlQuery('mark-as-deleted');
    try {
        await connection.execute(sql, [id]);
        return true;
    } catch (err) {
        return false;
    }

}

/**
 * Returns all books id which marks as deleted.
 */
export const getDeletedId = async (): Promise<number[]> => {
    const getAllId: string = await getSqlQuery('get-deleted-id');
    const [rows] = await connection.query<RowDataPacket[]>(getAllId);
    return rows.map((e) => e.id);
}

///////////v2

/**
 * Returns all entries by params.
 * @param filter how to order entries.
 * @param search key word of books titles.
 * @param authorId books from a particular author.
 * @param year books of a certain year.
 */
export const getAllEntries = async (filter: Filter, search?: string, authorId?: number, year?: number): Promise<BookModel[]> => {
    let sql;
    let rows;
    if (search) {
        sql = await getSqlQuery(`search-${filter}-entries`, 'v2');
        [rows] = await connection.query<RowDataPacket[]>(sql, [`%${search}%`]);
    } else {
        sql = await getSqlQuery(`get-${filter}-entries`, 'v2');
        [rows] = await connection.query<RowDataPacket[]>(sql);
    }
    return rows.map(toBookModel);
}

/**
 * Searches book by id and return it or null if book not found.
 * @param id unique number.
 */
export const findEntry = async (id: number): Promise<BookModel | null> => {
    const sql = await getSqlQuery('find-entry', 'v2');
    const [row] = await connection.query<RowDataPacket[]>(sql, [id]);
    if (row[0]) {
        return toBookModel(row[0]);
    }
    return null;
}

/**
 * Creates new entry in books_authors table.
 * @param book new book.
 */
export const createEntry = async (book: BookModel): Promise<boolean> => {
    const bookId = await createBook2(book);
    if (!bookId) {
        return false;
    }
    const sql = await getSqlQuery('create-entry', 'v2');

    const id_1 = await createAuthor(book.authors[0]);
    const id_2 = await createAuthor(book.authors[1]);
    const id_3 = await createAuthor(book.authors[2]);
    const authors = [id_1, id_2, id_3];
    for (const id of authors) {
        if (id) await connection.execute(sql, [bookId, id]);
    }

    await writeFile(`static/img/books/${bookId}.jpg`, book.image!.buffer);

    return true;
}

/**
 * Creates new book in books table and return id. <br>
 * If books with current title already exists return 0 <br>
 * @param book new book.
 */
const createBook2 = async (book: BookModel): Promise<number> => {
    const sql = await getSqlQuery('create-book', 'v2');
    const values = [
        book.title,
        book.description,
        book.year,
        book.language,
        book.isbn,
        book.pages,
        book.rating,
        0, 0
    ];

    try {
        const [res] = await connection.execute(sql, values);
        if ('insertId' in res) {
            return res.insertId as number;
        }
    } catch (err) {
        return 0;
    }
    return 0;
}

/**
 * Creates new author in author's table. <br>
 * If authors with current name already exists <br>
 * return existing id.
 * @param name nea author name.
 */
const createAuthor = async (name: string): Promise<number> => {
    const sql = await getSqlQuery('create-author', 'v2');
    let id = 0;
    try {
        const [res] = await connection.execute(sql, [name]);
        if ('insertId' in res) {
            id = res.insertId as number;
        }
    } catch (err) {
        return await getAuthorByName(name);
    }
    return id;
}


/**
 * Searches and returns author id from 'authors' or 0.
 * @param name author's name.
 */
const getAuthorByName = async (name: string): Promise<number> => {
    const sql = await getSqlQuery('get-author-by-name', 'v2');
    const [res] = await connection.query<RowDataPacket[]>(sql, [`%${name}%`]);
    if (res[0]) {
        return res[0].id;
    }
    return 0;
}


