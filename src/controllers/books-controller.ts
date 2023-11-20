import {Request, Response} from 'express';
import {BookModel} from "../models/book-model.js";

/**
 *
 * @param req
 * @param res
 */
export const getBook = async (req: Request, res: Response) => {
    res.render('book-page');
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const getBooks = async (req: Request, res: Response, next:Function) => {

    res.render('books-page');
}