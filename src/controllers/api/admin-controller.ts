import {Request, Response} from 'express';
import {BookModel} from '../../models/book-model.js';
import {save, getAll, removeById} from '../../repositories/books-repository.js';

/**
 * Count of books per one page on admin pannel.
 */
const BOOKS_PER_PAGE: number = 5;

/**
 * Default page number.
 */
const DEFAULT_PAGE: number = 1;


/**
 * Returns page with books.
 * @param req HTTP Request.
 * @param res HTML page.
 */
export const getBooksTable = async (req: Request, res: Response): Promise<void> => {
    const books = await getAll();

    const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
    const page = parseInt(req.query.page as string) || DEFAULT_PAGE;
    const offset = (page - 1) * BOOKS_PER_PAGE;

    res.json({
        data: {
            books: books
                .slice(offset, offset + BOOKS_PER_PAGE)
                .map((e) => {
                    return {id: e.id, author: e.author, clicks: e.clicks, year: e.year, title: e.title};
                }),
            totalPages: totalPages,
            page: page
        },
        success: true
    });
}

/**
 * Removes book from storage by id.
 * @param req HTTP Request which contains book_id in params.
 * @param res
 */
export const removeBook = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.book_id);
    let success = true;
    try {
        await removeById(id);
    } catch (err) {
        console.log(err);
        success = false
    } finally {
        res.json({success});
    }
}

/**
 * Creates new book and saves it to db
 * @param req HTTP Request with book's data in body.
 * @param res HTML admin-page with books.
 */
export const createBook = async (req: Request, res: Response): Promise<void> => {
    const book: {
        title: string,
        year: string,
        language: string,
        author1: string[],
        author2: string[],
        author3: string[],
        description: string,
        pages: string,
        rating: string
    } = req.body;
    const image = req.file;

    let success = true;
    try {
        await save(new BookModel(
            book.title,
            parseInt(book.year),
            book.author1.join(' '),
            book.language,
            book.description,
            parseInt(book.pages),
            parseInt(book.rating),
            image!
        ));
    } catch (err) {
        console.log(err);
        success = false;
    } finally {
        res.json({success});
    }
}




