DROP TABLE IF EXISTS genres CASCADE;

CREATE TABLE genres (
  genre_id SERIAL PRIMARY KEY,
  genre TEXT NOT NULL
);

INSERT INTO genres (genre) VALUES ('Action');
INSERT INTO genres (genre) VALUES ('Adventure');
INSERT INTO genres (genre) VALUES ('Comedy');
INSERT INTO genres (genre) VALUES ('Crime & Mystery');
INSERT INTO genres (genre) VALUES ('Drama');
INSERT INTO genres (genre) VALUES ('Fantasy');
INSERT INTO genres (genre) VALUES ('Historical');
INSERT INTO genres (genre) VALUES ('Horror');
INSERT INTO genres (genre) VALUES ('Romance');
INSERT INTO genres (genre) VALUES ('Science Fiction');
INSERT INTO genres (genre) VALUES ('Western');
