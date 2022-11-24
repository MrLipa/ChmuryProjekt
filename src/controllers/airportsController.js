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


module.exports = {
    findAirports,
    getAllAirports,
    createNewAirport,
    updateAirport,
    deleteAirport,
}
   