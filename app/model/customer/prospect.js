const db = require('../../../config/connection');
const lib = require("jarmlib");

const Prospect = function(){
	this.id;
	this.datetime;
	this.brand;
	this.state;
	this.phone;
	this.social_media;
	this.manager;
	this.email;
	this.cellphone;
	this.product_approach;

	this.save = () => {
		if(!this.brand) { return { err: "É necessário incluir o nome da empresa" } };
		if(!this.state) { return { err: "É necessário incluir o estado da empresa" } };
		if(!this.phone) { return { err: "É necessário incluir o telefone da empresa" } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.customer_prospect');

		return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "O id do modelo é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.customer_prospect', 'id');

    return db(query);
	};
};

Prospect.update = prospect => {
	let query = lib.Query.update(prospect, 'cms_wt_erp.customer_prospect', 'id');
	return db(query);
};

Prospect.filter = (props, inners, period, params, strictParams, orderParams, limit) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.customer_prospect customer_prospect")
	.inners(inners).period(period).params(params).strictParams(strictParams).order(orderParams).limit(limit).build().query;
	return db(query);
};

Prospect.findById = (prospect_id) => {
	let query = "SELECT * FROM cms_wt_erp.customer_prospect WHERE id="+prospect_id+";";
	return db(query);
};

Prospect.findByIdAndUserId = (prospect_id, user_id) => {
	let query = "SELECT * FROM cms_wt_erp.customer_prospect WHERE id="+prospect_id+" AND user_id="+user_id+";";
	return db(query);
};

Prospect.mail = function(){
	this.id;
	this.datetime;
	this.prospect_id;
	this.mail_id;
	this.user_id;

	this.save = () => {
		if(!this.datetime) { return { err: "É necessário incluir o horário do envio do e-mail" } };
		if(!this.prospect_id) { return { err: "É necessário incluir o id do cliente" } };
		if(!this.mail_id) { return { err: "É necessário incluir o id do e-mail" } };
		if(!this.user_id) { return { err: "É necessário incluir o id do usuário" } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.customer_prospect_mail');

		return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "O id do modelo é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.customer_prospect_mail', 'id');

    return db(query);
	};
};

Prospect.log = function() {
	this.id;
	this.datetime;
	this.prospect_id;
	this.from;
	this.to;
	this.comment;
	this.user_id;

	this.save = () => {
		let obj = lib.convertTo.object(this);

		let query = lib.Query.save(obj, 'cms_wt_erp.customer_prospect_log');
		return db(query);
	};
};

Prospect.log.list = (prospect_id) => {
	let query = "SELECT * FROM cms_wt_erp.customer_prospect_log WHERE prospect_id="+prospect_id+";";
	return db(query);
};

// Prospect.mailer = {};

// Prospect.mailer.filter = (props, inners, period, params, strictParams, orderParams, limit) => {
// 	let query = new lib.Query().select().props(props).table("cms_wt_erp.customer_prospect customer_prospect")
// 	.inners(inners).period(period).params(params).strictParams(strictParams).order(orderParams).limit(limit).build().query;
// 	return db(query);
// };

module.exports = Prospect;