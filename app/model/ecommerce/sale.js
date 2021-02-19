const db = require('../../../config/connection');
const lib = require('../../../config/lib');

const Sale = function(){
	this.id;
	this.date;
	this.origin;
	this.code;
	this.customer_id;
	this.customer_name;
	this.sale_datetime;
	this.tracker;
	this.shipment_method;
	this.os;
	this.status;
	this.user_id;
	this.user_name;
};

Sale.save = async sale => {
	let query = "INSERT INTO cms_wt_erp.ecommerce_sale (date, origin, code, customer_user, customer_name, datetime, os, status, tracker, user_id, user_name) VALUES ('"
		+sale.date+"', '"
		+sale.origin+"', '"
		+sale.code+"','"
		+sale.customer_user+"','"
		+sale.customer_name+"','"
		+sale.datetime+"','"
		+sale.os+"','"
		+sale.status+"','"
		+sale.tracker+"','"
		+sale.user_id+"','"
		+sale.user_name+"');";
	return db(query);
};

Sale.filter = (periodStart, periodEnd, params, values) => {
	let query = lib.filterByLikeAndByPeriod(periodStart, periodEnd, params, values, "sale_date", "cms_wt_erp", "sale", "id", "DESC");
	return db(query);
};

Sale.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.ecommerce_sale WHERE id='"+id+"';";
	return db(query);
};

Sale.product = {
	save: async (sale_id, product) => {
		let query = "INSERT INTO cms_wt_erp.ecommerce_sale_product (sale_id, product_id, info, amount) VALUES ('"
			+sale_id+"', '"
			+product.id+"','"
			+product.info+"','"
			+product.amount+"');";
		return db(query);	
	},
	list: async (sale_id) => {
		let query = "SELECT * FROM cms_wt_erp.ecommerce_sale_product WHERE sale_id='"+sale_id+"';";
		return db(query);		
	}
};

Sale.package = {
	save: async (sale_id, package) => {
		let query = "INSERT INTO cms_wt_erp.ecommerce_sale_package (sale_id, package_id, info, amount) VALUES ('"
			+sale_id+"', '"
			+package.id+"','"
			+package.info+"','"
			+package.amount+"');";
		return db(query);
	},
	list: async (sale_id) => {
		let query = "SELECT * FROM cms_wt_erp.ecommerce_sale_package WHERE sale_id='"+sale_id+"';";
		return db(query);
	},
	product: {
		add: async (sale_id, package_id, product) => {
			let query = "INSERT INTO cms_wt_erp.ecommerce_sale_package_product (sale_id, package_id, product_id, info, amount) VALUES ('"
				+sale_id+"', '"
				+package_id+"','"
				+product.id+"','"
				+product.product_info+"','"
				+product.amount+"');";
			return db(query);
		},
		list: async (sale_id) => {
			let query = "SELECT * FROM cms_wt_erp.ecommerce_sale_package_product WHERE sale_id='"+sale_id+"';";
			return db(query);
		}
	}
};

module.exports = Sale;