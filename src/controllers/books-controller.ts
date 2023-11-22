import { Request, Response } from 'express';
import { BookModel } from '../models/book-model.js';
import { readFile } from 'fs/promises';
import { getAll } from '../repositories/books-repository.js';

/**
 * Renders book-page
 * @param req HTTP Request.
 * @param res html page.
 */
export const getBook = async (req: Request, res: Response): Promise<void> => {
    const books = await getAll();
    const id = parseInt(req.params.book_id);
    res.render('book-page', { book: books[id] });
}

/**
 * NOT REAL METHOD ONLY TEST
 */
export const testSpawner = async (N: number) => {
    const pic = await readFile('./static/img/22.jpg');
    const books: BookModel[] = [];
    for (let i = 0; i < N; i++) {
        await 
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
 * Renders home books-page with books.
 * @param req HTTP Request
 * @param res HTML page wich contains all books.
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const books = await getAll();
    res.render('books-page', { books });
}