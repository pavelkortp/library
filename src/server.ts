import express, { Express } from 'express';
import mysql, { Connection } from 'mysql2/promise';
import basicAuth from 'express-basic-auth';


import { booksRouter } from './routes/books-router.js';
import { adminRouter } from './routes/admin-router.js';
import { mainRouter } from './routes/pages-router.js';

import { user, password, host, database } from './db-controls/db-config.js';
import { connect, createTables } from './db-controls/db-scripst.js';
import { fillBooksTable } from './db-controls/test-data.js';


export const app: Express = express();
const PORT = 3000;


export const con: Connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

await connect(con);
await createTables(con);


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

app.use('/api/v1/books', booksRouter);

app.use('/admin', basicAuth({
    challenge: true,
    users: { admin: '1234' }
}));

app.use(mainRouter);


app.use('/admin/api/v1', adminRouter);
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
