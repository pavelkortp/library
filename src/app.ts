import express, {Express} from 'express';
import basicAuth from 'express-basic-auth';

import {booksRouter} from './routes/books-router.js';
import {adminRouter} from './routes/admin-router.js';
import {mainRouter} from './routes/pages-router.js';

import {connect, createTables} from './db/scripts.js';
import {backup, softRemove} from "./cron.js";

export const app: Express = express();
const PORT = 3000;

await connect();
await createTables();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));

app.use('/api/v1/books', booksRouter);

app.use('/admin', basicAuth({
    challenge: true,
    users: {admin: '1234'}
}));

app.use(mainRouter);

await softRemove();
await backup();

app.use('/admin/api/v1', adminRouter);


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
