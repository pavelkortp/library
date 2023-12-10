CREATE TABLE IF NOT EXISTS books_authors
(
    book_id     INT,
    author_id INT NULL,
    FOREIGN KEY (book_id) REFERENCES books (id),
    FOREIGN KEY (author_id) REFERENCES authors (id)
);