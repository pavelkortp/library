import express from 'express';
import {getBook, getBooks} from '../controllers/books-controller';
export const booksRouter = express.Router();

booksRouter
    .get('/books', getBooks)
    .get('/books/{book_id}', getBook);

