import {readFile, writeFile} from 'fs/promises';
import {connection} from "../config/db-connection.js";

/**
 * Current db version:<br>
 * <b>V1</b> - only books table and only one author.<br>
 * <b>V2</b> - normalized version, authors and books_authors<br>
 * tables (From books removes author column).
 */
export let version: 'v1' | 'v2' = JSON.parse(await readFile('src/config/db-version.json', 'utf-8')).version;

/**
 * Update db structure.
 */
const migrateUp = async () => {
    await createAuthorsTable();
    await fillAuthorsTable();
    await createBooksAuthorsTable();
    await fillBooksAuthorsTable();
    await removeAuthorColumnFromBooks();
    await writeFile(
        'src/config/db-version.json',
        JSON.stringify({version: 'v2'})
    )
    version = 'v2';
}

/**
 * Downgrade db structure.
 */
const migrateDown = async () => {
    await addAuthorColumnToBooks();
    await fillAuthorsColumn();
    await removeBooksAuthorsTable();
    await removeAuthorsTable();
    await writeFile(
        'src/config/db-version.json',
        JSON.stringify({version: 'v1'})
    )
    version = 'v1';
}

const createAuthorsTable = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/up/create-authors-table.sql`, 'utf-8');
    await connection.execute(sql);
};

const fillAuthorsTable = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/up/fill-authors-table.sql`, 'utf-8');
    await connection.execute(sql);
};

const createBooksAuthorsTable = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/up/create-books_authors-table.sql`, 'utf-8');
    await connection.execute(sql);
};

const fillBooksAuthorsTable = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/up/fill-books_authors-table.sql`, 'utf-8');
    await connection.execute(sql);
};

const removeAuthorColumnFromBooks = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/up/remove-column.sql`, 'utf-8');
    await connection.execute(sql);
};

const addAuthorColumnToBooks = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/down/add-column.sql`, 'utf-8');
    await connection.execute(sql);
}

const fillAuthorsColumn = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/down/fill-authors-column.sql`, 'utf-8');
    await connection.execute(sql);
}

const removeBooksAuthorsTable = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/down/remove-books_authors.sql`, 'utf-8');
    await connection.execute(sql);
}

const removeAuthorsTable = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/down/remove-authors.sql`, 'utf-8');
    await connection.execute(sql);
}

export const migrator = {
    up: async function () {
        if (this.version == 'v1') {
            await migrateUp();
        } else {
            this.version = 'v2'
            console.log('version v2 already exists')
        }
    },
    down: async function () {
        if (this.version == 'v2') {
            await migrateDown();
        } else {
            this.version = 'v1'
            console.log('version v1 already exists')
        }
    },
    version: version
}

