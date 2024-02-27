const db = require('../../../config/connection');
const lib = require("jarmlib");

const Product = function () {
	this.id;
	this.code;
	this.name;
	this.color;
	this.size;
	this.weight;
	this.brand;
	this.image;
	this.video;
	this.status;
	this.description;
	this.announcement;

	this.create = () => {
		console.log(this);

		if (!this.code) { return { err: "É necessário incluir o código do produto" } };
		if (!this.name) { return { err: "É necessário incluir o nome do produto" } };
		if (!this.color) { return { err: "É necessário incluir a cor do produto." } };
		if (!this.size) { return { err: "É necessário incluir o tamanho do produto." } };
		if (!this.weight) { return { err: "É necessário incluir o peso do produto." } };
		if (!this.brand) { return { err: "É necessário incluir a marca do produto." } };
		if (!this.status) { return { err: "É necessário incluir o status do produto." } };

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.save(obj, 'cms_wt_erp.product');

		return db(query, values);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id do produto é inválido." }; }

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.update(obj, 'cms_wt_erp.product', 'id');

		return db(query, values);
	};
};

Product.list = async () => {
	let query = `SELECT * FROM cms_wt_erp.product ORDER BY code ASC;`;
	return db(query);
};

Product.findById = async (id) => {
	let query = `SELECT * FROM cms_wt_erp.product WHERE id='${id}';`;
	return db(query);
};

Product.findByCode = async (code) => {
	let query = `SELECT * FROM cms_wt_erp.product WHERE code='${code}';`;
	return db(query);
};

Product.filter = ({ props, inners, params, strict_params, order_params }) => {
	let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.product")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build();
	return db(query, values);
};

Product.delete = async (id) => {
	let query = `DELETE FROM cms_wt_erp.product WHERE id='${id}';`;
	return db(query);
};

module.exports = Product;