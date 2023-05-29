const lib = require("jarmlib");

const User = require('../../../model/user');
const userController = require('./../../user');

const Product = require('../../../model/product/main');
Product.color = require('../../../model/product/color');

const datasheetController = {};

datasheetController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	try {
		res.render('product/datasheet/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

datasheetController.cost = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};

	try {
		let productColors = Product.color.list();
		res.render('product/datasheet/cost/index', { user: req.user, productColors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

datasheetController.feedstock = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
	};

	let props = [
		"product_feedstock.*",
		"supplier_feedstock.price",
		"feedstock.name", "feedstock.code", "feedstock.unit", "feedstock.uom", "feedstock.supplier_id",
		"color.name color_name",
		"supplier.name supplier_name", "supplier.brand supplier_brand",
	];

	let inners = [
		["cms_wt_erp.feedstock", "product_feedstock.feedstock_id", "feedstock.id"],
		["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"],
		["cms_wt_erp.feedstock_supplier supplier", "supplier.id", "feedstock.supplier_id"],
		["cms_wt_erp.feedstock_supplier_storage supplier_feedstock", "feedstock.id", "supplier_feedstock.feedstock_id",
			"feedstock.supplier_id", "supplier_feedstock.supplier_id"],
	];

	let strict_params = { keys: [], values: [] };
	lib.Query.fillParam("product_feedstock.product_id", req.params.product_id, strict_params);

	try {
		let feedstocks = await Product.feedstock.filter(props, inners, [], strict_params, []);
		res.send({ feedstocks });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

module.exports = datasheetController;