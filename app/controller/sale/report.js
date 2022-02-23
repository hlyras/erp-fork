const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Sale = require('../../model/sale');

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const Customer = require('../../model/customer');

const reportController = {};

reportController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man','COR-GER'])){
		return res.redirect('/');
	};
	let users = await User.list();
	res.render('sale/report/index', { user: req.user, users: users });
};

// Product
reportController.product = {};

reportController.product.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man','COR-GER'])){
		return res.redirect('/');
	};
	let colors = await Product.color.list();
	let users = await User.list();
	res.render('sale/report/product', { user: req.user, users: users, colors: colors });
};

reportController.product.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	const params = { keys: [], values: [] }
	const strict_params = { keys: [], values: [] }
	const period = { key: "sale_date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };

	let product_props = ["sale.id",
		"product.code",
		"product.name",
		"product.color",
		"product.size",
		"sale_product.product_id",
		"sale_product.amount"
	];
	
	let package_product_props = ["sale.id",
		"product.code",
		"product.name",
		"product.color",
		"product.size",
		"sale_package_product.product_id",
		"sale_package_product.amount"
	];

	let product_inners = [
		["cms_wt_erp.sale_product sale_product","cms_wt_erp.sale.id","cms_wt_erp.sale_product.sale_id"],
		["cms_wt_erp.product product","cms_wt_erp.product.id","cms_wt_erp.sale_product.product_id"]
	];

	let package_product_inners = [
		["cms_wt_erp.sale_package_product sale_package_product","cms_wt_erp.sale.id","cms_wt_erp.sale_package_product.sale_id"],
		["cms_wt_erp.product product","cms_wt_erp.product.id","cms_wt_erp.sale_package_product.product_id"]
	];

	lib.Query.fillParam("cms_wt_erp.product.name", req.body.sale.product_name, params);
	lib.Query.fillParam("cms_wt_erp.product.color", req.body.sale.product_color, strict_params);
	lib.Query.fillParam("cms_wt_erp.sale.status", req.body.sale.status, strict_params);

	let order_params = [ ["sale.id", "DESC"] ];
	let limit = 0;
	
	try {
		let sale_products = await Sale.filter(product_props, product_inners, period, params, strict_params, order_params, limit);
		let sale_package_products = await Sale.filter(package_product_props, package_product_inners, period, params, strict_params, order_params, limit);
		res.send({ sale_products: sale_products, sale_package_products: sale_package_products });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

// packment
reportController.packment = {};

reportController.packment.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man','COR-GER'])){
		return res.redirect('/');
	};
	let colors = await Product.color.list();
	let users = await User.list();
	res.render('sale/report/packment', { user: req.user, users: users, colors: colors });
};

reportController.packment.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let props = ["sale.id",
		"sale.packment_user_id",
		"sale.packment_user_name"
	];
	
	let inners = [];

	const period = { key: "sale.packment_confirmation_date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
	const params = { keys: [], values: [] }
	const strict_params = { keys: [], values: [] }

	lib.Query.fillParam("cms_wt_erp.sale.status", req.body.sale.status, strict_params);
	lib.Query.fillParam("cms_wt_erp.sale.packment_user_id", req.body.sale.packment_user_id, strict_params);

	let order_params = [ ["sale.id", "DESC"] ];
	let limit = 0;
	
	try {
		let sale_packments = await Sale.filter(props, inners, period, params, strict_params, order_params, limit);
		res.send({ sale_packments });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

// Customer
reportController.customer = {};

reportController.customer.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};
	let users = await User.list();
	res.render('sale/report/customer', { user: req.user, users: users });
};

reportController.customer.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let props = [];

	let inners = [
		["cms_wt_erp.customer customer", "customer.id", "sale.customer_id"]
	];

	const period = { key: "sale.sale_date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("cms_wt_erp.sale.status", req.body.sale.status, strict_params);

	let order_params = [ ["sale.sale_date", "DESC"] ];
	let limit = 0;
	
	try {
		let sales = await Sale.filter(props, inners, period, params, strict_params, order_params, limit);
		res.send({ sales });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

module.exports = reportController;