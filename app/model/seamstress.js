const db = require('../../config/connection');

const Seamstress = function(){
	this.id;
	this.name;
};

Seamstress.save = async (seamstress) => {
	let query = "INSERT INTO cms_wt_erp.seamstress (name) VALUES ('"+seamstress.name+"');";
	return db(query);
};

Seamstress.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.seamstress ORDER BY name ASC;";
	return db(query);
};

Seamstress.findByName = async (name) => {
	let query = "SELECT * FROM cms_wt_erp.seamstress WHERE name like '%"+name+"%' ORDER BY name ASC;";
	return db(query);
};

Seamstress.remove = async (id) => {
	let query = "DELETE * FROM cms_wt_erp.seamstress WHERE "+id+";";
	return db(query);
};

module.exports = Seamstress;