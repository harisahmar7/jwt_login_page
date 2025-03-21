const { Client } = require('pg');

//Initialize Database Connection
const pool = new Client({
    host : 'localhost',
    database : 'postgres',
    user : 'postgres',
    password : 'admin',
    port: 5432
})

pool.connect().then(()=>{
    console.log("Database Connected Successfully");
}).catch(err=>{
    console.error(err);
})

module.exports = pool;