const db = require('../../../config/connection');
const Product = require('./main');
const lib = require("jarmlib");

Product.catalog = function() {
	this.id = 0;
	this.name = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.feedstock_supplier (name) VALUES ('"+this.name+"');";
		return db(query);
	};
}

module.exports = Product.catalog;