const userController = require('./../../user/main');
const Outcome = require('../../../model/financial/outcome');
const Expense = require('../../../model/financial/expense');

const lib = require("jarmlib");

const outcomeController = {
	index: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
			return res.redirect('/');
		};

		const outcomeCategories = await Outcome.category.list();

		res.render('financial/outcome/index', { user: req.user, outcomeCategories });
	},
	save: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let outcome = new Outcome();
		outcome.id = req.body.outcome.id;
		outcome.datetime = lib.date.timestamp.generate();
		outcome.date = req.body.outcome.date;
		outcome.category_id = req.body.outcome.category_id;
		outcome.origin_id = req.body.outcome.origin_id;
		outcome.income_category_id = req.body.outcome.income_category_id;
		outcome.cost = req.body.outcome.cost;
		outcome.description = req.body.outcome.description;
		outcome.status = "Pago";
		outcome.user_id = req.user.id;

		if (!outcome.datetime) { return res.send({ msg: "Não foi possível identificar o momento do cadastro." }); };
		if (!outcome.date) { return res.send({ msg: "É necessário selecionar a data." }); };
		if (!outcome.category_id) { return res.send({ msg: "É necessário selecionar a categoria." }); };
		if (!outcome.origin_id) { return res.send({ msg: "É necessário selecionar a origem." }); };
		if (!outcome.income_category_id) { return res.send({ msg: "É necessário selecionar a categoria de entrada." }); };
		if (!outcome.cost) { return res.send({ msg: "É necessário selecionar o valor da entrada." }); };

		try {
			if (!outcome.id) {
				let row = await outcome.save();
				outcome.id = row.insertId;
				res.send({ done: "Saída cadastrada com sucesso!", outcome });
			} else {
				let row = await outcome.update();
				outcome.id = row.insertId;
				res.send({ done: "Saída atualizada com sucesso!", outcome });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
		};
	},
	filter: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
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

		let order_params = [["outcome.date", "ASC"]];
		let limit = 0;

		try {
			let outcomes = await Outcome.filter(props, inners, period, params, strict_params, order_params, limit);
			res.send({ outcomes });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
		};
	},
	findById: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let props = ["outcome.id",
			"outcome.datetime",
			"outcome.date",
			"outcome.category_id",
			"category.name category_name",
			"outcome.origin_id",
			"origin.name origin_name",
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
			["cms_wt_erp.user user", "outcome.user_id", "user.id"]
		];

		let period = { key: "", start: "", end: "" };
		let params = { keys: [], values: [] }
		let strict_params = { keys: [], values: [] }

		lib.Query.fillParam("outcome.id", req.params.id, strict_params);

		try {
			let expense = await Expense.findByOutcomeId(req.params.id);

			if (expense.length) {
				props.push("expense.id expense_id");
				props.push("expense.approval_date");
				props.push("expense.approval_user_id");
				props.push("expense.approval_user_name");
				props.push("expense.payment_date");
				props.push("expense.payment_user_id");
				props.push("expense.payment_user_name");
				props.push("expense.payment_method");
				props.push("expense.billet_bank");
				props.push("expense.billet_receiver");
				props.push("expense.billet_code");
				props.push("expense.pix_receiver");
				props.push("expense.pix_key");
				props.push("expense.transfer_receiver");
				props.push("expense.transfer_register");
				props.push("expense.transfer_bank");
				props.push("expense.transfer_agency");
				props.push("expense.transfer_account");
				props.push("expense.transfer_account_type");

				inners.push(["cms_wt_erp.financial_expense expense", "outcome.id", "expense.outcome_id"]);
			}

			let order_params = [["date", "DESC"], ["id", "DESC"]];
			let limit = 0;

			const outcome = await Outcome.filter(props, inners, period, params, strict_params, order_params, limit);
			outcome.expense_id = expense.length ? expense[0].id : null;
			res.send({ outcome });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar a saída, favor contatar o suporte." });
		};
	},
	delete: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm'])) {
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Outcome.delete(req.params.id);
			res.send({ done: 'Saída excluída com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover a saída, favor entrar em contato com o suporte." });
		};
	}
};

module.exports = outcomeController;