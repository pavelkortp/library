import express from 'express';
import { getBook, getBooks, increaseClicks } from '../controllers/books-controller.js';

export const booksRouter = express.Router();

booksRouter.get('', getBooks);
booksRouter.get('/:book_id', getBook);
booksRouter.patch('/:book_id', increaseClicks);

