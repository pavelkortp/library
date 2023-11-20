import express, {Express} from 'express';
import {booksRouter} from './routes/books-router.js';

export const app: Express = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(booksRouter);
app.use('/books', express.static('static'));

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
