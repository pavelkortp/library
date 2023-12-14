import { Request, Response } from 'express';
import {escapeHtml} from "./api/request-validator.js";

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

/**
 * Renders search results page.
 * @param req HTTP request.
 * @param res HTML page with results of searching.
 */
export const getSearchedPage = async (req: Request, res: Response): Promise<void> => {
    res.render('search-page', { search: escapeHtml(req.query.search as string)});
}

/**
 * Renders admin page.
 * @param req HTTP request
 * @param res HTML admin page.
 */
export const getAdminPage = async (req: Request, res: Response): Promise<void> => {
    res.render('admin-page');
}

/**
 * Renders error page for incorrect routes.
 * @param req HTTP request
 * @param res HTML error page.
 */
export const getErrorPage = async (req:Request, res:Response):Promise<void> =>{
    res.status(404).render('404');
}

