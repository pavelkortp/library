/**
 * Filter for books, which server sends to front
 * all - sends all books in default order,
 * new - sends all books ordered by date (DESC),
 * popular - sends all books ordered by views (DESC)
 */
export type Filter = 'all' | 'new' | 'popular';

/**
 * Requested data, which can be sand on server as query params.
 */
export type RequestData = {
    filter?: Filter,
    search?: string,
    year?: number,
    author?: number,
    offset: number,
    limit: number
}