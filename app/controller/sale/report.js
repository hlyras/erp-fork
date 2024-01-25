const User = require('../../model/user');
const userController = require('./../user/main');

const lib = require("jarmlib");

const Sale = require('../../model/sale/main');

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const Customer = require('../../model/customer/main');

const reportController = {};

reportController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'COR-GER', 'log-pac'])) {
		return res.redirect('/');
	};
	let users = await User.list();
	res.render('sale/report/index', { user: req.user, users: users });
};

// Sales
// reportController.sale = {};

// reportController.sale.index = async (req, res) => {
// 	if(!await userController.verifyAccess(req, res, ['adm','pro-man','COR-GER'])){
// 		return res.redirect('/');
// 	};

// 	res.render('sale/report/product', { user: req.user });
// };

// Product
reportController.product = {};

reportController.product.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'COR-GER', 'log-pac'])) {
		return res.redirect('/');
	};
	let colors = await Product.color.list();
	let users = await User.list();
	res.render('sale/report/product', { user: req.user, users: users, colors: colors });
};

reportController.product.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'adm-aud', 'pro-man', 'log-pac', 'COR-GER'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let product_options = {
		props: ["sale.id",
			"product.code",
			"product.name",
			"product.color",
			"product.size",
			"sale_product.product_id",
			"sale_product.amount"
		],
		inners: [
			["cms_wt_erp.customer customer", "cms_wt_erp.sale.customer_id", "cms_wt_erp.customer.id"],
			["cms_wt_erp.sale_product sale_product", "cms_wt_erp.sale.id", "cms_wt_erp.sale_product.sale_id"],
			["cms_wt_erp.product product", "cms_wt_erp.product.id", "cms_wt_erp.sale_product.product_id"]
		],
		params: { keys: [], values: [] },
		strict_params: { keys: [], values: [] },
		period: { key: "estimated_shipment_date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd },
		order_params: [["sale.id", "DESC"]],
		limit: 0
	};

	lib.Query.fillParam("cms_wt_erp.sale.id", req.body.sale.id, product_options.strict_params);
	lib.Query.fillParam("cms_wt_erp.customer.id", req.body.sale.customer_id, product_options.strict_params);
	lib.Query.fillParam("cms_wt_erp.product.name", req.body.sale.product_name, product_options.params);
	lib.Query.fillParam("cms_wt_erp.product.color", req.body.sale.product_color, product_options.strict_params);
	lib.Query.fillParam("cms_wt_erp.sale.status", req.body.sale.status, product_options.strict_params);

	let package_product_options = {
		props: ["sale.id",
			"product.code",
			"product.name",
			"product.color",
			"product.size",
			"sale_package.amount package_amount",
			"sale_package_product.package_id",
			"sale_package_product.product_id",
			"sale_package_product.amount"
		],
		inners: [
			["cms_wt_erp.customer customer", "cms_wt_erp.sale.customer_id", "cms_wt_erp.customer.id"],
			["cms_wt_erp.sale_package_product sale_package_product", "cms_wt_erp.sale.id", "cms_wt_erp.sale_package_product.sale_id"],
			["cms_wt_erp.sale_package sale_package", "cms_wt_erp.sale_package.sale_id", "cms_wt_erp.sale.id",
				"cms_wt_erp.sale_package.package_id", "cms_wt_erp.sale_package_product.package_id"],
			["cms_wt_erp.product product", "cms_wt_erp.product.id", "cms_wt_erp.sale_package_product.product_id"]
		],
		params: { keys: [], values: [] },
		strict_params: { keys: [], values: [] },
		period: { key: "estimated_shipment_date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd },
		order_params: [["sale.id", "DESC"]],
		limit: 0
	};

	lib.Query.fillParam("cms_wt_erp.sale.id", req.body.sale.id, package_product_options.strict_params);
	lib.Query.fillParam("cms_wt_erp.customer.id", req.body.sale.customer_id, package_product_options.strict_params);
	lib.Query.fillParam("cms_wt_erp.product.name", req.body.sale.product_name, package_product_options.params);
	lib.Query.fillParam("cms_wt_erp.product.color", req.body.sale.product_color, package_product_options.strict_params);
	lib.Query.fillParam("cms_wt_erp.sale.status", req.body.sale.status, package_product_options.strict_params);

	try {
		let sale_products = await Sale.filter(product_options);
		let sale_package_products = await Sale.filter(package_product_options);
		res.send({ sale_products: sale_products, sale_package_products: sale_package_products });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

// packment
reportController.packment = {};

reportController.packment.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'COR-GER'])) {
		return res.redirect('/');
	};
	let colors = await Product.color.list();
	let users = await User.list();
	res.render('sale/report/packment', { user: req.user, users: users, colors: colors });
};

reportController.packment.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'adm-aud', 'pro-man', 'log-pac', 'COR-GER'])) {
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

	let order_params = [["sale.id", "DESC"]];
	let limit = 0;

	try {
		let sale_packments = await Sale.filter({ props, inners, period, params, strict_params, order_params, limit });
		res.send({ sale_packments });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

module.exports = reportController;