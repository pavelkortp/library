import express from 'express';
import { getHomePage, getBookPage, getSearchedPage, getAdminPage } from '../controllers/home-controller.js';

export const mainRouter = express.Router();

mainRouter.get('/', getHomePage);
mainRouter.get('/books/:id', getBookPage);
mainRouter.get('/search', getSearchedPage);
mainRouter.get('/admin', getAdminPage);
