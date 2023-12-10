import {Request, Response} from 'express';
import {increaseBookClicks} from '../../repositories/books-repository.js';
import {shortBooksData, fullBookData} from "../../dto/books-dto.js";

const DEFAULT_FILTER: Filter = 'new';

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
 * @param res HTML page wich contains all books.
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const request: RequestData = {
        filter: req.query.filter as Filter || DEFAULT_FILTER,
        search: req.query.search as string,
        year: parseInt(req.query.year as string),
        author: parseInt(req.query.author as string),
        offset: parseInt(req.query.offset as string || '0'),
        limit: parseInt(req.query.limit as string || '20')
    };

    const response = await shortBooksData(request);
    res.json(response);
}


