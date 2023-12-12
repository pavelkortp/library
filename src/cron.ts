import * as cron from 'node-cron';
import mysqldump from 'mysqldump';
import {unlink} from 'fs/promises';

import {getDeletedId, getSqlQuery} from './db/scripts.js';
import {connection} from './config/db-connection.js';
import {backupConfig} from './config/db-backup.js';
import {migrator} from './migrator/migrator.js';

const UPDATE_TIME = '59 23 * * *';

/**
 * Removes all books marked as deleted
 */
export const softRemove = async (): Promise<void> => {
    const sql: string = await getSqlQuery('remove-books', migrator.version);
    cron.schedule(UPDATE_TIME, async () => {
        const deletedId = await getDeletedId();
        for (const id of deletedId) {
            try {
                if (migrator.version=='v2'){
                    await connection.execute(await getSqlQuery('remove-links', migrator.version), [id]);
                }
                await unlink(`static/img/books/${id}.jpg`);
                console.log(`REMOVED PICTURE WITH ID ${id}`);
            } catch (err) {
                console.log('Error with removing book picture: ', err);
            }
        }
        await connection.execute(sql);
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

