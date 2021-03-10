DROP TABLE IF EXISTS states CASCADE;

CREATE TABLE states (
  state_id SERIAL PRIMARY KEY,
  state_code TEXT NOT NULL,
  state_name TEXT NOT NULL
);

INSERT INTO states (state_code, state_name) VALUES ('AL','Alabama');
INSERT INTO states (state_code, state_name) VALUES ('AK','Alaska');
INSERT INTO states (state_code, state_name) VALUES ('AZ','Arizona');
INSERT INTO states (state_code, state_name) VALUES ('AR','Arkansas');
INSERT INTO states (state_code, state_name) VALUES ('CA','California');
INSERT INTO states (state_code, state_name) VALUES ('CO','Colorado');
INSERT INTO states (state_code, state_name) VALUES ('CT','Connecticut');
INSERT INTO states (state_code, state_name) VALUES ('DE','Delaware');
INSERT INTO states (state_code, state_name) VALUES ('FL','Florida');
INSERT INTO states (state_code, state_name) VALUES ('GA','Georgia');
INSERT INTO states (state_code, state_name) VALUES ('HI','Hawaii');
INSERT INTO states (state_code, state_name) VALUES ('ID','Idaho');
INSERT INTO states (state_code, state_name) VALUES ('IL','Illinois');
INSERT INTO states (state_code, state_name) VALUES ('IN','Indiana');
INSERT INTO states (state_code, state_name) VALUES ('IA','Iowa');
INSERT INTO states (state_code, state_name) VALUES ('KS','Kansas');
INSERT INTO states (state_code, state_name) VALUES ('KY','Kentucky');
INSERT INTO states (state_code, state_name) VALUES ('LA','Louisiana');
INSERT INTO states (state_code, state_name) VALUES ('ME','Maine');
INSERT INTO states (state_code, state_name) VALUES ('MD','Maryland');
INSERT INTO states (state_code, state_name) VALUES ('MA','Massachusetts');
INSERT INTO states (state_code, state_name) VALUES ('MI','Michigan');
INSERT INTO states (state_code, state_name) VALUES ('MN','Minnesota');
INSERT INTO states (state_code, state_name) VALUES ('MS','Mississippi');
INSERT INTO states (state_code, state_name) VALUES ('MO','Missouri');
INSERT INTO states (state_code, state_name) VALUES ('MT','Montana');
INSERT INTO states (state_code, state_name) VALUES ('NE','Nebraska');
INSERT INTO states (state_code, state_name) VALUES ('NV','Nevada');
INSERT INTO states (state_code, state_name) VALUES ('NH','New Hampshire');
INSERT INTO states (state_code, state_name) VALUES ('NJ','New Jersey');
INSERT INTO states (state_code, state_name) VALUES ('NM','New Mexico');
INSERT INTO states (state_code, state_name) VALUES ('NY','New York');
INSERT INTO states (state_code, state_name) VALUES ('NC','North Carolina');
INSERT INTO states (state_code, state_name) VALUES ('ND','North Dakota');
INSERT INTO states (state_code, state_name) VALUES ('OH','Ohio');
INSERT INTO states (state_code, state_name) VALUES ('OK','Oklahoma');
INSERT INTO states (state_code, state_name) VALUES ('OR','Oregon');
INSERT INTO states (state_code, state_name) VALUES ('PA','Pennsylvania');
INSERT INTO states (state_code, state_name) VALUES ('RI','Rhode Island');
INSERT INTO states (state_code, state_name) VALUES ('SC','South Carolina');
INSERT INTO states (state_code, state_name) VALUES ('SD','South Dakota');
INSERT INTO states (state_code, state_name) VALUES ('TN','Tennessee');
INSERT INTO states (state_code, state_name) VALUES ('TX','Texas');
INSERT INTO states (state_code, state_name) VALUES ('UT','Utah');
INSERT INTO states (state_code, state_name) VALUES ('VT','Vermont');
INSERT INTO states (state_code, state_name) VALUES ('VA','Virginia');
INSERT INTO states (state_code, state_name) VALUES ('WA','Washington');
INSERT INTO states (state_code, state_name) VALUES ('WV','West Virginia');
INSERT INTO states (state_code, state_name) VALUES ('WI','Wisconsin');
INSERT INTO states (state_code, state_name) VALUES ('WY','Wyoming');
