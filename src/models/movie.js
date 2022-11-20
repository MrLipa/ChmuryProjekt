const neo4j = require('neo4j-driver');

require('dotenv').config()
const { NEO4J_DATABASE_URL, DB_USERNAME, DB_PASSWORD} = process.env
const driver = neo4j.driver(NEO4J_DATABASE_URL, neo4j.auth.basic(DB_USERNAME, DB_PASSWORD));
const session = driver.session();

const findAll = async () =>{
    const result = await session.run(`MATCH (n:Movie) RETURN n`)
    return result.records.map(record=>[record._fields[0].properties.title,record._fields[0].properties.year])
}

const findById = async (title) =>{
    const result = await session.run(`MATCH (n:Movie {title : '${title}'} ) return n limit 1`)
    return result.records[0].get('n').properties
}
const create = async (movie) =>{
    await session.run(`CREATE( n:Movie {title: '${movie.title}', year: '${movie.year}' } ) RETURN n`)
    return await findAll()
}
const findByIdAndUpdate = async (title, movie) =>{
    const result = await session.run(`MATCH (n:Movie {title : '${title}'}) SET n.title= '${movie.title}', n.year= '${movie.year}' return n`)
    return await findAll()
}
const findByIdAndDelete = async (title) =>{
    await session.run(`MATCH (n:Movie {title : '${title}'}) DELETE n`)
    return await findAll()
}

module.exports = {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete
}
   