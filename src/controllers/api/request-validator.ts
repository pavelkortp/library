import {Request, Response} from 'express';
import {BookModel} from '../../models/book-model.js';
import {migrator} from '../../migrator/migrator.js';

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
 * Default filter value for main page.
 */
const DEFAULT_FILTER: Filter = 'new';

/**
 * Default page offset.
 */
const DEFAULT_OFFSET = 0;

/**
 * Starts books limit on main page.
 */
const DEFAULT_LIMIT = 20;

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
};

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
};

/**
 * validates requests to admin/api
 * @param req HTTP request with body-params
 * @param res HTTP response
 * @param next callback
 */
export const validate_creation_data = async (req: Request, res: Response, next: Function) => {
    const newBook: BookCreationData = req.body;
    newBook.image = req.file;
    if (!newBook.image) {
        res.status(404).json({success: false, msg: 'Помилка при обробленні картинки'});
    } else if (
        isNotValidString(newBook.title) ||
        isNotValidString(newBook.language) ||
        isNotValidString(newBook.isbn) ||
        isNotValidString(newBook.author1) ||
        isNotValidString(newBook.author2) ||
        isNotValidString(newBook.author3) ||
        isNotValidString(newBook.description, MAX_DESCRIPTION_LENGTH) ||
        isNotValidNumber(newBook.year) ||
        isNotValidNumber(newBook.pages) ||
        isNotValidNumber(newBook.rating)
    ) {
        res.status(400).json({success: false, msg: 'Введені некоректні дані'});
    } else {
        await next();
    }
};

/**
 * Checks if string param is not valid
 * @param input string param from request
 * @param length max length of string param.
 */
const isNotValidString = (input: string, length: number = MAX_COLUMN_LENGTH): boolean => {
    return !input?.trim() || input.length >= length || !!input.match(FORBIDDEN_SYMBOLS);
};

/**
 * Checks if string param is not valid number
 * @param input string param which must be number from request
 */
const isNotValidNumber = (input: string): boolean => {
    return !parseInt(input) || parseInt(input) <= 0;
};

/**
 * Checks if current sting is Filter.
 * @param input any string.
 */
export const isFilter = (input: string): input is Filter => {
    return ['all', 'new', 'popular'].includes(input);
};


/**
 * Replaces html characters with their safe counterparts.
 * @param input string with html.
 * @return safe line.
 */
export const escapeHtml = (input: string): string => {
    return input.replace(/[&<>"']/g, (match: string): string => {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match] || '';
    });
};

/**
 * Converts an invalid request to a valid one and returns it.
 * @param data any data which can be sent by users on api/v1/books
 */
export const getRequestData = async (data: NotValidRequestData): Promise<RequestData> => {
    return {
        filter: data.filter && isFilter(data.filter) ? data.filter : DEFAULT_FILTER,
        search: data.search,
        year: data.year ? parseInt(data.year) : undefined,
        author: data.author ? parseInt(data.author) : undefined,
        offset: data.offset && parseInt(data.offset) ? parseInt(data.offset) : DEFAULT_OFFSET,
        limit: data.limit && parseInt(data.limit) ? parseInt(data.limit) : DEFAULT_LIMIT,
    }
};

/**
 * Creates a BookModel from a request and returns it.
 * @param book unprocessed version of the book sent by the user.
 * @param image book image.
 */
export const getBookFromRequest = async (book: BookCreationData, image: Express.Multer.File) => {
    const authors = [book.author1.trim(), book.author2.trim(), book.author3.trim()]
    return new BookModel(
        book.title,
        parseInt(book.year),
        migrator.version == 'v2' ? authors : [authors.join()],
        book.language,
        book.description,
        parseInt(book.pages),
        parseInt(book.rating),
        image,
        book.isbn
    );
};


