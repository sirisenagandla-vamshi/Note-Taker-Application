const { Client } = require('pg');
const dotenv = require("dotenv");
dotenv.config();

const client = new Client(process.env.PSQL_URL);
module.exports = client;  