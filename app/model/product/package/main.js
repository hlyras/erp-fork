const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Package = function () {
	this.id;
	this.code;
	this.name;
	this.color;
	this.brand;
	this.weight;
	this.status;
	this.image;
	this.announcement;
	this.description;

	this.create = () => {
		if (!this.code) { return { err: "É necessário incluir o código do produto" } };
		if (!this.name) { return { err: "É necessário incluir o nome do produto" } };
		if (!this.color) { return { err: "É necessário incluir a cor do produto." } };
		if (!this.brand) { return { err: "É necessário incluir a marca do produto." } };
		if (!this.weight) { return { err: "É necessário incluir o peso do produto." } };
		if (!this.status) { return { err: "É necessário incluir o status do produto." } };

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.save(obj, 'cms_wt_erp.product_package');

		return db(query, values);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id do produto é inválido." }; }

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.update(obj, 'cms_wt_erp.product_package', 'id');

		return db(query, values);
	};
};

Package.findById = async (id) => {
	let query = `SELECT * FROM cms_wt_erp.product_package WHERE id='${id}';`;
	return db(query);
};

Package.findByCode = async (code) => {
	let query = `SELECT * FROM cms_wt_erp.product_package WHERE code='${code}';`;
	return db(query);
};

Package.filter = ({ props, inners, params, strict_params, order_params }) => {
	let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.product_package package")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build();
	return db(query, values);
};

Package.delete = async (id) => {
	let query = `DELETE FROM cms_wt_erp.product_package WHERE id='${id}';`;
	return db(query);
};

module.exports = Package;