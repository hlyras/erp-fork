const db = require('../../../config/connection');
const lib = require('../../../config/lib');

const Sale = function(){
	this.id;
	this.date;
	this.origin;
	this.code;
	this.customer_user;
	this.customer_name;
	this.customer_phone;
	this.sale_datetime;
	this.tracker;
	this.shipment_method;
	this.os;
	this.status;
	this.user_id;
	this.user_name;
};

Sale.save = async sale => {
	let query = "INSERT INTO cms_wt_erp.ecommerce_sale (date, origin, code, customer_user, customer_name, customer_phone, datetime, os, status, tracker, user_id, user_name) VALUES ('"
		+sale.date+"', '"
		+sale.origin+"', '"
		+sale.code+"','"
		+sale.customer_user+"','"
		+sale.customer_name+"','"
		+sale.customer_phone+"','"
		+sale.datetime+"','"
		+sale.os+"','"
		+sale.status+"','"
		+sale.tracker+"','"
		+sale.user_id+"','"
		+sale.user_name+"');";
	return db(query);
};

Sale.update = async (sale) => {
	let query = "UPDATE cms_wt_erp.ecommerce_sale SET date='"+sale.date
		+"', origin='"+sale.origin
		+"', code='"+sale.code
		+"', customer_user='"+sale.customer_user
		+"', customer_name='"+sale.customer_name
		+"', customer_phone='"+sale.customer_phone
		+"', datetime='"+sale.datetime
		+"', os='"+sale.os
		+"', status='"+sale.status
		+"', tracker='"+sale.tracker
		+"', user_id='"+sale.user_id
		+"', user_name='"+sale.user_name+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.updateStatus = async (sale) => {
	let query = "UPDATE cms_wt_erp.ecommerce_sale SET status='"+sale.status
	+"', packing_datetime='"+sale.datetime
	+"', packing_user_id='"+sale.user_id
	+"', packing_user_name='"+sale.user_name+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Sale.filter = (periodStart, periodEnd, params, values) => {
	let query = lib.filterByLikeAndByPeriod(periodStart, periodEnd, params, values, "date", "cms_wt_erp", "ecommerce_sale", "id", "DESC");
	return db(query);
};

Sale.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.ecommerce_sale WHERE id='"+id+"';";
	return db(query);
};

Sale.findByCode = async (code) => {
	let query = "SELECT * FROM cms_wt_erp.ecommerce_sale WHERE code='"+code+"';";
	return db(query);
};

Sale.product = {
	add: async (sale_id, product) => {
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
	},
	update: async (sale_product_id, product) => {
		let query = "UPDATE cms_wt_erp.ecommerce_sale_product SET amount='"+product.amount+"' WHERE id='"+sale_product_id+"';";
		return db(query);
	},
	remove: async (sale_product_id) => {
		let query = "DELETE FROM cms_wt_erp.ecommerce_sale_product WHERE id='"+sale_product_id+"';";
		return db(query);
	},
	removeAll: async (sale_id) => {
		let query = "DELETE FROM cms_wt_erp.ecommerce_sale_product WHERE sale_id='"+sale_id+"';";
		return db(query);
	}
};

Sale.package = {
	add: async (sale_id, package) => {
		let query = "INSERT INTO cms_wt_erp.ecommerce_sale_package (sale_id, package_id, info, setup, amount) VALUES ('"
			+sale_id+"', '"
			+package.package_id+"','"
			+package.info+"','"
			+package.setup+"','"
			+package.amount+"');";
		return db(query);
	},
	update: async (sale_package_id, package) => {
		let query = "UPDATE cms_wt_erp.ecommerce_sale_package SET amount='"+package.amount
			+"', info='"+package.info
			+"', setup='"+package.setup
			+"' WHERE id='"+sale_package_id+"';";
		return db(query);
	},
	list: async (sale_id) => {
		let query = "SELECT * FROM cms_wt_erp.ecommerce_sale_package WHERE sale_id='"+sale_id+"';";
		return db(query);
	},
	remove: async (sale_package_id) => {
		let query = "DELETE FROM cms_wt_erp.ecommerce_sale_package WHERE id='"+sale_package_id+"';";
		return db(query);
	},
	removeAll: async (sale_id) => {
		let query = "DELETE FROM cms_wt_erp.ecommerce_sale_package WHERE sale_id='"+sale_id+"';";
		return db(query);
	},
	product: {
		add: async (sale_id, package_id, product) => {
			let query = "INSERT INTO cms_wt_erp.ecommerce_sale_package_product (sale_id, package_id, product_id, product_info, amount) VALUES ('"
				+sale_id+"', '"
				+package_id+"','"
				+product.product_id+"','"
				+product.product_info+"','"
				+product.amount+"');";
			return db(query);
		},
		list: async (sale_id, package_id) => {
			let query = "SELECT * FROM cms_wt_erp.ecommerce_sale_package_product WHERE sale_id='"+sale_id+"' AND package_id='"+package_id+"';";
			return db(query);
		},
		update: async (package_product_id, product) => {
			let query = "UPDATE cms_wt_erp.ecommerce_sale_package_product SET amount='"+product.amount+"' WHERE id='"+package_product_id+"';";
			return db(query);
		},
		remove: async (package_product_id) => {
			let query = "DELETE FROM cms_wt_erp.ecommerce_sale_package_product WHERE id='"+package_product_id+"';";
			return db(query);
		},
		removeAll: async (sale_id, package_id) => {
			let query = "DELETE FROM cms_wt_erp.ecommerce_sale_package_product WHERE sale_id='"+sale_id+"' AND package_id='"+package_id+"';";
			return db(query);
		},
		clear: async (sale_id) => {
			let query = "DELETE FROM cms_wt_erp.ecommerce_sale_package_product WHERE sale_id='"+sale_id+"';";
			return db(query);
		}
	}
};

module.exports = Sale;