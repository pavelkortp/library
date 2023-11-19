import express, {Express} from 'express';
import {booksRouter} from './routes/books-router';

export const app: Express = express();
const PORT = 3000;

app.set('views', express.static('views'));
app.set('view engine', 'ejs');
app.use(booksRouter);

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})
