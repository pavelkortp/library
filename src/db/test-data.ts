import { readFile } from 'fs/promises';
import {migrator} from '../migrator/migrator.js';
import {connection} from "../config/db-connection.js";

export const fillBooksTable = async () => {
    const sql = await readFile(`src/sql/backup/test-data-${migrator.version}.sql`,'utf-8');
    try {
        await connection.execute(sql);
    }catch (err){
        console.log('Test data already exists');
    }
}