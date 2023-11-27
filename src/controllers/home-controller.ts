import { Request, Response } from 'express';

/**
 * Renders main page.
 * @param req HTTP Request.
 * @param res HTML page.
 */
export const getHomePage = async (req: Request, res: Response): Promise<void> => {
    res.render('books-page');
}

/**
 * Renders book's page.
 * @param req HTTP Request.
 * @param res HTML page.
 */
export const getBookPage = async (req: Request, res: Response): Promise<void> => {
    res.render('book-page');
}

export const getSearchedPage = async (req: Request, res: Response): Promise<void> => {
    res.render('search-page', {search: req.query.search});
}

