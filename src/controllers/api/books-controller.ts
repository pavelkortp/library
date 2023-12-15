import {Request, Response} from 'express';
import {increaseBookClicks} from '../../repositories/books-repository.js';
import {shortBooksData, fullBookData} from '../../dto/books-dto.js';
import {getRequestData} from './request-validator.js';

/**
 * Renders book-page
 * @param req HTTP Request.
 * @param res html page.
 */
export const getBook = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.book_id);
    const result = await fullBookData(id);
    res.json(result);
}

/**
 * Increase clicks count on book.
 * @param req HTTP Request
 * @param res JSON
 */
export const increaseClicks = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.book_id);
    if (req.query.increase_clicks) {
        await increaseBookClicks(id);
        res.json({success: true});
    } else {
        res.status(400).json({success: false});
    }
}


/**
 * Renders home books-page with books.
 * @param req HTTP Request
 * @param res HTML page which contains all books.
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const request: RequestData = await getRequestData(req.query);
    const response = await shortBooksData(request);
    res.json(response);
}

