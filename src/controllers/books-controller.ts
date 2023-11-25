import { Request, Response } from 'express';
import { findById, getAll } from '../repositories/books-repository.js';
import { BookModel } from '../models/book-model.js';

/**
 * Renders book-page
 * @param req HTTP Request.
 * @param res html page.
 */
export const getBook = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.book_id);
    const book = await findById(id);
    if (book) {
        res.json({
            data: {
                id: book.id,
                title: book.title,
                author: book.author,
                description: book.description,
                pages: book.pages,
                language: book.language,
                year: book.year,
                event: true
            },
            success: true
        });
    }
    res.status(404).render('error-page', { error: { status: 404, message: 'Такої книжки не існує' } });

}


/**
 * Renders home books-page with books.
 * @param req HTTP Request
 * @param res HTML page wich contains all books.
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const filter = req.query.filter as 'all' | 'new' | 'popular' || 'all';
    const books = await getAll(filter);
    res.json({
        
        data: {
            books: books.map((e: BookModel) => {
                return { id: e.id, title: e.title, author: e.author }
            }),
            total: {
                amount: books.length
            },
            filter: filter,
            offset: 10
        },
        success: true
    });
}