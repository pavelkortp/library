import {Request, Response} from 'express';
import {BookModel} from '../../models/book-model.js';
import {save, removeById} from '../../repositories/books-repository.js';
import {adminBooksData} from "../../dto/books-dto.js";


/**
 * Default page number.
 */
export const DEFAULT_PAGE: number = 1;


/**
 * Returns page with books.
 * @param req HTTP Request.
 * @param res HTML page.
 */
export const getBooksTable = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || DEFAULT_PAGE;
    const response = await adminBooksData(page);
    res.json(response);
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
        author1: string,
        author2: string,
        author3: string,
        description: string,
        pages: string,
        rating: string,
        isbn: string
    } = req.body;
    const image = req.file;

    let success = await save(
        new BookModel(
            book.title,
            parseInt(book.year),
            [book.author1, book.author2, book.author3],
            book.language,
            book.description,
            parseInt(book.pages),
            parseInt(book.rating),
            image!,
            book.isbn
        )
    );
    res.json({success});
}




