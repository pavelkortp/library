import {BookModel} from "../models/book-model.js";
import {findById, getAll} from "../repositories/books-repository.js";

/**
 * Count of books per one page on admin panel.
 */
export const BOOKS_PER_PAGE: number = 5;

/**
 * Basic presentation of the book for the user.
 */
class BookDTO {
    constructor(
        public id?: number,
        public title?: string,
        public author?: string | string[],
    ) {
    };

    static toBookDTO(book: BookModel): BookDTO {
        return new BookDTO(book.id, book.title, book.authors)
    };
}

/**
 * Full presentation of the book for the user.
 */
class FullBookDTO extends BookDTO {
    constructor(
        public id?: number,
        public title?: string,
        public author?: string | string[],
        public description?: string,
        public year?: number,
        public language?: string,
        public isbn?: string,
        public rating?: number,
        public pages?: number,) {
        super(id, title, author);
    }

    static toFullBookDTO(book: BookModel): FullBookDTO {
        return new FullBookDTO(
            book.id,
            book.title,
            book.authors,
            book.description,
            book.year,
            book.language,
            book.isbn,
            book.rating,
            book.pages
        );
    };
}

/**
 * Admin version of the book that contains certain statistics
 */
class AdminBookDTO extends BookDTO {
    constructor(
        public id?: number,
        public title?: string,
        public author?: string | string[],
        public clicks?: number,
        public year?: number,
    ) {
        super(id, title, author);
    };

    /**
     * Creates AdminBookDTO from BookModel
     * @param book default book.
     * @return new
     */
    static toAdminBookDTO(book: BookModel): AdminBookDTO {
        return new AdminBookDTO(
            book.id,
            book.title,
            book.authors,
            book.clicks,
            book.year
        );
    }
}

/**
 * Generates response data from requested params.
 * @param params params which describes what kind of data have requested.
 */
export const shortBooksData = async (params: RequestData): Promise<ResponseData> => {
    const allBooks = await getAll(params.filter, params.search);
    const books = allBooks
        .slice(params.offset, params.offset + params.limit)
        .map(BookDTO.toBookDTO);
    return {
        data: {
            books: books,
            total: {
                amount: allBooks.length
            },
            filter: params.filter,
            search: params.search,
            offset: params.offset,
            limit: params.limit
        },
        success: true
    };
}

/**
 * Generates response object for personal book-page.
 * @param id unique book id.
 */
export const fullBookData = async (id: number) => {
    const book = await findById(id);
    if (book) {
        return {
            data: FullBookDTO.toFullBookDTO(book),
            success: true
        };
    }
    return {success: false};
}

/**
 * Generates admin response obj
 * @param page page number
 * @return admin response object.
 */
export const adminBooksData = async (page: number): Promise<AdminResponseData> => {
    const books = await getAll();
    const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
    const offset = (page - 1) * BOOKS_PER_PAGE;
    return {
        data: {
            books: books
                .slice(offset, offset + BOOKS_PER_PAGE)
                .map(AdminBookDTO.toAdminBookDTO),
            totalPages: totalPages,
            page: page
        },
        success: true
    };
}

