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
export const getAll = async (filter: Filter = 'all', search?:string): Promise<BookModel[]> => {
    return await getAllBooks(filter, search);
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
 * Increases clicks number on current book.
 * @param id unique number.
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