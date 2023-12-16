import {RowDataPacket} from 'mysql2/promise';
import {readFile, writeFile} from 'fs/promises';
import {connection} from '../config/db-connection.js';



/**
 * Current db version:<br>
 * <b>V1</b> - only books table and only one author.<br>
 * <b>V2</b> - normalized version, authors and books_authors<br>
 * tables (From books removes author column).
 */
let version: 'v1' | 'v2' = JSON.parse(await readFile('src/config/db-version.json', 'utf-8')).version;

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

const getAuthorsColumn = async (): Promise<string[]> => {
    const sql: string = await readFile(`src/sql/migrations/up/get-authors.sql`, 'utf-8');
    const [rows] = await connection.query<RowDataPacket[]>(sql);
    return rows.map((e) => e.author + '');
}

const fillAuthorsTable = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/up/fill-authors-table.sql`, 'utf-8');

    const authors = await getAuthorsColumn();
    const a: string[][] = authors.map((e) => e.split(',').map((name) => name.trim()));

    const names = new Set<string>(([] as string[]).concat(...a));

    for (const name of names) {
        await connection.query<RowDataPacket[]>(sql, [name]);
    }
};

const createBooksAuthorsTable = async (): Promise<void> => {
    const sql: string = await readFile(`src/sql/migrations/up/create-books_authors-table.sql`, 'utf-8');
    await connection.execute(sql);
};

const fillBooksAuthorsTable = async (): Promise<void> => {
    const insertValues: string = await readFile(`src/sql/migrations/up/fill-books_authors-table.sql`, 'utf-8');

    const getBooks: string = await readFile(`src/sql/migrations/up/get-books.sql`, 'utf-8');
    const [books] = await connection.query<RowDataPacket[]>(getBooks);

    const getAuthors: string = await readFile(`src/sql/migrations/up/get-authors-table.sql`, 'utf-8');
    const [authors] = await connection.query<RowDataPacket[]>(getAuthors);

    for (const book of books) {
        const bookAuthors: string[] = book.author.split(',');
        const bookId: number = book.id;
        const authorsIds: number[] = bookAuthors
            .map((name) => authors
                .find((entry) => {
                    return entry.name.trim() == name.trim()
                })!.id);

        for (const authorId of authorsIds) {
            await connection.execute(insertValues, [bookId, authorId]);
        }
    }
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
            console.log('The migration was successful');
            this.version = 'v2';
        } else {
            console.log('version v2 already exists')
        }
    },
    down: async function () {
        if (this.version == 'v2') {
            await migrateDown();
            console.log('The migration was successful');
            this.version = 'v1';
        } else {
            console.log('version v1 already exists')
        }
    },
    version: version
}

