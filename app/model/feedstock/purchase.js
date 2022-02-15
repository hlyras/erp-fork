const db = require('../../../config/connection');
const lib = require("jarmlib");

const Feedstock = require('./main');

Feedstock.purchase = function() {
	this.id = 0;
	this.date = "";
	this.status = "";
	this.supplier_id = 0;
	this.payment_method = "";
	this.total_value = 0;
	this.user_id = 0;
	this.confirmation_user_id = 0;
	this.confirmation_date = "";
	this.receiver_user_id = 0;
	this.receiver_date = "";

	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.feedstock_purchase (date, status, supplier_id, payment_method, value, shipment_value, discount_value, total_value, user_id) VALUES ('"+
			this.date+"','"+
			this.status+"','"+
			this.supplier_id+"','"+
			this.payment_method+"','"+
			this.value+"','"+
			this.shipment_value+"','"+
			this.discount_value+"','"+
			this.total_value+"','"+
			this.user_id+"');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.feedstock_purchase SET date='"+this.date
			+"', status='"+this.status
			+"', supplier_id='"+this.supplier_id
			+"', payment_method='"+this.payment_method
			+"', value='"+this.value
			+"', shipment_value='"+this.shipment_value
			+"', discount_value='"+this.discount_value
			+"', total_value='"+this.total_value
			+"', user_id='"+this.user_id+"' WHERE id='"+this.id+"';";
		return db(query);
	};
};

Feedstock.purchase.filter = (props, inners, period, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_purchase purchase")
		.inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.purchase.updateStatus = (purchase_id, status) => {
	let query = "UPDATE cms_wt_erp.feedstock_purchase SET status='"+status+"' WHERE id='"+purchase_id+"';";
	return db(query);
};

Feedstock.purchase.delete = (purchase_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_purchase WHERE id='"+purchase_id+"';";
	return db(query);
};

Feedstock.purchase.feedstock = function() {
	this.id = 0;
	this.purchase_id = 0;
	this.feedstock_id = 0;
	this.price = 0;
	this.amount = 0;

	this.add = () => {
		let query = "INSERT INTO cms_wt_erp.feedstock_purchase_feedstock (purchase_id, feedstock_id, price, amount) VALUES ('"+
			this.purchase_id+"','"+
			this.feedstock_id+"','"+
			this.price+"','"+
			this.amount+"');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.feedstock_purchase_feedstock SET price='"+this.price
			+"', amount='"+this.amount+"' WHERE purchase_id='"+this.purchase_id+"' AND feedstock_id='"+this.feedstock_id+"';";
		return db(query);
	};
};

Feedstock.purchase.feedstock.filter = (props, inners, period, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_purchase_feedstock purchase_feedstock")
		.inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.purchase.feedstock.remove = async (feedstock) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_purchase_feedstock WHERE purchase_id='"+feedstock.purchase_id+"' AND feedstock_id='"+feedstock.feedstock_id+"';";
	return db(query);
};

Feedstock.purchase.feedstock.deleteByPurchaseId = async (purchase_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_purchase_feedstock WHERE purchase_id='"+purchase_id+"';";
	return db(query);
};

module.exports = Feedstock.purchase;