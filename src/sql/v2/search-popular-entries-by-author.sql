SELECT *
FROM (SELECT books.*, GROUP_CONCAT(authors.name) AS author
      FROM books
               JOIN books_authors ON books.id = books_authors.book_id
               JOIN authors ON authors.id = books_authors.author_id
      GROUP BY books.title, books.id) as entries
WHERE LOWER(TRIM(entries.title)) LIKE LOWER(TRIM(?))
  AND entries.id IN (
    SELECT book_id
    FROM books_authors
    WHERE author_id = (?)
)
ORDER BY entries.views DESC;