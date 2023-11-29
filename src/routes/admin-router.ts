import express from 'express';
import { getBooksTable, createBook, logout, removeBook } from '../controllers/admin-controller.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




export const adminRouter = express.Router();

adminRouter.get('', getBooksTable);
adminRouter.post('', upload.single('image'), createBook);
adminRouter.get('/books/:book_id/remove', removeBook);


