import express from 'express';
import { getBooksTable, createBook } from '../controllers/admin-controller.js';
// import  from '../controllers/admin-controller.js';

export const adminRouter = express.Router();

adminRouter.get('/admin/api/v1/', getBooksTable);
adminRouter.post('/admin/api/v1/', createBook)