DROP TABLE IF EXISTS genres CASCADE;

CREATE TABLE genres (
  genre_id SERIAL PRIMARY KEY,
  genre_name TEXT NOT NULL
);

INSERT INTO genres (genre_name) VALUES ('Action');
INSERT INTO genres (genre_name) VALUES ('Adventure');
INSERT INTO genres (genre_name) VALUES ('Comedy');
INSERT INTO genres (genre_name) VALUES ('Crime & Mystery');
INSERT INTO genres (genre_name) VALUES ('Drama');
INSERT INTO genres (genre_name) VALUES ('Fantasy');
INSERT INTO genres (genre_name) VALUES ('Historical');
INSERT INTO genres (genre_name) VALUES ('Horror');
INSERT INTO genres (genre_name) VALUES ('Romance');
INSERT INTO genres (genre_name) VALUES ('Science Fiction');
INSERT INTO genres (genre_name) VALUES ('Western');
