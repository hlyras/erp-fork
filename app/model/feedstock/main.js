const db = require('../../../config/connection');
const lib = require("jarmlib");

const Feedstock = function () {
	this.id;
	this.code;
	this.name;
	this.color_id;
	this.unit;
	this.uom;

	this.save = () => {
		if (!this.code) { return { err: "É necessário incluir o código da matéria-prima." } };
		if (!this.name) { return { err: "É necessário incluir o nome da matéria-prima." } };
		if (!this.color_id) { return { err: "É necessário incluir a cor da matéria-prima." } };
		if (!this.unit) { return { err: "É necessário incluir a medida padrão do pacote." } };
		if (!this.uom) { return { err: "É necessário incluir a unidade de medida." } };
		if (!this.supplier_id) { return { err: "É necessário informar o principal fornecedor." } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.feedstock');

		return db(query);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id do modelo é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.feedstock', 'id');

		return db(query);
	};
};

Feedstock.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.findById = id => {
	let query = "SELECT * FROM cms_wt_erp.feedstock WHERE id='" + id + "';";
	return db(query);
};

Feedstock.findByCode = code => {
	let query = "SELECT * FROM cms_wt_erp.feedstock WHERE code='" + code + "';";
	return db(query);
};

Feedstock.delete = (feedstock_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock WHERE id='" + feedstock_id + "';";
	return db(query);
};

module.exports = Feedstock;