const db = require('../../../config/connection');
const lib = require("jarmlib");

const Prospect = function () {
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
		if (!this.brand) { return { err: "É necessário incluir o nome da empresa" } };
		if (!this.state) { return { err: "É necessário incluir o estado da empresa" } };
		if (!this.phone) { return { err: "É necessário incluir o telefone da empresa" } };

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.save(obj, 'cms_wt_erp.customer_prospect');

		return db(query, values);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id do prospect é inválido" }; }

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.update(obj, 'cms_wt_erp.customer_prospect', 'id');

		return db(query, values);
	};
};

Prospect.update = prospect => {
	let { query, values } = lib.Query.update(prospect, 'cms_wt_erp.customer_prospect', 'id');
	return db(query, values);
};

Prospect.filter = (props, inners, period, params, strictParams, orderParams, limit) => {
	let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.customer_prospect customer_prospect")
		.inners(inners).period(period).params(params).strictParams(strictParams).order(orderParams).limit(limit).build();
	return db(query, values);
};

Prospect.findById = (prospect_id) => {
	let query = `SELECT * FROM cms_wt_erp.customer_prospect WHERE id= ?;`;
	return db(query, [prospect_id]);
};

Prospect.findByIdAndUserId = (prospect_id, user_id) => {
	let query = `SELECT * FROM cms_wt_erp.customer_prospect WHERE id = ? AND user_id = ?;`;
	return db(query, [prospect_id, user_id]);
};

Prospect.mail = function () {
	this.id;
	this.datetime;
	this.prospect_id;
	this.mail_id;
	this.user_id;

	this.save = () => {
		if (!this.datetime) { return { err: "É necessário incluir o horário do envio do e-mail" } };
		if (!this.prospect_id) { return { err: "É necessário incluir o id do cliente" } };
		if (!this.mail_id) { return { err: "É necessário incluir o id do e-mail" } };
		if (!this.user_id) { return { err: "É necessário incluir o id do usuário" } };

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.save(obj, 'cms_wt_erp.customer_prospect_mail');

		return db(query, values);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id do modelo é inválido" }; }

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.update(obj, 'cms_wt_erp.customer_prospect_mail', 'id');

		return db(query, values);
	};
};

Prospect.log = function () {
	this.id;
	this.datetime;
	this.prospect_id;
	this.from;
	this.to;
	this.comment;
	this.user_id;

	this.create = () => {
		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.save(obj, 'cms_wt_erp.customer_prospect_log');

		return db(query, values);
	};
};

Prospect.log.list = (prospect_id) => {
	let query = `SELECT * FROM cms_wt_erp.customer_prospect_log WHERE prospect_id = ?;`;
	return db(query, [prospect_id]);
};

module.exports = Prospect;