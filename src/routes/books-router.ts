import express from 'express';
import {getBook, getBooks, increaseClicks} from '../controllers/api/books-controller.js';
import {validate_book_id, validate_request_data} from "../controllers/api/request-validator.js";

export const booksRouter = express.Router();

booksRouter.get('', validate_request_data, getBooks);
booksRouter.get('/:book_id', validate_book_id, getBook);
booksRouter.patch('/:book_id', validate_book_id, increaseClicks);

