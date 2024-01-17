const db = require('../../../config/connection');
const lib = require("jarmlib");

const Production = function () {
	this.id;
	this.datetime; // Hora do cadastro da produção
	this.shipment_datetime; // Data da produção Interna / Data estimada para envio
	this.location; // Interna | Externa
	this.seamstress_id;
	this.status;
	this.user_id;

	this.preparation_deadline; // Data limite para preparação
	this.preparation_datetime;
	this.preparation_volume;
	this.preparation_user_id;

	this.service_order; // Data estimada para envio

	this.create = () => {
		if (!this.datetime) { return { err: "É necessário registrar o horário da solicitação." } };
		if (!this.shipment_datetime) { return { err: "É necessário registrar o horário da solicitação." } };
		if (!this.location) { return { err: "É necessário registrar o local de produção." } };
		if (!this.seamstress_id) { return { err: "É necessário inserir o colaborador ou facção." } };
		if (!this.preparation_deadline) { return { err: "É necessário registrar a data limite para a preparação." } };
		if (!this.status) { return { err: "É necessário cadastrar o status da produção." } };
		if (!this.user_id) { return { err: "É necessário registrar o usuário." } };

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.save(obj, 'cms_wt_erp.production');

		return db(query, values);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id da produção é inválido." }; }

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.update(obj, 'cms_wt_erp.production', 'id');

		return db(query, values);
	};
};

Production.findById = async (id) => {
	let query = `SELECT * FROM cms_wt_erp.production WHERE id = ?`;
	return db(query, [id]);
};

Production.filter = (props, inners, period, params, strict_params, order_params, limit) => {
	let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.production production")
		.inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).limit(limit).build();
	return db(query, values);
};

module.exports = Production;