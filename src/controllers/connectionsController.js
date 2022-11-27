const neo4j = require('neo4j-driver');

require('dotenv').config()
const { NEO4J_DATABASE_URL, NEO4J_DB_USERNAME, NEO4J_DB_PASSWORD} = process.env
const driver = neo4j.driver(NEO4J_DATABASE_URL, neo4j.auth.basic(NEO4J_DB_USERNAME, NEO4J_DB_PASSWORD));
const session = driver.session();

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
        const Todo = await session.run(`MATCH (a:Airport)-[r:CONNECTION]-(b:Airport) RETURN ID(r) as id, a.country, a.city ,b.country, b.city, r.distance`)
        const result = Todo.records.map(record=>[record.get('id').getLowBits(),record.get('a.country'),record.get('a.city'),record.get('b.country'),record.get('b.city'),record.get('r.distance').getLowBits()])
        if(Todo)
        {
          res.json(result);
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
const findShortestPath = async(req, res) =>{
    try {
        const {city_OUT, city_IN} = req.body;
        const Todo = await session.run(`MATCH (a:Airport { city: '${city_OUT}' })
        MATCH (b:Airport { city: '${city_IN}' })
        CALL apoc.algo.dijkstra(a, b, 'CONNECTION', 'distance') YIELD path, weight
        RETURN path, weight`)
        result = Todo.records[0]._fields[0].segments.map((x)=>{return {"id":x.relationship.identity.low, "country_out": x.start.properties.country, "city_out": x.start.properties.city,"country_in": x.end.properties.country, "city_in": x.end.properties.city, "distance": x.relationship.properties.distance.low}});
        if(Todo)
        {
          res.json(result);
        }
    } catch (err) {
        res.status(400).json('err.message');
    }
}
const findFastestPath = async(req, res) =>{
    try {
        const {city_OUT, city_IN} = req.body;
        const Todo = await session.run(`MATCH (a:Airport { city: '${city_OUT}' })
        MATCH (b:Airport { city: '${city_IN}' })
        MATCH path = shortestPath((a)-[*]-(b))
        RETURN path`)
        result = Todo.records[0]._fields[0].segments.map((x)=>{return {"id":x.relationship.identity.low, "country_out": x.start.properties.country, "city_out": x.start.properties.city,"country_in": x.end.properties.country, "city_in": x.end.properties.city, "distance": x.relationship.properties.distance.low}});
        if(Todo)
        {
          res.json(result);
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {
    findConnections,
    getAllConnections,
    createNewConnection,
    findShortestPath,
    findFastestPath
}
   