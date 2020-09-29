const db = require('../../config/connection');
const lib = require('../../config/lib');

const Production = function(){
	this.id;
	this.date;
	this.full_date;
	this.storage_id;
	this.status;
	this.user;
};

Production.save = async (production) => {
	let query = "INSERT INTO cms_wt_erp.product_production (date, full_date, storage_id, user) VALUES ('"
		+production.date+"', '"
		+production.full_date+"', '"
		+production.storage_id+"', '"
		+production.user+"');";
	return db(query);
};

Production.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_production WHERE id='"+id+"';";
	return db(query);
};

Production.filter = async (periodStart, periodEnd, params, values) => {
	let query = lib.filterByPeriod(periodStart, periodEnd, params, values, "cms_wt_erp", "product_production", "id", "DESC");
	return db(query);
};

Production.findLast = async () => {
	let query = "SELECT * FROM cms_wt_erp.product_production ORDER BY id DESC LIMIT 1;";
	return db(query);
};

Production.confirm = async (option) => {
	let query = "UPDATE cms_wt_erp.product_production SET status='Pedido confirmado', confirmation_user='"+option.user+"' WHERE id='"+option.production_id+"';";
	return db(query);
};

Production.cancel = async (option) => {
	let query = "UPDATE cms_wt_erp.product_production SET status='Pedido cancelado', confirmation_user='"+option.user+"' WHERE id='"+option.production_id+"';";
	return db(query);
};

Production.product = {
	add: async (production_id, product) => {
		let query = "INSERT INTO cms_wt_erp.product_production_product (production_id, product_id, product_info, amount) VALUES ('"
			+production_id+"', '"
			+product.id+"', '"
			+product.code+" "+product.name+" "+product.color+" "+product.size+"', '"
			+product.amount+"');";
		return db(query);
	},
	list: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_production_product WHERE production_id='"+id+"';";
		return db(query);
	},
	remove: async (product_production_id) => {
		let query = "DELETE FROM cms_wt_erp.product_production_product WHERE id='"+product_production_id+"';"
	}
};

Production.feedstock = {
	add: async (production_id, feedstock) => {
		let query = "INSERT INTO cms_wt_erp.product_production_feedstock (production_id, feedstock_id, feedstock_info, feedstock_uom, amount, standard) VALUES ('"
			+production_id+"', '"
			+feedstock.id+"', '"
			+feedstock.code+" "+feedstock.name+" "+feedstock.color+"', '"
			+feedstock.uom+"', '"
			+feedstock.amount+"', '"
			+feedstock.standard+"');";
		return db(query);
	},
	list: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_production_feedstock WHERE production_id='"+id+"';";
		return db(query);
	}
};

module.exports = Production;