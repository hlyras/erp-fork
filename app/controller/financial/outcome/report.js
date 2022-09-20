const lib = require("jarmlib");

const userController = require('./../../user');

const Income = require('../../../model/financial/income');
const Outcome = require('../../../model/financial/outcome');
const Expense = require('../../../model/financial/expense');

const reportController = {};

reportController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};

	try {
		const incomeCategories = await Income.category.list();
		const outcomeCategories = await Outcome.category.list();
		res.render('financial/outcome/report/index', { user: req.user, incomeCategories, outcomeCategories });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao abrir relatório, favor contatar o suporte." })
	}
};

reportController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};

	let props = ["outcome.id",
		"outcome.datetime",
		"outcome.date",
		"outcome.category_id",
		"category.name category_name",
		"outcome.origin_id",
		"origin.name origin_name",
		"origin.cost_type",
		"outcome.income_category_id",
		"outcome.description",
		"outcome.cost",
		"outcome.user_id",
		"outcome.status",
		"user.name user_name"
	];

	let inners = [
		["cms_wt_erp.financial_outcome_category category", "outcome.category_id", "category.id"],
		["cms_wt_erp.financial_outcome_origin origin", "outcome.origin_id", "origin.id"],
		["cms_wt_erp.financial_expense expense", "expense.outcome_id", "outcome.id"],
		["cms_wt_erp.user user", "outcome.user_id", "user.id"]
	];

	let period = { key: "outcome.date", start: req.body.outcome.periodStart, end: req.body.outcome.periodEnd };
	let params = { keys: [], values: [] }
	let strict_params = { keys: [], values: [] }

	lib.Query.fillParam("outcome.id", req.body.outcome.id, strict_params);
	lib.Query.fillParam("outcome.category_id", req.body.outcome.category_id, strict_params);
	lib.Query.fillParam("outcome.origin_id", req.body.outcome.origin_id, strict_params);
	lib.Query.fillParam("outcome.status", req.body.outcome.status, strict_params);

	if (req.body.outcome.income_category_id) {
		props.push("income_category.name income_category_name");
		inners.push(["cms_wt_erp.financial_income_category income_category", "outcome.income_category_id", "income_category.id"]);
		lib.Query.fillParam("outcome.income_category_id", req.body.outcome.income_category_id, strict_params);
	}

	let order_params = [["date", "DESC"], ["id", "DESC"]];
	let limit = 0;

	try {
		let outcomes = await Outcome.filter(props, inners, period, params, strict_params, order_params, limit);
		res.send({ outcomes });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};

	res.render('financial/outcome/report/index', { user: req.user, incomeCategories, outcomeCategories });
};



module.exports = reportController;