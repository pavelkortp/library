import { Request, Response } from 'express';
import { findById, getAll, increaseBookClicks } from '../../repositories/books-repository.js';
import { BookModel } from '../../models/book-model.js';
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
                rating: book.rating,
                language: book.language,
                year: book.year,
                views: book.views,
                event: true
            },
            success: true
        });
        return;
    }
    res.status(404);
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
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
}


/**
 * Renders home books-page with books.
 * @param req HTTP Request
 * @param res HTML page wich contains all books.
 */
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const filter = req.query.filter as Filter || 'new';
    const search = req.query.search as string;
    const year = parseInt(req.query.year as string);
    const author = parseInt(req.query.author as string);
    const offset = parseInt(req.query.offset as string || '0');
    const limit = parseInt(req.query.limit as string || '20');

    const allBooks = await getAll(filter, search);
    const books = allBooks
        .slice(offset, offset + limit)
        .map((e: BookModel) => {
            return {
                id: e.id,
                author: e.author,
                title: e.title
            }
        });

    res.json({
        data: {
            books: books,
            total: {
                amount: allBooks.length
            },
            filter: filter,
            search: search,
            offset: offset,
            limit: limit
        },
        success: true
    });
}


