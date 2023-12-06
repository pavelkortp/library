import express from 'express';
import { getBooksTable, createBook, removeBook } from '../controllers/api/admin-controller.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




export const adminRouter = express.Router();

adminRouter.get('/books', getBooksTable);
adminRouter.post('/books/create', upload.single('image'), createBook);
adminRouter.delete('/books/:book_id/remove', removeBook);


