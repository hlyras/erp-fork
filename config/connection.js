const mysql = require('mysql');
const dbconfig = require('./database');

// DB_PRODUCTION_HOST=mysql669.umbler.com
// DB_PRODUCTION_PORT=41890
// DB_PRODUCTION_DATABASE=cms_wt_erp
// DB_PRODUCTION_USER=hlyras
// DB_PRODUCTION_PASSWORD=root1234

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
		        	resolve(rows)
		        } else {
		        	console.log(err);
		        	reject(err);
		        };
		    });
		});
	});
};

module.exports = db;