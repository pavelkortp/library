import { Request, Response } from 'express';
import { testSpawner } from './books-controller.js';
import { BookModel } from '../models/book-model.js';
const books = await testSpawner(10);

export const getBooksTable = async (req: Request, res: Response): Promise<void> => {
    res.render('admin-page', { books });
}

export const createBook = async (req: Request, res: Response): Promise<void> => {
    const book: {
        name: string,
        year: string,
        lang: string,
        art: Buffer,
        author1: string,
        description: string,
        pages: string
    } = req.body;
    books.push(new BookModel(
        book.name,
        parseInt(book.year),
        book.author1,
        book.lang,
        book.description,
        book.art,
        0,
        parseInt(book.pages)
    ))

    res.render('admin-page', { books });
}




