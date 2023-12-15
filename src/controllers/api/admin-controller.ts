import {Request, Response} from 'express';
import {save, removeById} from '../../repositories/books-repository.js';
import {adminBooksData} from '../../dto/books-dto.js';
import {getBookFromRequest} from './request-validator.js';

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
};

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
};

/**
 * Creates new book and saves it to db
 * @param req HTTP Request with book's data in body.
 * @param res HTML admin-page with books.
 */
export const createBook = async (req: Request, res: Response): Promise<void> => {
    const book = await getBookFromRequest(req.body, req.file!);
    let success = await save(book);
    res.json({success});
};


/**
 * NOT IMPLEMENTED YET
 * @param req
 * @param res
 */
export const searchImage = async (req: Request, res: Response): Promise<void> => {
    const search = '';
    const searchResponse = await (await fetch('')).json();
    const items:{link:string}[] = (await searchResponse).items;
};






