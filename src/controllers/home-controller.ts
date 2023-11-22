import { Request, Response } from 'express';

/**
 * Renders main page.
 * @param req HTTP Request.
 * @param res HTML page.
 */
export const getHomePage = async (req:Request, res:Response) => {
    res.render('books-page');
}

