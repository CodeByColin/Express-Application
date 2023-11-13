CREATE TABLE members (
    id serial PRIMARY KEY,
    firstname varchar(30),
    lastname varchar(30),
    membership BOOLEAN
);

CREATE TABLE books (
    id serial PRIMARY KEY,
    title varchar,
    author varchar,
    genre varchar,
    available BOOLEAN,
    borrower_id INTEGER REFERENCES members(id) ON DELETE SET NULL
);

INSERT INTO members (firstname, lastname, membership) VALUES ('Elon', 'Musk', true);
INSERT INTO members (firstname, lastname, membership) VALUES ('kyle', 'knox', true);
INSERT INTO members (firstname, lastname, membership) VALUES ('johnny', 'boyd', false);
INSERT INTO members (firstname, lastname, membership) VALUES ('kenny', 'rodgers', true);
INSERT INTO members (firstname, lastname, membership) VALUES ('peyton', 'manning', false);


INSERT INTO books (title, author, genre, available) VALUES ('Organizational pathology', 'yitzhak samuel', 'psychology', false);
INSERT INTO books (title, author, genre, available) VALUES ('art of war', 'sun tzu', 'philosophy', false);
INSERT INTO books (title, author, genre, available) VALUES ('cant hurt me', 'david goggins', 'biography', false);
INSERT INTO books (title, author, genre, available) VALUES ('the way of men', 'jack donovan', 'philosophy', true);
INSERT INTO books (title, author, genre, available) VALUES ('to kill a mockingbird', 'harper lee', 'novel', true);