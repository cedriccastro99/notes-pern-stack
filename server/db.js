const Pool = require("pg").Pool;

const pool = new Pool({
    user : "postgres",
    password : "cedriccastro",
    host : "localhost",
    port : 5432,
    database : "pern_notes"
})

module.exports = pool;