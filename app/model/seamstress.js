const db = require('../../config/connection');

const Seamstress = function(){
	this.id;
	this.name;
	this.engagement;
};

Seamstress.internal = {
	save: async (seamstress) => {
		let query = "INSERT INTO cms_wt_erp.seamstress (name, engagement) VALUES ('"+seamstress.name+"', 'internal');";
		return db(query);
	}
};

Seamstress.external = {
	save: async (seamstress) => {
		let query = "INSERT INTO cms_wt_erp.seamstress (name, engagement) VALUES ('"+seamstress.name+"', 'external');";
		return db(query);
	}
};

module.exports = Seamstress;