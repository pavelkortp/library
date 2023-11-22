import express, { Express } from 'express';
import { booksRouter } from './routes/books-router.js';
import mysql, { Connection } from 'mysql2/promise';
import { user, password, host, database } from './db-controls/db-config.js';
import { connect, createTables } from './db-controls/db-scrypst.js';
import { adminRouter } from './routes/admin-router.js';
import basicAuth from 'express-basic-auth';

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
app.use(booksRouter);
app.use('/admin', basicAuth({
    challenge:true,
    users: { admin: '1234'}
}));
app.use(adminRouter);

app.use('/books', express.static('static'));

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
