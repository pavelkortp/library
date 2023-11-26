import { readFile } from 'fs/promises';
import { createBook } from './db-scripst.js';
import { BookModel } from '../models/book-model.js';

export const fillBooksTable = async () => {
    const books: BookModel[] = JSON.parse(await readFile('./test-books.json', 'utf-8'));
    try {
        books.forEach(async (e) => {
            createBook(e);
        });
    } catch (err) {
        console.log('test data already exists');
    }
}