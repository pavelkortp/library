import {BookModel} from '../models/book-model.js';
import {
    createBook,
    createEntry,
    getAllBooks,
    getAllEntries,
    getBookById,
    findEntry,
    removeBookById,
    updateBookData
} from '../db/scripts.js';
import {migrator} from "../db/migrator.js";


/**
 * Satored book in db.
 * @param book new book.
 */
export const save = async (book: BookModel): Promise<boolean> => {
    if (migrator.version == 'v1') {
        return await createBook(book);
    }
    return await createEntry(book);
}

/**
 * Returns all books from store.
 * @returns array of books.
 */
export const getAll = async (filter: Filter = 'all', search?: string, authorId?: number, year?: number): Promise<BookModel[]> => {
    if (migrator.version == 'v1') {
        return await getAllBooks(filter, search, year);
    }
    return await getAllEntries(filter, search, authorId, year);

}

/**
 * Searches book by id in storage.
 * @param id unique number.
 * @returns found book.
 */
export const findById = async (id: number): Promise<BookModel | null> => {
    if (migrator.version == 'v1') {
        return await getBookById(id);
    }
    return await findEntry(id);

}

/**
 * Increases clicks number on current book.
 * @param id unique number.
 */
export const increaseBookClicks = async (id: number): Promise<boolean> => {
    return await updateBookData(id, 'clicks');
}

/**
 * Removes book from storage.
 * @param id unique number.
 */
export const removeById = async (id: number):Promise<boolean> => {
    return await removeBookById(id);
}