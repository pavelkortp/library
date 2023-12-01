import { readFile } from 'fs/promises';
import { createBook } from './db-scripst.js';
import { BookModel } from '../models/book-model.js';

export const fillBooksTable = async () => {
    const books: BookModel[] = JSON.parse(await readFile('./test-books.json', 'utf-8'));

    books.forEach(async (e) => {
        try {
            createBook(e);
        } catch (err) {
            console.log(`${e} data already exists`);
        }
    });

}