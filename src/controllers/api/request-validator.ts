import {Request, Response} from 'express';

const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_COLUMN_LENGTH = 100;

/**
 * Protection from injections
 */
const FORBIDDEN_SYMBOLS = /[;<>/^*&()$=]/;

/**
 *
 * @param req
 * @param res
 * @param next
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
 * @param req
 * @param res
 * @param next
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
 *
 * @param req
 * @param res
 * @param next
 */
export const validate_request_data = async (req: Request, res: Response, next: Function) => {
    if (!(req.query.filter == 'new' || req.query.filter == 'popular' || req.query.filter == 'all' || !req.query.filter)) {
        res.status(404).json({success: false});
    } else if (typeof req.query.search == 'string' && req.query.search.includes(';')) {
        res.status(404).json({success: false});
    } else if (parseInt(req.query.year as string) <= 0) {
        res.status(404).json({success: false});
    } else if (parseInt(req.query.author as string) <= 0) {
        res.status(404).json({success: false});
    } else if (parseInt(req.query.offset as string) <= 0) {
        res.status(404).json({success: false});
    } else if (parseInt(req.query.limit as string) <= 0) {
        res.status(404).json({success: false});
    } else {
        await next();
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
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