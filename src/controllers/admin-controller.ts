import { Request, Response } from 'express';
import { BookModel } from '../models/book-model.js';
import { save, getAll, removeById } from '../repositories/books-repository.js';
/**
 * Count of books per one page on admin pannel.
 */
const BOOKS_PER_PAGE: number = 5;

/**
 * NOT WORK
 * @param req 
 * @param res 
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
    res.set('Authorization', 'Basic required')
    res.status(401).redirect('http://localhost:3000/');
}

/**
 * Returns page with books.
 * @param req HTTP Request.
 * @param res HTML page.
 */
export const getBooksTable = async (req: Request, res: Response): Promise<void> => {
    const books = await getAll();
    const page = parseInt(req.query.page as string || '1');


    const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);

    const offset = (page - 1) * BOOKS_PER_PAGE;
    const o = {
        data: {
            books: books
                .slice(offset, offset + BOOKS_PER_PAGE)
                .map((e) => {
                    return { id: e.id, author: e.author, clicks: e.clicks, year: e.year, title: e.title };
                }),
            totalPages: totalPages,
            page: page
        },

        success: true
    }

    res.json(o);
}

/**
 * 
 * @param req 
 * @param res 
 */
export const removeBook = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.book_id);
    await removeById(id);
    res.json({
        data: {

        },
        success: true
    });
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
        description: string,
        pages: string
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
            image!
        ));
    } catch (err) {
        console.log(err);
        success = false;
    } finally {
        res.json({
            success: success
        });
    }

}




