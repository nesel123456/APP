const mysql = require('mysql2');

const pool = mysql.createPool({
	    host: '172.30.109.66',
	    user: 'bener',      
	    password: 'Nesel_Nesel123',
	    database: 'database_for_myapi', 
	    waitForConnections: true,
	    connectionLimit: 10,
	    queueLimit: 0
});

module.exports = pool.promise();

