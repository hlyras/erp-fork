const db = require('../../../config/connection');
const Product = require('./main');

Product.color = function(){
	this.id = 0;
	this.name = "";
	this.shortcut = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.product_color (name, shortcut) VALUES ('"+this.name+"','"+this.shortcut+"');";
		return db(query);
	}
};

Product.color.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.product_color;";
	return db(query);
};

module.exports = Product.color;