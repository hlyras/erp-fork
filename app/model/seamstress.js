const db = require('../../config/connection');

const Seamstress = function(){
	this.id;
	this.name;
	this.engagement;
};

// Seamstress.save = async () {
// 	let query = "INSERT INTO cms_wt_erp.seamstress (name, engagement) VALUES ('"+seamstress.name+"', '"+seamstress.engagement+"');";
// 	return db(query);
// };

module.exports = Seamstress;