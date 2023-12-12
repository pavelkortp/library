import express from 'express';
import {getBooksTable, createBook, removeBook} from '../controllers/api/admin-controller.js';
import multer from 'multer';
import {validate_book_id, validate_creation_data, validate_page} from "../controllers/api/request-validator.js";

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

export const adminRouter = express.Router();

adminRouter.get('/books', validate_page, getBooksTable);
adminRouter.post('/books/create', upload.single('image'), validate_creation_data, createBook);
adminRouter.delete('/books/:book_id/remove', validate_book_id, removeBook);


