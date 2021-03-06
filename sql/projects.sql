DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT, 
  subtitle TEXT, 
  description TEXT, 
  genre TEXT, 
  state TEXT, 
  city TEXT, 
  image_url TEXT, 
  donations TEXT,
  funding_goal TEXT, 
  funding_ex_date TEXT, 
  risk_challenge TEXT,
  diversity TEXT,
  user_id SERIAL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
