import express from 'express';
import { getHomePage } from '../controllers/home-controller.js';

export const booksRouter = express.Router();

booksRouter.get('/', getHomePage);