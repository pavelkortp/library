import express from 'express';
import { getBooksTable, createBook, logout, removeBook } from '../controllers/admin-controller.js';
// import multer from 'multer';
// const upload = multer({ dest: '../../static/books/img/' });




export const adminRouter = express.Router();

adminRouter.get('', getBooksTable);
adminRouter.post('', createBook);
adminRouter.get('/books/:book_id/remove', removeBook);


