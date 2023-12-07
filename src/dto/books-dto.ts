import {BookModel} from "../models/book-model.js";
import {RequestData} from "../declarations.js";
import {findById, getAll} from "../repositories/books-repository.js";

class BookDTO {
    constructor(
        public id?: number,
        public title?: string,
        public author?: string | string[],
        public description?: string,
        public year?: number,
        public language?: string,
        public isbn?: string,
        public rating?: number,
        public pages?: number,
    ) {
    };

    static toMiniBook(book: BookModel) {
        return new BookDTO(book.id, book.title, book.author)
    };

    static toBigBook(book: BookModel) {
        return new BookDTO(
            book.id,
            book.title,
            book.author,
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
 * Generates response data from requested params.
 * @param params params which describes what kind of data have requested.
 */
export const booksTransformData = async (params: RequestData) => {
    const allBooks = await getAll(params.filter, params.search);
    const books = allBooks
        .slice(params.offset, params.offset + params.limit)
        .map(BookDTO.toMiniBook);
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
    }
}

/**
 * Generates response object for personal book-page.
 * @param id unique book id.
 */
export const bookTransformData = async (id: number) => {
    const book = await findById(id);
    if (book) {
        return {
            data: BookDTO.toBigBook(book),
            success: true
        }
    }
    return {success: false};
}

