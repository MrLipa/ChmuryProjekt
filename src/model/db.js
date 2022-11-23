const Pool = require("pg").Pool;
require('dotenv').config()
const { ELEPHANT_DB_USERNAME, ELEPHANT_DB_PASSWORD, ELEPHANT_DB_HOST, ELEPHANT_DB_PORT, ELEPHANT_DB_DATABASE } = process.env

const pool = new Pool({
  user: ELEPHANT_DB_USERNAME,
  password: ELEPHANT_DB_PASSWORD,
  host: ELEPHANT_DB_HOST,
  port: ELEPHANT_DB_PORT,
  database: ELEPHANT_DB_DATABASE
});

module.exports = pool;