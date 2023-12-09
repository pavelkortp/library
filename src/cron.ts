import * as cron from 'node-cron';
import mysqldump from 'mysqldump';
import {unlink} from "fs/promises";

import {getDeletedId, getSqlQuery} from "./db/scripts.js";
import {connection} from "./config/db-connection.js";
import {backupConfig} from "./config/db-backup.js";

const UPDATE_TIME = '* * * * *';

/**
 * Removes all books marked as deleted
 */
export const softRemove = async (): Promise<void> => {
    const sql: string = await getSqlQuery('remove-books');
    cron.schedule(UPDATE_TIME, async () => {
        const deletedId = await getDeletedId();
        await connection.query(sql);
        for (const id of deletedId) {
            try {
                await unlink(`static/img/books/${id}.jpg`);
                console.log(`REMOVED PICTURE WITH ID ${id}`);
            } catch (err) {
                console.log('Error with removing book picture: ', err);
            }
        }
    }).start();
};

/**
 * Creates full copy of a db at src/sql/backup.
 */
export const backup = async (): Promise<void> => {
    cron.schedule(UPDATE_TIME, async () => {
        try {
            await mysqldump.default(backupConfig);
            console.log('The database backup is successfully created.');
        } catch (err) {
            console.error('Error creating a database backup:', err);
        }
    }).start();
}

