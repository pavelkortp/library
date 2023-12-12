UPDATE books
SET author = (
    SELECT authors.name
    FROM books_authors
             JOIN authors ON books_authors.author_id = authors.id
    WHERE books_authors.book_id = books.id
    ORDER BY books_authors.author_id
    LIMIT 1
)
WHERE EXISTS (
    SELECT 1
    FROM books_authors
    WHERE books_authors.book_id = books.id
);
