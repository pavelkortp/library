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
 * Default offset.
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
        res.status(400).json({success: false, msg: 'Введені некоректні дані'});
    } else {
        await next();
    }
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
 * Checks if current sting is Filter.
 * @param s any string.
 */
export const isFilter = (s: string): s is Filter => {
    return ['all', 'new', 'popular'].includes(s);
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
    return new BookModel(
        book.title,
        parseInt(book.year),
        migrator.version == 'v2' ? [book.author1.trim(), book.author2.trim(), book.author3.trim()] : [book.author1.trim()],
        book.language,
        book.description,
        parseInt(book.pages),
        parseInt(book.rating),
        image,
        book.isbn
    );
};


