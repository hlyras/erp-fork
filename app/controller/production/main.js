const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Production = require('../../model/production/main');
Production.product = require('../../model/production/product');

const Outcome = require('../../model/financial/outcome');

const productionController = {};

productionController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ["adm"])) {
		return res.redirect('/');
	};

	try {
		res.render('production/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productionController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ["adm"])) {
		return res.redirect('/');
	};

	const internal_strict_params = { keys: [], values: [] };
	lib.Query.fillParam("outcome_origin.category_id", 1, internal_strict_params);
	lib.Query.fillParam("outcome_origin.role_id", 1, internal_strict_params);

	const external_strict_params = { keys: [], values: [] };
	lib.Query.fillParam("outcome_origin.category_id", 10, external_strict_params);

	try {
		let internal_seamstresses = await Outcome.origin.filter([], [], internal_strict_params, []);
		let external_seamstresses = await Outcome.origin.filter([], [], external_strict_params, []);
		res.render('production/manage/index', { user: req.user, internal_seamstresses, external_seamstresses });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productionController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ["adm"])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let production = new Production();
	production.datetime = new Date().getTime();
	production.date = req.body.date;
	production.location = req.body.location;
	production.seamstress_id = req.body.seamstress_id;
	production.products = req.body.products;
	production.preparation_deadline = req.body.preparation_deadline;
	production.status = "Ag. preparação";
	production.user_id = req.user.id;

	if (!production.products.length) { return res.send({ msg: "É necessário incluir pelo menos 1 produto." }); }

	try {
		let production_response = await production.create();
		if (production_response.err) { return res.send({ msg: production_response.err }); }

		for (let i in production.products) {
			let product = new Production.product();
			product.production_id = production_response.insertId;
			product.product_id = production.products[i].id;
			product.amount = production.products[i].amount;
			let product_response = await product.insert();
			if (product_response.err) { return res.send({ msg: product_response.err }); }
		};

		res.send({ done: "Produção cadastrada com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productionController.filter = async (req, res) => {
	let props = ["production.*", "outcome_origin.name seamstress_name"];
	let inners = [
		["cms_wt_erp.financial_outcome_origin outcome_origin", "outcome_origin.id", "production.seamstress_id"]
	];

	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	let period = { key: "production.datetime", start: req.body.periodStart, end: req.body.periodEnd };
	lib.Query.fillParam("production.id", req.body.id, strict_params);
	lib.Query.fillParam("production.location", req.body.location, strict_params);
	lib.Query.fillParam("production.seamstress_id", req.body.seamstress_id, params);
	lib.Query.fillParam("production.user_id", req.body.user_id, params);
	let order_params = [["production.id", "ASC"]];

	try {
		const productions = await Production.filter(props, inners, period, params, strict_params, order_params, 0);
		res.send({ productions });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

module.exports = productionController;