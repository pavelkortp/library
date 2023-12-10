INSERT INTO books_authors(book_id, author_id_1)
SELECT books.id, authors.id
FROM books
         RIGHT JOIN authors
                    ON books.author = authors.name
ORDER BY books.id;