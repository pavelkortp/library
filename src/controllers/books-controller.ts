import { Request, Response } from 'express';
import { findById, getAll, increaseBookClicks } from '../repositories/books-repository.js';
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
                views: book.views,
                event: true
            },
            success: true
        });
        return;
    }
    res.status(404).render('error-page', { error: { status: 404, message: 'Такої книжки не існує' } });

}

export const increaseClicks = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.book_id);
    if (req.query.increase_clicks) {
        await increaseBookClicks(id);
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, msg: 'В тілі запиту немає необхідного параметру' });
    }



}


/**
 * Renders home books-page with books.
 * @param req HTTP Request
 * @param res HTML page wich contains all books.
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const filter = req.query.filter as Filter || 'all';
    const param = req.query.search as string || undefined;

    const books = await getAll(filter, param);
    const offset = req.query.offset as string || '18';

    res.json({

        data: {
            books: books.slice(0, parseInt(offset)).map((e: BookModel) => {
                return { id: e.id, title: e.title, author: e.author }
            }),
            total: {
                amount: books.length
            },
            filter: filter,
            search: param,
            offset: offset
        },

        success: true
    });
}