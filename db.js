const mysql = require('mysql2');

const pool = mysql.createPool({
	    host: '172.30.109.66',
	    user: 'root',      
	    password: 'Nesel_Nesel123',
	    database: 'mydatabase', 
	    waitForConnections: true,
	    connectionLimit: 10,
	    queueLimit: 0
});

module.exports = pool.promise();

