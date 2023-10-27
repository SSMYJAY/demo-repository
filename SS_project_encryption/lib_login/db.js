var mysql = require('mysql2');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'mydb_1019_0109'
});

db.connect();

module.exports = db;