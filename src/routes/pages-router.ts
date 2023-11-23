import express from 'express';
import { getHomePage, getBookPage } from '../controllers/home-controller.js';

export const mainRouter = express.Router();

mainRouter.get('/', getHomePage);
mainRouter.get('/books/:id', getBookPage);