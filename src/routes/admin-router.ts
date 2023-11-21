import express from 'express';
import { getBooksTable, createBook, logout } from '../controllers/admin-controller.js';

export const adminRouter = express.Router();

adminRouter
    .route('/admin/api/v1/')
    .get(getBooksTable)
    .post(createBook);

adminRouter.get('/admin/logout', logout)

