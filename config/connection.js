const mysql = require('mysql');
const dbconfig = require('./database');

// environments: development | production
const pool  = mysql.createPool({
	connectionLimit : 20,
	host : dbconfig.production.database.host,
	port : dbconfig.production.database.port,
	user : dbconfig.production.database.user,
	password : dbconfig.production.database.password
});

const db = async (query) => {
	return new Promise(async (resolve, reject) => {
		pool.getConnection((err, connection) => {
		    connection.query(query, (err, rows) => {
	        connection.release();
	        if(!err){
	        	resolve(rows);
	        } else {
	        	reject(err);
	        };
		    });
		});
	});
};

module.exports = db;