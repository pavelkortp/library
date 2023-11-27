import express from 'express';
import { getHomePage, getBookPage, getSearchedPage } from '../controllers/home-controller.js';

export const mainRouter = express.Router();

mainRouter.get('/', getHomePage);
mainRouter.get('/books/:id', getBookPage);
mainRouter.get('/search', getSearchedPage)