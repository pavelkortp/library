import { BookModel } from '../models/book-model.js';
import {
    createBook,
    getAllBooks,
    getBookById,
    // getBookByTitle,
    // getBookByYear,
    removeBookById,
    updateBookData
} from '../db-controls/db-scripst.js';
import { writeFile } from 'fs/promises';

// /**
//  * Searches in db books with year and return it.
//  * @param year book's realese year
//  * @returns found books.
//  */
// export const findByYear = async (year: number) => {
//     return await getBookByYear(year);
// }

// /**
//  * Searches in db book with title and return it.
//  * @param title book's title.
//  * @returns found book.
//  */
// export const findByTitle = async (title: string) => {
//     return await getBookByTitle(title);
// }

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
export const getAll = async (filter: Filter = 'all'): Promise<BookModel[]> => {
    return await getAllBooks(filter);
}

/**
 * Searches book by id in storage.
 * @param id unique number.
 * @returns found book.
 */
export const findById = async (id: number): Promise<BookModel | undefined> => {
    return await getBookById(id);
}

/**
 * 
 * @param id 
 */
export const increaseBookClicks = async (id: number): Promise<void> => {
    await updateBookData(id, 'clicks');
}

/**
 * Removes book from storage.
 * @param id unique number.
 */
export const removeById = async (id: number) => {
    await removeBookById(id);
}