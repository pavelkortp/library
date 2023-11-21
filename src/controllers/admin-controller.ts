import { Request, Response } from 'express';
import { testSpawner } from './books-controller.js';

export const getBooksTable = async (req: Request, res: Response):Promise<void> => {
    const books = await testSpawner(10);
    
    res.render('admin-page', { books });
}


