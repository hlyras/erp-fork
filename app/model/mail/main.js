const db = require('../../../config/connection');
const lib = require("jarmlib");

const Mail = function () {
	this.id;
	this.datetime;
	this.category;
	this.title;
	this.description;
	this.subject;
	this.text;
	this.content;
	this.user_id;

	this.save = () => {
		if (!this.datetime) { return { err: "É necessário incluir o horário de criação do modelo" } };
		if (!this.title) { return { err: "É necessário incluir o título do modelo" } };
		if (!this.description) { return { err: "É necessário incluir a descrição do modelo" } };
		if (!this.subject) { return { err: "É necessário incluir o Subject do modelo" } };
		if (!this.text) { return { err: "É necessário incluir o texto do modelo" } };
		if (!this.content) { return { err: "É necessário incluir o conteúdo do modelo" } };
		if (!this.user_id) { return { err: "É necessário incluir o conteúdo do modelo" } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.mail');

		return db(query);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id do modelo é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.mail', 'id');

		return db(query);
	};
};

Mail.filter = (props, inners, params, strictParams, orderParams) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.mail mail")
		.inners(inners).params(params).strictParams(strictParams).order(orderParams).build().query;
	return db(query);
};

Mail.findById = (model_id) => {
	let query = `SELECT * FROM cms_wt_erp.mail WHERE id='${model_id}';`;
	return db(query);
};

Mail.delete = async (model_id) => {
	let query = `DELETE FROM cms_wt_erp.mail WHERE id='${model_id}';`;
	return db(query);
};

module.exports = Mail;