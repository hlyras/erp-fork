const userController = require('./../../user/main');
const Income = require('../../../model/financial/income/main');
const IncomeCategory = require('../../../model/financial/income/category');
// const IncomeOrigin = require('../../../model/financial/income/origin');

const lib = require("jarmlib");

const incomeController = {};

incomeController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};

	const incomeCategories = await IncomeCategory.list();

	res.render('financial/income/index', { user: req.user, incomeCategories });
};

incomeController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', 'com-sel', "adm-aud"])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let income = new Income();
	income.id = req.body.id;
	income.datetime = lib.date.timestamp.generate();
	income.date = req.body.date;
	income.category_id = req.body.category_id;
	income.origin_id = req.body.origin_id;
	income.value = req.body.value;
	income.description = req.body.description;
	income.user_id = req.user.id;

	try {
		if (!income.id) {
			let create_response = await income.create();
			if (create_response.err) { return res.send({ msg: create_response.err }); }

			income.id = create_response.insertId;

			res.send({ done: "Entrada cadastrada com sucesso!" });
		} else {
			let update_response = await income.update();
			if (update_response.err) { return res.send({ msg: update_response.err }); }

			res.send({ done: "Entrada atualizada com sucesso!" });
		};
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar a entrada." });
	};
};

incomeController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'adm-aud', 'pro-man', 'log-pac', 'COR-GER', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let props = ["cms_wt_erp.income.id",
		"income.datetime",
		"income.date",
		"income.category_id",
		"category.name category_name",
		"income.origin_id",
		"origin.name origin_name",
		"income.description",
		"income.value",
		"income.user_id",
		"user.name user_name"
	];

	let inners = [
		["cms_wt_erp.financial_income_category category", "income.category_id", "category.id"],
		["cms_wt_erp.financial_income_origin origin", "income.origin_id", "origin.id"],
		["cms_wt_erp.user user", "income.user_id", "user.id"]
	];


	let period = { key: "date", start: req.body.period_start, end: req.body.period_end };
	let params = { keys: [], values: [] }
	let strict_params = { keys: [], values: [] }

	lib.Query.fillParam("income.id", req.body.id, strict_params);
	lib.Query.fillParam("income.category_id", req.body.category_id, strict_params);
	lib.Query.fillParam("income.origin_id", req.body.origin_id, strict_params);

	let order_params = [["date", "DESC"], ["id", "DESC"]];

	try {
		let incomes = await Income.filter(props, inners, [], period, params, strict_params, order_params);
		res.send({ incomes });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as entradas, favor contatar o suporte" });
	};
};

incomeController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let props = ["income.id",
		"income.datetime",
		"income.date",
		"income.category_id",
		"category.name category_name",
		"income.origin_id",
		"origin.name origin_name",
		"income.description",
		"income.value",
		"income.user_id",
		"user.name user_name"
	];

	let inners = [
		["cms_wt_erp.financial_income_category category", "income.category_id", "category.id"],
		["cms_wt_erp.financial_income_origin origin", "income.origin_id", "origin.id"],
		["cms_wt_erp.user user", "income.user_id", "user.id"]
	];

	let period = { key: "", start: '', end: '' };
	let params = { keys: [], values: [] };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("income.id", req.params.id, strict_params);

	let order_params = [["date", "DESC"], ["id", "DESC"]];
	let limit = 0;

	try {
		let income = await Income.filter(props, inners, period, params, strict_params, order_params, limit);
		res.send({ income });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as entradas, favor contatar o suporte" });
	};
};

incomeController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Income.delete(req.params.id);
		res.send({ done: 'Entrada excluída com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover a entrada, favor entrar em contato com o suporte." });
	};
};

module.exports = incomeController;