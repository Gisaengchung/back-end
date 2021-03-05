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
  email VARCHAR(256) NOT NULL,
  password_hash VARCHAR(512) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  tagline VARCHAR(120),
  user_role VARCHAR(50),
  profile_image_url VARCHAR(512),
  payment_handle VARCHAR(50),
  user_state VARCHAR(20),
  user_city VARCHAR(50)
);
