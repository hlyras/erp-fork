const db = require('../../../config/connection');
const lib = require("jarmlib");

const Shipment = function(){
	this.id;
	this.production_id;
	this.datetime;
	this.user_id;
	this.user_id;

	this.create = () => {
		if(!this.id) { return { err: "É necessário incluir o código do produto" } };
		if(!this.production_id) { return { err: "É necessário incluir o nome do produto" } };
		if(!this.datetime) { return { err: "É necessário incluir a cor do produto." } };
		if(!this.user_id) { return { err: "É necessário incluir o status do produto." } };
		if(!this.user_id) { return { err: "É necessário incluir o status do produto." } };

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

module.exports = Shipment;

// Custo Controlável
//01 R$2774.14
//02 R$5407.66
//03 R$4798.79
//04 R$5036.78
//05 R$4926.99 + 337.42
//06 R$4811.57 + 278.38(2446)
//07 R$2774.14
//08 R$2774.14