import {Request, Response} from 'express';

/**
 * Max length for description column in db.
 */
const MAX_DESCRIPTION_LENGTH = 1000;

/**
 * Max length for other varchar columns in db.
 */
const MAX_COLUMN_LENGTH = 100;

/**
 * Protection from injections
 */
const FORBIDDEN_SYMBOLS = /[;<>/^*&()$=]/;

/**
 * Validates book_id param
 * @param req HTTP request with query-params
 * @param res HTTP response
 * @param next callback
 */
export const validate_book_id = async (req: Request, res: Response, next: Function) => {
    const id = parseInt(req.params.book_id);
    if (!id || id <= 0) {
        res.status(404).json({success: false, msg: `Book with id ${id} not available`});
    } else {
        await next();
    }
}

/**
 *
 * @param req HTTP request with query-params
 * @param res HTTP response
 * @param next callback
 */
export const validate_page = async (req: Request, res: Response, next: Function) => {
    const page = parseInt(req.query.page as string);
    if (page <= 0) {
        res.status(404).json({success: false, msg: `Page not available`});
    } else {
        await next();
    }
}

/**
 * Validates request to api
 * @param req HTTP request with query-params
 * @param res HTTP response
 * @param next callback
 */
export const validate_request_data = async (req: Request, res: Response, next: Function) => {
    const filter = req.query.filter as string;
    const search = req.query.search as string;
    const year = req.query.year as string;
    const author = req.query.author as string;
    const offset = req.query.offset as string;
    const limit = req.query.limit as string;
    console.log(year)
    if (
        filter && filter != 'new' && filter != 'all' && filter != 'popular' ||
        search && search.match(FORBIDDEN_SYMBOLS) ||
        year && parseInt(year) <= 0 ||
        author && parseInt(author) <= 0 ||
        offset && parseInt(offset) < 0 ||
        limit && parseInt(limit) < 0
    ) {
        res.status(400).json({success: false, msg: 'Запит містить некоректні дані'})
    } else {
        await next();
    }
}

/**
 * validates requests to admin/api
 * @param req HTTP request with body-params
 * @param res HTTP response
 * @param next callback
 */
export const validate_creation_data = async (req: Request, res: Response, next: Function) => {
    const newBook: CreationData = req.body;
    newBook.image = req.file;
    if (!newBook.image) {
        res.status(404).json({success: false, msg: 'Помилка при обробленні картинки'});
    } else if (
        !newBook.title || newBook.title.length >= MAX_COLUMN_LENGTH || newBook.title.match(FORBIDDEN_SYMBOLS) ||
        !parseInt(newBook.year) || parseInt(newBook.year) <= 0 ||
        !newBook.isbn || newBook.isbn.length >= MAX_COLUMN_LENGTH || newBook.isbn.match(FORBIDDEN_SYMBOLS) ||
        !newBook.language || newBook.language.length >= MAX_COLUMN_LENGTH || newBook.language.match(FORBIDDEN_SYMBOLS) ||
        !parseInt(newBook.pages) || parseInt(newBook.pages) <= 0 ||
        !newBook.author1 || newBook.author1.length >= MAX_COLUMN_LENGTH || newBook.author1.match(FORBIDDEN_SYMBOLS) ||
        !newBook.author2 || newBook.author2.length >= MAX_COLUMN_LENGTH || newBook.author2.match(FORBIDDEN_SYMBOLS) ||
        !newBook.author3 || newBook.author3.length >= MAX_COLUMN_LENGTH || newBook.author3.match(FORBIDDEN_SYMBOLS) ||
        !newBook.description || newBook.description.length >= MAX_DESCRIPTION_LENGTH || newBook.description.match(FORBIDDEN_SYMBOLS) ||
        !newBook.rating || parseInt(newBook.rating) <= 0
    ) {
        res.status(404).json({success: false, msg: 'Введені некоректні дані'});
    } else {
        await next();
    }

}