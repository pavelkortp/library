ALTER TABLE books
    ADD COLUMN author varchar(100);

UPDATE books
    JOIN books_authors ON books.id = books_authors.book_id
    JOIN authors ON books_authors.author_id_1 = authors.id
SET books.author = authors.name;