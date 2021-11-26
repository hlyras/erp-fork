const db = require('../../../config/connection');
const Product = require('./main');

// CREATE TABLE `product_feedstock` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `product_id` int NOT NULL,
//   `feedstock_id` int NOT NULL,
//   `amount` int unsigned NOT NULL,
//   `measure` decimal(15,2) unsigned NOT NULL DEFAULT '1.00',
//   `category_id` int DEFAULT NULL,
//   `obs` varchar(15) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `id_UNIQUE` (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=667 DEFAULT CHARSET=latin1;

Product.feedstock = function(){
	this.id = 0;
	this.product_id = 0;
	this.feedstock_id = 0;
	this.amount = 0;
	this.measure = 0.00;
	this.category_id = 0;
	this.obs = "";
};

Product.feedstock.add = async (product_feedstock) => {
	let query = "INSERT INTO cms_wt_erp.product_feedstock (product_id, feedstock_id, amount, measure, category_id) VALUES ('"
		+product_feedstock.product_id+"', '"
		+product_feedstock.feedstock_id+"', '"
		+product_feedstock.amount+"', '"
		+product_feedstock.measure+"', '"
		+product_feedstock.category_id+"');";
	return db(query);
};

Product.feedstock.update = async (product_feedstock) => {
	let query = "UPDATE cms_wt_erp.product_feedstock SET amount='"+product_feedstock.amount+"', measure='"+product_feedstock.measure+"', category_id='"+product_feedstock.category_id+"' WHERE id='"+product_feedstock.id+"';";
	return db(query);
};

Product.feedstock.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE id='"+id+"';";
	return db(query);
};

Product.feedstock.findByFeedstockId = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE feedstock_id='"+id+"';";
	return db(query);
};

Product.feedstock.list = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE product_id='"+id+"';";
	return db(query);
};

Product.feedstock.remove = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE id='"+id+"';";
	return db(query);
};

Product.feedstock.removeByProductId = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE product_id='"+id+"';";
	return db(query);
};

Product.feedstock.removeByFeedstockId = async (id) => {
	let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE feedstock_id='"+id+"';";
	return db(query);
};

Product.feedstock.category = {
	save: async (product_feedstock_category) => {
		let query = "INSERT INTO cms_wt_erp.product_feedstock_category (product_id, name) VALUES ('"
			+product_feedstock_category.product_id+"', '"
			+product_feedstock_category.name+"');";
		return db(query);		
	},
	list: async (product_id) => {
		let query = "SELECT * FROM cms_wt_erp.product_feedstock_category WHERE product_id='"+product_id+"';";
		return db(query);
	},
	update: async (product_feedstock_category) => {
		let query = "UPDATE cms_wt_erp.product_feedstock_category SET name='"+product_feedstock_category.name+"' WHERE id='"+product_feedstock_category.id+"';";
		return db(query);
	}
};

module.exports = Product.feedstock;