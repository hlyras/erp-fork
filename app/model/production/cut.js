const db = require('../../../config/connection');
const lib = require("jarmlib");

const Cut = function(){
	this.id;
	this.production_id;
	this.cut_datetime;
	this.cut_user_id;
	this.user_id;

	this.create = () => {
		if(!this.id) { return { err: "É necessário incluir o código do produto" } };
		if(!this.production_id) { return { err: "É necessário incluir o nome do produto" } };
		if(!this.cut_datetime) { return { err: "É necessário incluir a cor do produto." } };
		if(!this.cut_user_id) { return { err: "É necessário incluir o status do produto." } };
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

module.exports = Cut;