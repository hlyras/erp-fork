const db = require('../../../config/connection');
const lib = require("jarmlib");

const Production = function(){
	this.id;
	this.datetime;
	this.estimated_shipment_datetime;
	this.shipment_datetime;
	this.shipment_user_id;
	this.seamstress_id;
	this.product_id;
	this.amount;
	this.status;
	this.user_id;

	this.create = () => {
		if(!this.code) { return { err: "É necessário incluir o código do produto" } };
		if(!this.name) { return { err: "É necessário incluir o nome do produto" } };
		if(!this.color) { return { err: "É necessário incluir a cor do produto." } };
		if(!this.size) { return { err: "É necessário incluir o tamanho do produto." } };
		if(!this.weight) { return { err: "É necessário incluir o peso do produto." } };
		if(!this.brand) { return { err: "É necessário incluir a marca do produto." } };
		if(!this.status) { return { err: "É necessário incluir o status do produto." } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.product');

		return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "O id do produto é inválido." }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.product', 'id');

    return db(query);
	};
};

module.exports = Production;