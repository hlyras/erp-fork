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
	production.id = req.body.id;
	production.datetime = new Date().getTime();
	production.shipment_datetime = req.body.shipment_datetime;
	production.location = req.body.location;
	production.seamstress_id = req.body.seamstress_id;
	production.products = req.body.products;
	production.preparation_deadline = req.body.preparation_deadline;
	production.status = "Ag. preparação";
	production.user_id = req.user.id;

	if (!production.products.length) { return res.send({ msg: "É necessário incluir pelo menos 1 produto." }); }

	try {
		if (!production.id) {
			// create
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
		} else {
			// update
			if (production.status == "Ag. envio") {
				return res.send({ msg: "" });
			}

			let production_response = await production.update();
			if (production_response.err) { return res.send({ msg: production_response.err }); }

			// Production product
			let product_props = ["production_product.*", "product.code", "product.name", "product.color", "product.size"];
			let product_inners = [
				["cms_wt_erp.product", "production_product.product_id", "product.id"]
			];
			let product_strict_params = { keys: [], values: [] };
			lib.Query.fillParam("production_product.production_id", production.id, product_strict_params);

			production_products = await Production.product.filter(product_props, product_inners, [], product_strict_params, []);

			let save_products = production.products.reduce((save_products, p) => {
				for (let i in production_products) {
					if (p.id == production_products[i].product_id) { return save_products; }
				};

				let product = {
					production_id: production.id,
					product_id: p.id,
					amount: p.amount
				};

				save_products.push(product);
				return save_products;
			}, []);

			let update_products = production_products.reduce((update_products, p) => {
				for (let i in production.products) {
					if (p.product_id == production.products[i].id) {

						let product = {
							id: p.id,
							production_id: production.id,
							product_id: p.product_id,
							amount: production.products[i].amount
						};

						update_products.push(product);
						return update_products;
					}
				};

				return update_products;
			}, []);

			let remove_products = production_products.reduce((remove_products, p) => {
				for (let i in production.products) {
					if (p.product_id == production.products[i].id) { return remove_products; }
				};

				remove_products.push(p);
				return remove_products;
			}, []);

			save_products.forEach(async p => {
				let product = new Production.product();
				product.production_id = p.production_id;
				product.product_id = p.product_id;
				product.amount = p.amount;
				let response = await product.insert();
				if (response.err) { return res.send({ msg: response.err }); }
			});

			update_products.forEach(async p => {
				let product = new Production.product();
				product.id = p.id;
				product.production_id = p.production_id;
				product.product_id = p.product_id;
				product.amount = p.amount;
				let response = await product.update();
				if (response.err) { return res.send({ msg: response.err }); }
			});

			remove_products.forEach(async p => {
				let response = await Production.product.remove(p.id);
				if (response.err) { return res.send({ msg: "Ocorreu um erro ao remover os produtos." }); }
			});

			res.send({ done: "Produção atualizada com sucesso!" });
		}
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productionController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	// Production
	let production_props = ["production.*", "outcome_origin.name seamstress_name"];
	let production_inners = [
		["cms_wt_erp.financial_outcome_origin outcome_origin", "outcome_origin.id", "production.seamstress_id"]
	];
	let production_strict_params = { keys: [], values: [] };
	lib.Query.fillParam("production.id", req.params.id, production_strict_params);

	// Production product
	let product_props = ["production_product.*", "product.code", "product.name", "product.color", "product.size"];
	let product_inners = [
		["cms_wt_erp.product", "production_product.product_id", "product.id"]
	];
	let product_strict_params = { keys: [], values: [] };
	lib.Query.fillParam("production_product.production_id", req.params.id, product_strict_params);

	try {
		const production = (await Production.filter(production_props, production_inners, [], [], production_strict_params, [], 0))[0];
		production.products = await Production.product.filter(product_props, product_inners, [], product_strict_params, []);

		res.send({ production });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

productionController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

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
	lib.Query.fillParam("production.status", req.body.status, strict_params);
	lib.Query.fillParam("production.user_id", req.body.user_id, params);
	let order_params = "";
	if (req.body.order) {
		order_params = [[req.body.order, "ASC"]];
	} else {
		order_params = [["production.id", "ASC"]];
	}

	try {
		const productions = await Production.filter(props, inners, period, params, strict_params, order_params, 0);
		res.send({ productions });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

module.exports = productionController;