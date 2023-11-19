import {Request, Response} from 'express';
import {BookModel} from "../models/book-model";

/**
 *
 * @param req
 * @param res
 */
export const getBook = async (req: Request, res: Response): Promise<BookModel> => {
    return new BookModel('', 1, '', '', '');
}

/**
 *
 * @param req
 * @param res
 */
export const getBooks = async (req: Request, res: Response): Promise<BookModel[]> => {
    return [];
}