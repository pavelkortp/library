import { BookModel } from '../models/book-model.js';
import { readFile } from 'fs/promises';
import { con } from '../server.js';
import { createBook, getAllBooks, getBookById } from '../db-controls/db-scrypst.js';


/**
 * Searches in db books with year and return it.
 * @param year book's realese year
 * @returns found books.
 */
export const findByYear = async (year: number): Promise<BookModel[]> => {
    const q: string = await readFile('src/db-controls/sql/get-books-by-year.sql', 'utf-8');
    const [rows] = await con.execute(q, [year]);

    return [];

}

/**
 * Searches in db book with title and return it.
 * @param title book's title.
 * @returns found book.
 */
export const findByTitle = async (title: string) => {
    const q: string = await readFile('src/db-controls/sql/get-book-by-title.sql', 'utf-8');
    const r = await con.execute(q, [title]);
    // return new BookModel();
}

/**
 * Satored book in db.
 * @param book new book.
 */
export const save = async (book: BookModel): Promise<void> => {
    await createBook(book);
}

/**
 * Returns all books from store.
 * @returns array of books.
 */
export const getAll = async (): Promise<BookModel[]> => {
    return await getAllBooks();
}

/**
 * 
 * @param id 
 * @returns 
 */
export const findById = async (id: number): Promise<BookModel> => {
    return await getBookById(id);
}