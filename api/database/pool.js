const { Pool } = require("pg");

// Configuration via les variables d'environnement PG* (PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT)
const pool = new Pool();

module.exports = { pool };