const db = require('../../../config/connection');
const lib = require("jarmlib");

const Lead = function(){
	this.id;
	this.datetime;
	this.name;
	this.email;
	this.phone;
	this.status;
	this.user_id;

	this.update = () => {
		if(!this.id) { return { err: "O id do cliente é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.customer_lead', 'id');

		return db(query);
	};
};

Lead.findById = (lead_id) => {
	let query = `SELECT * FROM cms_wt_erp.customer_lead WHERE id='${lead_id}';`;
	return db(query);
};

Lead.filter = (props, inners, period, params, strictParams, orderParams) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.customer_lead customer_lead")
		.inners(inners).period(period).params(params).strictParams(strictParams).order(orderParams).build().query;
	return db(query);
};

Lead.mail = function(){
	this.id;
	this.datetime;
	this.lead_id;
	this.mail_id;
	this.user_id;

	this.save = () => {
		if(!this.datetime) { return { err: "É necessário incluir o horário do envio do e-mail" } };
		if(!this.lead_id) { return { err: "É necessário incluir o id do cliente" } };
		if(!this.mail_id) { return { err: "É necessário incluir o id do e-mail" } };
		if(!this.user_id) { return { err: "É necessário incluir o id do usuário" } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.customer_lead_mail');

		return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "O id do modelo é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.customer_lead_mail', 'id');

    return db(query);
	};
};

module.exports = Lead;