//dependencies
const mysql = require('mysql2');

//create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'time_tracking_app',
});

module.exports = pool;
