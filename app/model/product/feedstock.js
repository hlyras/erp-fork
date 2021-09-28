const db = require('../../../config/connection');
const Product = require('./main');

Product.feedstock = {
	add: async (product_feedstock) => {
		let query = "INSERT INTO cms_wt_erp.product_feedstock (product_id, feedstock_id, uom, amount, measure, category_id) VALUES ('"
			+product_feedstock.product_id+"', '"
			+product_feedstock.feedstock_id+"', '"
			+product_feedstock.uom+"', '"
			+product_feedstock.amount+"', '"
			+product_feedstock.measure+"', '"
			+product_feedstock.category_id+"');";
		return db(query);
	},
	update: async (product_feedstock) => {
		let query = "UPDATE cms_wt_erp.product_feedstock SET amount='"+product_feedstock.amount+"', measure='"+product_feedstock.measure+"', category_id='"+product_feedstock.category_id+"' WHERE id='"+product_feedstock.id+"';";
		return db(query);
	},
	findById: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE id='"+id+"';";
		return db(query);
	},
	findByFeedstockId: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE feedstock_id='"+id+"';";
		return db(query);
	},
	list: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_feedstock WHERE product_id='"+id+"';";
		return db(query);
	},
	remove: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE id='"+id+"';";
		return db(query);
	},
	removeByProductId: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE product_id='"+id+"';";
		return db(query);
	},
	removeByFeedstockId: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_feedstock WHERE feedstock_id='"+id+"';";
		return db(query);
	},
	category: {
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
	}
};

module.exports = Product.feedstock;