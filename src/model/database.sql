DROP TABLE projekt.register;
DROP TABLE projekt.token;
DROP SCHEMA projekt;

CREATE SCHEMA projekt;

CREATE TABLE projekt.register(
  register_id SERIAL,
  CONSTRAINT register_pk PRIMARY KEY (register_id),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE projekt.token (
  register_id INTEGER NOT NULL,
  CONSTRAINT token_pk PRIMARY KEY (register_id),
  token VARCHAR(255)
);

INSERT INTO projekt.register (firstName,lastName,email,password) VALUES('admin','admin','admin','$2b$10$pp1X08BkBhZCcBMF8KBaW.NvsVwXFNeUbWz560BM1LVHnSlYK/q8i');

SELECT * FROM projekt.register LIMIT 100;

MATCH(a) DETACH DELETE a;
WITH[
  ['USA','Atlanta','USA','Dallas',100],
  ['USA','Chicago','USA','Dallas',100],
  ['USA','Dallas','Mexico','Mexico City',200],
  ['Mexico','Mexico City','Columbia','Bogota',200],
  ['Columbia','Bogota','Brazil','Rio de Janerio',200],
  ['Brazil','Rio de Janerio','USA','Chicago',500],

  ['Spain','Madrid','France','Paris',100],
  ['England','London','France','Paris',100],
  ['Netherlands','Rotterdam','England','London',100],
  ['Italy','Rome','Netherlands','Rotterdam',200],
  ['England','London','Germany','Berlin',200],
  ['Poland','Warsaw','Germany','Berlin',100],
  ['Poland','Warsaw','Greece','Athens',200],

  ['China','Pekin','Pekin','Hong-kong',100],
  ['China','Pekin','China','Shanghai',100],
  ['China','Shanghai','South Korea','Seul',100],
  ['South Korea','Seul','Japan','Tokyo',100],
  ['Japan','Tokyo','Singapur','Singapur',300],
  ['China','Pekin','Singapur','Singapur',200],

  ['USA','Chicago','China','Shanghai',1000],
  ['USA','Atlanta','Poland','Warsaw',600],
  ['Japan','Tokyo','France','Paris',1200]
] AS nested
UNWIND nested AS row
MERGE (a:Airport {country: row[0], city: row[1]})
MERGE (b:Airport {country: row[2], city: row[3]})
MERGE (a)-[r_in:CONNECTION {distance: row[4]}]->(b)
MERGE (b)-[r_out:CONNECTION {distance: row[4]}]->(a)

MATCH (n) RETURN n LIMIT 25;