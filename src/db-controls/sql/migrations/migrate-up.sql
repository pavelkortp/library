CREATE TABLE IF NOT EXISTS library.authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO library.authors (name)
SELECT DISTINCT author FROM library.books;


CREATE TABLE IF NOT EXISTS library.books_authors(
    book_id INT,
    author_id_1 INT NULL,
    author_id_2 INT NULL,
    author_id_3 INT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
    FOREIGN KEY (author_id_1) REFERENCES authors(id)
    FOREIGN KEY (author_id_2) REFERENCES authors(id)
    FOREIGN KEY (author_id_3) REFERENCES authors(id)
);

INSERT INTO library.books_authors(book_id, author_id_1)
SELECT books.id, authors.id
FROM library.books
RIGHT JOIN library.authors
ON books.author = authors.name
ORDER BY books.id;

ALTER TABLE library.books
DROP COLUMN author;
