/**
 * Filter for books, which server sends to front
 * all - sends all books in default order,
 * new - sends all books ordered by date (DESC),
 * popular - sends all books ordered by views (DESC)
 */
declare type Filter = 'all' | 'new' | 'popular';

/**
 * Processed secure data coming from users.
 */
declare type RequestData = {
    filter: Filter,
    search?: string,
    year?: number,
    author?: number,
    offset: number,
    limit: number
}

/**
 * Request data, which sends by users.
 */
declare type NotValidRequestData = {
    filter?: string,
    search?: string,
    year?: string,
    author?: string,
    offset?: string,
    limit?: string
};

/**
 * Response data format to admin panel.
 */
declare type AdminResponseData = {
    data?: {
        books: AdminBookDTO[],
        totalPages: number,
        page: number
    },
    success: boolean
}

/**
 * Response data to main page or search page.
 */
declare type ResponseData = {
    data: {
        books: BookDTO[],
        total: {
            amount: number
        }
        filter: Filter,
        search?: string,
        offset: number,
        limit: number
    }
    success: boolean
}

/**
 * Data which sends by user from admin panel to create new book.
 */
declare type BookCreationData = {
    title: string,
    year: string,
    isbn: string,
    language: string,
    pages: string,
    author1: string,
    author2: string,
    author3: string,
    description: string,
    rating: string
    image: Express.Multer.File | undefined
}



