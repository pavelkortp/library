SELECT *
FROM (SELECT books.*, GROUP_CONCAT(authors.name) AS author
      FROM books
               JOIN books_authors ON books.id = books_authors.book_id
               JOIN authors ON authors.id = books_authors.author_id
      GROUP BY books.title, books.id) as entries
ORDER BY entries.id