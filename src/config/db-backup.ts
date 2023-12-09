import  {database, host, password, user} from "../db/db-config.js";

/**
 * Configuration for creating a database backup.
 */
export const backupConfig = {
    connection:{
        host,
        user,
        password,
        database
    },
    dumpToFile: `src/sql/backup/backup_${new Date().toISOString().replace(/:/g, '-')}.sql`,
};
