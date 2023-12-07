import mysql, {Connection} from "mysql2/promise";
import {database, host, password, user} from "../db/db-config.js";

export const connection: Connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});