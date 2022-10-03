const db = require('../../../config/connection');
const Product = require('./main');
const lib = require("jarmlib");

Product.price = {
	save: async (price) => {
		let query = "INSERT INTO cms_wt_erp.product_price (category_id, product_id, price) VALUES ('"
			+ price.category_id + "', '"
			+ price.product_id + "', '"
			+ price.price + "');";
		return db(query);
	},
	update: async (price) => {
		let query = "UPDATE cms_wt_erp.product_price SET price='" + price.price + "' WHERE id='" + price.id + "';";
		return db(query);
	},
	list: async (category_id) => {
		let query = "SELECT * FROM cms_wt_erp.product_price where category_id='" + category_id + "' ORDER BY id ASC;";
		return db(query);
	},
	find: async (price) => {
		let query = "SELECT * FROM cms_wt_erp.product_price where category_id='" + price.category_id + "' AND product_id='" + price.product_id + "' ORDER BY id ASC;";
		return db(query);
	},
	filter: (props, inners, params, strict_params, order_params) => {
		let query = new lib.Query().select().props(props).table("cms_wt_erp.product_price product_price")
			.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
		return db(query);
	},
	delete: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_price WHERE product_id='" + id + "';";
		return db(query);
	},
	deleteAll: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_price WHERE category_id='" + id + "';";
		return db(query);
	},
	category: {
		save: async (category) => {
			let query = "INSERT INTO cms_wt_erp.product_price_category (name) VALUES ('" + category.name + "');";
			return db(query);
		},
		update: async (category) => {
			let query = "UPDATE cms_wt_erp.product_price_category SET name='" + category.name + "' WHERE id='" + category.id + "';";
			return db(query);
		},
		list: async () => {
			let query = "SELECT * FROM cms_wt_erp.product_price_category ORDER BY id ASC;";
			return db(query);
		},
		filter: async (params, order_params) => {
			let query = new lib.Query().select().table("cms_wt_erp.product_price_category price_category")
				.params(params).order(order_params).build().query;
			return db(query);
		},
		findById: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.product_price_category WHERE id='" + id + "';";
			return db(query);
		},
		delete: async (id) => {
			let query = "DELETE FROM cms_wt_erp.product_price_category WHERE id='" + id + "';";
			return db(query);
		}
	}
};

module.exports = Product.price;