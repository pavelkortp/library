import express, {Express} from 'express';
import {booksRouter} from './routes/books-router.js';
import mysql from 'mysql';
import {user, password, host} from '../db-config.js';


export const app: Express = express();
const PORT = 3000;


const con = mysql.createConnection({
  host: host,
  user: user,
  password: password
});

(async ()=>{
    con.connect((err:Error)=>{
        console.log(err);
    })
})();

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(booksRouter);
app.use('/books', express.static('static'));

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
