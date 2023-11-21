import { Request, Response } from 'express';
import { BookModel } from "../models/book-model.js";
import { readFile } from 'fs/promises';

/**
 *
 * @param req
 * @param res
 */
export const getBook = async (req: Request, res: Response) => {
    res.render('book-page');
}

const testSpawner = async (N: number) => {
    const pic = await readFile('./static/media/22.jpg');
    const books: BookModel[] = []
    for (let i = 0; i < N; i++) {
        books.push(new BookModel(
            `${i}`,
            2023,
            `pavlo ${i}`,
            `en`,
            `description`,
            pic,
            i
        ));
    }
    return books;
}

/**
 * 
 * @param req
 * @param res
 */
export const getBooks = async (req: Request, res: Response) => {
    const books = await testSpawner(18);
    res.render('books-page', { books });
}