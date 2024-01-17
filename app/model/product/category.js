const db = require('../../../config/connection');
const Product = require('./main');

Product.category = function () {
	this.id;
	this.name;
	this.shortcut;

	this.save = () => {
		let query = "INSERT INTO backup.product_category (name, shortcut) VALUES ('" + this.name + "','" + this.shortcut + "');";
		return db(query);
	};
};

Product.category.list = () => {
	let query = "SELECT * FROM backup.product_category ORDER BY name ASC;";
	return db(query);
};

module.exports = Product.category;