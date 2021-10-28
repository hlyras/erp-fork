const db = require('../../../config/connection');
const lib = require("jarmlib");

const Feedstock = require('./main');

Feedstock.purchase = function() {
	this.id = 0;
	this.datetime = "";
	this.supplier_id = "";
	this.cost = "";
	this.status = "";
	this.user_id = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.feedstock_purchase (datetime, supplier_id, cost, status, user_id) VALUES ('"+
			this.datetime+"','"+
			this.supplier_id+"','"+
			this.cost+"','"+
			this.status+"','"+
			this.user_id+"');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.feedstock_purchase SET datetime='"+this.datetime
			+"', supplier_id='"+this.supplier_id
			+"', cost='"+this.cost
			+"', status='"+this.status
			+"', user_id='"+this.user_id+"' WHERE id='"+this.id+"';";
		return db(query);
	};
};

Feedstock.purchase.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_purchase purchase")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.purchase.delete = (purchase_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_purchase WHERE id='"+purchase_id+"';";
	return db(query);
};

// Feedstock.supplier.storage = {};
// 
// Feedstock.supplier.storage.add = (insert) => {
// 	let query = "INSERT INTO cms_wt_erp.feedstock_supplier_storage (supplier_id, feedstock_id, price) VALUES ('"+
// 		insert.supplier_id+"','"+
// 		insert.feedstock_id+"','"+
// 		insert.price+"');";
// 	return db(query);
// };
// 
// Feedstock.supplier.storage.update = (feedstock) => {
// 	let query = "UPDATE cms_wt_erp.feedstock_supplier_storage SET price='"+feedstock.price+"' WHERE id='"+feedstock.id+"';";
// 	return db(query);
// };
// 
// Feedstock.supplier.storage.remove = (id) => {
// 	let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE id='"+id+"';";
// 	return db(query);
// };
// 
// Feedstock.supplier.storage.filter = (props, inners, params, strict_params, order_params) => {
// 	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_supplier_storage supplier_storage")
// 		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
// 	return db(query);
// };
// 
// Feedstock.supplier.storage.deleteByFeedstockId = (feedstock_id) => {
// 	let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE feedstock_id='"+feedstock_id+"';";
// 	return db(query);
// };
// 
// Feedstock.supplier.storage.deleteBySupplierId = (supplier_id) => {
// 	let query = "DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE supplier_id='"+supplier_id+"';";
// 	return db(query);
// };

module.exports = Feedstock.purchase;