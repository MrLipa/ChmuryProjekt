const neo4j = require('neo4j-driver');

require('dotenv').config()
const { NEO4J_DATABASE_URL, NEO4J_DB_USERNAME, NEO4J_DB_PASSWORD} = process.env
const driver = neo4j.driver(NEO4J_DATABASE_URL, neo4j.auth.basic(NEO4J_DB_USERNAME, NEO4J_DB_PASSWORD));
const session = driver.session();

const findAirports = async(req, res) =>{
    try {
        const {id_airport, country, city} = req.body;
        if (id_airport)
            Todo = await session.run(`MATCH (a:Airport) WHERE ID(a)=${id_airport} RETURN a.country AS country, a.city AS city, ID(a) as id`);
        else if (country)
            Todo = await session.run(`MATCH (a:Airport) WHERE a.country='${country}' RETURN a.country AS country, a.city AS city, ID(a) as id`);
        else
            Todo = await session.run(`MATCH (a:Airport) WHERE a.city='${city}' RETURN a.country AS country, a.city AS city, ID(a) as id`);
        const result = Todo.records.map(record=>[record.get('id').getLowBits(),record.get('country'),record.get('city')])
        if(result)
        {
          res.json(result);
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}
const getAllAirports = async(req, res) =>{
    try {
        const Todo = await session.run(`MATCH (a:Airport) RETURN a.country AS country, a.city AS city, ID(a) as id`)
        const result = Todo.records.map(record=>[record.get('id').getLowBits(),record.get('country'),record.get('city')])
        if(result)
        {
          res.json(result);
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}
const createNewAirport = async(req, res) =>{
    try {
        const {country, city} = req.body;
        await session.run(`CREATE( a:Airport {country: '${country}', city: '${city}' } ) RETURN a`)
        const result = await getAllAirports(req, res)
        if(result)
        {
          res.json(result);
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}
const updateAirport = async(req, res) =>{
    try {
        const id_airport = req.params.id;
        const {country, city} = req.body;
        await session.run(`MATCH (a:Airport) WHERE id(a)=${id_airport} SET a.country= '${country}', a.city= '${city}' RETURN a`)
        const result = await getAllAirports(req, res)
        if(result)
        {
          res.json(result);
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}
const deleteAirport = async(req, res) =>{
    try {
        const id_airport = req.params.id;
        await session.run(`MATCH (a:Airport) WHERE id(a)=${id_airport} DETACH DELETE a`)
        const result = await getAllAirports(req, res)
        if(result)
        {
          res.json(result);
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}
const findConnections = async(req, res) =>{
    try {
        const {id_airport_A,id_airport_B} = req.body;
        if (id_airport)
            Todo = await session.run(`MATCH (a:Airport)-[r:CONNECTION]-(b:Airport) WHERE id(a)=${id_airport_A} RETURN a, b`);
        else if (country)
            Todo = await session.run(`MATCH (a:Airport)-[r:CONNECTION]-(b:Airport) WHERE id(b)=${id_airport_B} RETURN a, b`);
        if(Todo)
        {
          res.json('Create new connection');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}
const getAllConnections = async(req, res) =>{
    try {
        const {id_airport_A,id_airport_B,distance} = req.body;
        const Todo = await session.run(`MATCH (a:Airport)-[r:CONNECTION]-(b:Airport) RETURN a, b`)
        if(Todo)
        {
          res.json('Create new connection');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}
const createNewConnection = async(req, res) =>{
    try {
        const {id_airport_A,id_airport_B,distance} = req.body;
        const Todo = await session.run(`MATCH (a:Airport), (b:Airport) WHERE ID(a)=${id_airport_A}  AND ID(b)=${id_airport_B}  CREATE (a)-[c:CONNECTION {distance: ${distance} }]->(b) RETURN type(c), c.distance`)
        if(Todo)
        {
          res.json('Create new connection');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}
const findPath = async(req, res) =>{
    try {
        const {id_airport_A,id_airport_B,distance} = req.body;
        const Todo = await session.run(`MATCH (a:Airport), (b:Airport) WHERE ID(a)=${id_airport_A}  AND ID(b)=${id_airport_B}  CREATE (a)-[c:CONNECTION {distance: ${distance} }]->(b) RETURN type(c), c.distance`)
        if(Todo)
        {
          res.json('Create new connection');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}


module.exports = {
    findAirports,
    getAllAirports,
    createNewAirport,
    updateAirport,
    deleteAirport,
    findConnections,
    getAllConnections,
    createNewConnection,
    findPath
}
   