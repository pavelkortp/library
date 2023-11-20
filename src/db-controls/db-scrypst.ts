import { Connection } from 'mysql2';

/**
 * Connects to db.
 */
export const connect = async (con: Connection) => {
    try {
        con.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}