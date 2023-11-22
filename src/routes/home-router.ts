import express from 'express';
import { getHomePage } from '../controllers/home-controller.js';

export const mainRouter = express.Router();

mainRouter.get('/', getHomePage);