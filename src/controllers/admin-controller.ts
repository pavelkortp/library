import { Request, Response } from 'express';
// import { testSpawner } from './books-controller.js';
import { BookModel } from '../models/book-model.js';
import { save, getAll, removeById } from '../repositories/books-repository.js';


/**
 * NOT WORK
 * @param req 
 * @param res 
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
    res.set('Authorization', 'Basic required')
    res.status(401).redirect('http://localhost:3000/');
}

/**
 * Returns page with books.
 * @param req HTTP Request.
 * @param res HTML page.
 */
export const getBooksTable = async (req: Request, res: Response): Promise<void> => {
    const books = await getAll();
    res.render('admin-page', { books });
}

/**
 * 
 * @param req 
 * @param res 
 */
export const removeBook = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.book_id);
    await removeById(id);
}

/**
 * Creates new book and saves it to db
 * @param req HTTP Request with book's data in body.
 * @param res HTML admin-page with books.
 */
export const createBook = async (req: Request, res: Response): Promise<void> => {
    const book: {
        title: string,
        year: string,
        language: string,
        author1: string,
        description: string,
        pages: string
    } = req.body;

    await save(new BookModel(
        book.title,
        parseInt(book.year),
        book.author1,
        book.language,
        book.description,
        0,
        parseInt(book.pages)
    ));


    const books = await getAll();

    res.render('admin-page', { books });
}




