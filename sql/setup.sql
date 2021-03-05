-- DROP TABLE IF EXISTS users CASCADE;

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   email VARCHAR(256) NOT NULL,
--   password_hash VARCHAR(512) NOT NULL,
--   first_name VARCHAR(50) NOT NULL,
--   last_name VARCHAR(50) NOT NULL,
--   tagline VARCHAR(120),
--   user_role VARCHAR(50),
--   profile_image_url VARCHAR(512) NOT NULL,
--   payment_handle VARCHAR(50),
--   user_state VARCHAR(20) NOT NULL,
--   user_city VARCHAR(50) NOT NULL
-- );


DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  tagline TEXT,
  user_role TEXT,
  profile_image_url TEXT,
  payment_handle TEXT,
  user_state TEXT,
  user_city TEXT
);
