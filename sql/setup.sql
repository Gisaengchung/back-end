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
