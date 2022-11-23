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

MATCH (n) RETURN n LIMIT 25;
MATCH(a) DETACH DELETE a;
CREATE(a:Airport {city: 'Atlanta', country: 'USA'} ) RETURN a;
CREATE(a:Airport {city: 'Chicago', country: 'USA'} ) RETURN a;
CREATE(a:Airport {city: 'Dallas', country: 'USA'} ) RETURN a;
CREATE(a:Airport {city: 'Bogota', country: 'Columbia'} ) RETURN a;
CREATE(a:Airport {city: 'Mexico City', country: 'Mexico'} ) RETURN a;
CREATE(a:Airport {city: 'Rio de Janerio', country: 'Brazil'} ) RETURN a;
CREATE(a:Airport {city: 'Berlin', country: 'Germany'} ) RETURN a;
CREATE(a:Airport {city: 'Frankfurt', country: 'Germany'} ) RETURN a;
CREATE(a:Airport {city: 'Paris', country: 'France'} ) RETURN a;
CREATE(a:Airport {city: 'Madrid', country: 'Spain'} ) RETURN a;
CREATE(a:Airport {city: 'London', country: 'England'} ) RETURN a;
CREATE(a:Airport {city: 'Manchester', country: 'England'} ) RETURN a;
CREATE(a:Airport {city: 'Rotterdam', country: 'Netherlands'} ) RETURN a;
CREATE(a:Airport {city: 'Warsaw', country: 'Poland'} ) RETURN a;
CREATE(a:Airport {city: 'Cracow', country: 'Poland'} ) RETURN a;
CREATE(a:Airport {city: 'Moscow', country: 'Russia'} ) RETURN a;
CREATE(a:Airport {city: 'Athens', country: 'Greece'} ) RETURN a;
CREATE(a:Airport {city: 'Rome', country: 'Italy'} ) RETURN a;
CREATE(a:Airport {city: 'Milan', country: 'Italy'} ) RETURN a;
CREATE(a:Airport {city: 'Pekin', country: 'China'} ) RETURN a;
CREATE(a:Airport {city: 'Hong-kong', country: 'China'} ) RETURN a;
CREATE(a:Airport {city: 'Shanghai', country: 'China'} ) RETURN a;
CREATE(a:Airport {city: 'Tokyo', country: 'Japan'} ) RETURN a;
CREATE(a:Airport {city: 'Seul', country: 'South Korea'} ) RETURN a;
CREATE(a:Airport {city: 'Singapur', country: 'Singapur'} ) RETURN a;


MATCH (a:Airport), (b:Airport) WHERE a.city='Singapur' AND b.city='Tokyo' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Pekin' AND b.city='Tokyo' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Tokyo' AND b.city='Hong-kong' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Seul' AND b.city='Frankfurt' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Seul' AND b.city='Pekin' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Hong-kong' AND b.city='Pekin' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Shanghai' AND b.city='Hong-kong' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Seul' AND b.city='Singapur' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);

MATCH (a:Airport), (b:Airport) WHERE a.city='Paris' AND b.city='Berlin' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Warsaw' AND b.city='Cracow' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Cracow' AND b.city='Warsow' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Warsaw' AND b.city='Moscow' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Frankfurt' AND b.city='Moscow' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Frankfurt' AND b.city='Berlin' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='London' AND b.city='Manchester' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='London' AND b.city='Warsaw' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Paris' AND b.city='London' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Rotterdam' AND b.city='Rome' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Rome' AND b.city='Milan' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Milan' AND b.city='Athens' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Rotterdam' AND b.city='Berlin' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Paris' AND b.city='Athens' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Madrid' AND b.city='Paris' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);

MATCH (a:Airport), (b:Airport) WHERE a.city='Atlanta' AND b.city='Chicago' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Chicago' AND b.city='Dallas' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Dallas' AND b.city='Atlanta' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Rio de Janerio' AND b.city='Chicago' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Bogota' AND b.city='Rio de Janerio' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Mexico City' AND b.city='Dallas' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Chicago' AND b.city='Cracow' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);
MATCH (a:Airport), (b:Airport) WHERE a.city='Berlin' AND b.city='Bogota' CREATE (a)-[c:CONNECTION {distance: 500}]->(b);


MATCH (a:Airport) RETURN a.country as country, a.city as city, ID(a) as id;
MATCH (a:Airport) WHERE id(a)=31 SET a.country= 'd', a.city= 'd' return a;
MATCH (a:Airport) WHERE id(a)=31 DELETE a;
MATCH (a:Airport), (b:Airport) WHERE ID(a)=6 AND ID(b)=21 CREATE (a)-[c:CONNECTION {distance: 12}]->(b) RETURN type(c), c.distance;
MATCH (a:Airport)-[r]-(b) RETURN type(r), a, b
