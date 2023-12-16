import express from 'express';
import {getBook, getBooks, increaseClicks} from '../controllers/api/books-controller.js';
import {validate_book_id} from '../controllers/api/request-validator.js';

export const booksRouter = express.Router();

booksRouter.get('', getBooks);
booksRouter.get('/:book_id', validate_book_id, getBook);
booksRouter.patch('/:book_id',validate_book_id, increaseClicks);

