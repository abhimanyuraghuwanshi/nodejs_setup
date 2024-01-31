const mysql = require('mysql2');
require('dotenv').config();

try {
    const pool = mysql.createPool({ 
        host: process.env.MYSQLHOST, 
        user: process.env.DBUSER, 
        password: process.env.DBPASSWORD, 
        database: process.env.DATABASE, 
        port: process.env.MYSQLPORT,  
        connectionLimit: 2 
    });

    const promisePool = pool.promise();
    console.log("new connection stablished")

    module.exports = promisePool;

} catch (e) {
    console.log("Error connecting database ... nn", e);
}
