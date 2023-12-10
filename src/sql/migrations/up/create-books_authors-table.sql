CREATE TABLE IF NOT EXISTS books_authors
(
    book_id     INT,
    author_id_1 INT NULL,
    author_id_2 INT NULL,
    author_id_3 INT NULL,
    FOREIGN KEY (book_id) REFERENCES books (id),
    FOREIGN KEY (author_id_1) REFERENCES authors (id),
    FOREIGN KEY (author_id_2) REFERENCES authors (id),
    FOREIGN KEY (author_id_3) REFERENCES authors (id)
);