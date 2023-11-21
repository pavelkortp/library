import { Request, Response } from 'express';
import { BookModel } from '../models/book-model.js';
import { readFile } from 'fs/promises';

/**
 * Renders book-page
 * @param req HTTP Request.
 * @param res html page.
 */
export const getBook = async (req: Request, res: Response): Promise<void> => {
    const books = await testSpawner(100);
    const id = parseInt(req.params.book_id);
    res.render('book-page', { book: books[id] });
}

export const testSpawner = async (N: number) => {
    const pic = await readFile('./static/img/22.jpg');
    const books: BookModel[] = []
    for (let i = 0; i < N; i++) {
        books.push(new BookModel(
            `${i}`,
            2023,
            `pavlo ${i}`,
            `en`,
            `description`,
            pic,
            i,
            i*10,
            0, 0
        ));
    }
    return books;
}

/**
 * 
 * @param req
 * @param res
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const books = await testSpawner(100);
    res.render('books-page', { books });
}