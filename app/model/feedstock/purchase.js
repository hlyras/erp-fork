const db = require('../../../config/connection');
const lib = require("jarmlib");

const Feedstock = require('./main');

Feedstock.purchase = function () {
	this.id;
	this.date;
	this.status;
	this.supplier_id;
	this.payment_method;
	this.total_value;
	this.user_id;
	this.confirmation_user_id;
	this.confirmation_date;
	this.receiver_user_id;
	this.receiver_date;

	this.save = () => {
		if (!this.date) { return { err: "A data do pedido é inválida." } };
		if (!this.status) { return { err: "É necessário incluir a unidade de medida." } };
		if (!this.supplier_id) { return { err: "É necessário informar o fornecedor." } };
		if (!this.user_id) { return { err: "É necessário informar o principal fornecedor." } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.feedstock_purchase');

		return db(query);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id da compra é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.feedstock_purchase', 'id');

		return db(query);
	};
};

Feedstock.purchase.filter = (props, inners, period, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_purchase purchase")
		.inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.purchase.updateStatus = (purchase_id, status) => {
	let query = "UPDATE cms_wt_erp.feedstock_purchase SET status='" + status + "' WHERE id='" + purchase_id + "';";
	return db(query);
};

Feedstock.purchase.delete = (purchase_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_purchase WHERE id='" + purchase_id + "';";
	return db(query);
};

Feedstock.purchase.feedstock = function () {
	this.id = 0;
	this.purchase_id = 0;
	this.feedstock_id = 0;
	this.price = 0;
	this.amount = 0;

	this.save = () => {
		if (!this.purchase_id) { return { err: "A compra é inválida." } };
		if (!this.feedstock_id) { return { err: "É necessário informar a matéria-prima." } };
		if (!this.price) { return { err: "É necessário informar o preço." } };
		if (!this.amount) { return { err: "É necessário informar a quantidade." } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.feedstock_purchase_feedstock');

		return db(query);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id da compra é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.feedstock_purchase_feedstock', 'id');

		return db(query);
	};
};

Feedstock.purchase.feedstock.filter = (props, inners, period, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_purchase_feedstock purchase_feedstock")
		.inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.purchase.feedstock.remove = async (feedstock) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_purchase_feedstock WHERE purchase_id='" + feedstock.purchase_id + "' AND feedstock_id='" + feedstock.feedstock_id + "';";
	return db(query);
};

Feedstock.purchase.feedstock.deleteByPurchaseId = async (purchase_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock_purchase_feedstock WHERE purchase_id='" + purchase_id + "';";
	return db(query);
};

Feedstock.purchase.order = function () {
	this.id;
	this.datetime;
	this.status;
	this.purchase_id;
	this.feedstock_id;
	this.amount;
	this.purchase_id;

	this.create = () => {
		if (!this.datetime) { return { err: "É necessário incluir o código da matéria-prima." } };
		if (!this.feedstock_id) { return { err: "É necessário incluir o código da matéria-prima." } };
		if (!this.amount) { return { err: "É necessário incluir o nome da matéria-prima." } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.feedstock_purchase_order');

		return db(query);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id do insumo é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.feedstock_purchase_order', 'id');

		return db(query);
	};
};

Feedstock.purchase.order.filter = (props, inners, period, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_purchase_order purchase_order")
		.inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.purchase.order.delete = async (id) => {
	let query = `DELETE FROM cms_wt_erp.feedstock_purchase_order WHERE id='${id}';`;
	return db(query);
};

module.exports = Feedstock.purchase;