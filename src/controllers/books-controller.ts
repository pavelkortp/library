import { Request, Response } from 'express';
import { findById, getAll } from '../repositories/books-repository.js';

/**
 * Renders book-page
 * @param req HTTP Request.
 * @param res html page.
 */
export const getBook = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.book_id);
    const book = await findById(id);
}


/**
 * Renders home books-page with books.
 * @param req HTTP Request
 * @param res HTML page wich contains all books.
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const books = await getAll();
    
}