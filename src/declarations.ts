/**
 * Filter for books, which server sends to front
 * all - sends all books in default order,
 * new - sends all books ordered by date (DESC),
 * popular - sends all books ordered by views (DESC)
 */
declare type Filter = 'all' | 'new' | 'popular';