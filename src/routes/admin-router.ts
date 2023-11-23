import express from 'express';
import { getBooksTable, createBook, logout, removeBook } from '../controllers/admin-controller.js';

export const adminRouter = express.Router();

adminRouter.get('', getBooksTable);
adminRouter.post('', createBook);
adminRouter.get('/logout', logout);
adminRouter.get('/books/:book_id/remove', removeBook);


