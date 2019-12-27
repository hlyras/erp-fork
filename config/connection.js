const mysql = require('mysql');
const dbconfig = require('./database');

const pool  = mysql.createPool({
	connectionLimit : 10,
	host : dbconfig.connection.host,
	port : dbconfig.connection.port,
	user : dbconfig.connection.user,
	password : dbconfig.connection.password
});

const db = async (query) => {
	return new Promise(async (resolve, reject) => {
		pool.getConnection((err, connection) => {
		    connection.query(query, (err, rows) => {
		        connection.release();
		        if(!err){
		        	resolve(rows)
		        } else {
		        	reject(err);
		        };
		    });
		});
	});
};

module.exports = db;