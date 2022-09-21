const User = require('../../../model/user');
const userController = require('./../../user');
const Expense = require('../../../model/financial/expense');
const Income = require('../../../model/financial/income');
const Outcome = require('../../../model/financial/outcome');

const lib = require("jarmlib");

const expenseController = {
	index: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
			return res.redirect('/');
		};

		let props = [];
		let params = { keys: [], values: [] }
		let strict_params = { keys: [], values: [] }

		if (lib.string.splitBy(req.user.access, "-")[0] != "adm" && lib.string.splitBy(req.user.access, "-")[0] != "fin") {
			lib.Query.fillParam("outcome_category.name", lib.string.splitBy(req.user.access, "-")[0] + "-", params);
		};

		let order_params = [["outcome_category.name", "ASC"]];

		try {
			const incomeCategories = await Income.category.list();
			const outcomeCategories = await Outcome.category.filter(props, params, strict_params, order_params);
			res.render('financial/expense/index', { user: req.user, incomeCategories, outcomeCategories });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as categorias e origens, favor contatar o suporte" });
		};
	},
	manage: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
			return res.redirect('/');
		};

		const users = await User.list();
		const incomeCategories = await Income.category.list();
		const outcomeCategories = await Outcome.category.list();

		res.render('financial/expense/manage', { user: req.user, users, incomeCategories, outcomeCategories });
	},
	payment: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'fin-man'])) {
			return res.redirect('/');
		};

		const users = await User.list();
		const incomeCategories = await Income.category.list();
		const outcomeCategories = await Outcome.category.list();

		res.render('financial/expense/payment', { user: req.user, users, incomeCategories, outcomeCategories });
	},
	save: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const outcome = new Outcome();
		outcome.id = parseInt(req.body.expense.outcome_id);
		outcome.datetime = lib.date.timestamp.generate();
		outcome.date = req.body.expense.date;
		outcome.category_id = req.body.expense.category_id;
		outcome.origin_id = req.body.expense.origin_id;
		outcome.description = req.body.expense.description;
		outcome.cost = parseFloat(req.body.expense.cost);
		outcome.status = "Ag. aprovação";
		outcome.user_id = req.user.id;

		if (!outcome.datetime) { return res.send({ msg: "Não foi possível identificar o momento do cadastro." }); };
		if (!outcome.date || outcome.date < lib.date.timestamp.generate()) { return res.send({ msg: "Data de vencimento inválida." }); };
		if (!outcome.category_id) { return res.send({ msg: "É necessário selecionar a categoria." }); };
		if (!outcome.origin_id) { return res.send({ msg: "É necessário selecionar a origem." }); };
		if (!outcome.cost) { return res.send({ msg: "É necessário selecionar o valor da entrada." }); };
		if (!outcome.description) { return res.send({ msg: "É necessário selecionar a descrição." }); };

		const expense = new Expense();
		expense.id = parseInt(req.body.expense.id);
		expense.outcome_id = parseInt(req.body.expense.outcome_id);
		expense.payment_method = req.body.expense.payment_method;
		expense.origin_payment_id = parseInt(req.body.expense.origin_payment_id);
		expense.user_id = req.user.id;

		if (!expense.payment_method) { return res.send({ msg: "É necessário selecionar um método de pagamento válido." }); };
		if (expense.payment_method == "Boleto") {
			expense.billet_bank = req.body.expense.billet_bank;
			expense.billet_receiver = req.body.expense.billet_receiver;
			expense.billet_code = req.body.expense.billet_code;

			if (!expense.billet_bank) { return res.send({ msg: "É necessário informar o banco recebedor do boleto." }); };
			if (!expense.billet_receiver) { return res.send({ msg: "É necessário informar o nome do beneficiário do boleto." }); };
			if (!expense.billet_code) { return res.send({ msg: "É necessário informar um código de barras válido." }); };
		} else if (expense.payment_method == "Pix") {
			expense.pix_receiver = req.body.expense.pix_receiver;
			expense.pix_key = req.body.expense.pix_key;

			if (!expense.pix_receiver) { return res.send({ msg: "É necessário informar o beneficiário do Pix." }); };
			if (!expense.pix_key) { return res.send({ msg: "É necessário informar a chave Pix." }); };
		} else if (expense.payment_method == "Transferência bancária") {
			expense.transfer_receiver = req.body.expense.transfer_receiver;
			expense.transfer_register = req.body.expense.transfer_register;
			expense.transfer_bank = req.body.expense.transfer_bank;
			expense.transfer_agency = req.body.expense.transfer_agency;
			expense.transfer_account = req.body.expense.transfer_account;
			expense.transfer_account_type = req.body.expense.transfer_account_type;

			if (!expense.transfer_receiver) { return res.send({ msg: "É necessário informar o beneficiário da conta." }); };
			if (!expense.transfer_register) { return res.send({ msg: "É necessário informar o CPF ou CNPJ do beneficiário." }); };
			if (!expense.transfer_bank) { return res.send({ msg: "É necessário informar o banco da conta." }); };
			if (!expense.transfer_agency) { return res.send({ msg: "É necessário informar a agência bancária." }); };
			if (!expense.transfer_account) { return res.send({ msg: "É necessário informar o número da conta." }); };
			if (!expense.transfer_account_type) { return res.send({ msg: "É necessário informar o tipo da conta." }); };
		}

		try {
			if (!expense.id) {
				let outcomeRow = await outcome.save();
				expense.outcome_id = outcomeRow.insertId;

				let expenseRow = await expense.save();
				expense.id = expenseRow.insertId;

				res.send({ done: "Despesa '" + expense.id + "' cadastrada com sucesso!", expense });
			} else {
				await outcome.update();
				await Outcome.update.status(outcome);
				await expense.update();

				res.send({ done: "Despesa '" + expense.id + "' atualizada com sucesso!", expense });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar a despesa, favor contatar o suporte." });
		};
	},
	findById: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-man', 'fin-ass'])) {
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let props = [
			"expense.*",
			"outcome.datetime",
			"outcome.date",
			"outcome.category_id",
			"category.name category_name",
			"outcome.origin_id",
			"origin.name origin_name",
			"outcome.income_category_id",
			"outcome.description",
			"outcome.cost",
			"outcome.status",
			"outcome.user_id",
			"user.name user_name",
			"user.access user_access"
		];

		let inners = [
			["cms_wt_erp.financial_outcome outcome", "outcome.id", "expense.outcome_id"],
			["cms_wt_erp.financial_outcome_category category", "outcome.category_id", "category.id"],
			["cms_wt_erp.financial_outcome_origin origin", "outcome.origin_id", "origin.id"],
			["cms_wt_erp.user user", "expense.user_id", "user.id"]
		];

		let period = { key: "", start: "", end: "" };
		let params = { keys: [], values: [] }
		let strict_params = { keys: [], values: [] }

		lib.Query.fillParam("expense.id", req.params.id, strict_params);

		let order_params = [];
		let limit = 0;

		try {
			let expenses = await Expense.filter(props, inners, period, params, strict_params, order_params, limit);
			res.send({ expenses });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar a saída, favor contatar o suporte." });
		};
	},
	filter: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-man', 'fin-ass'])) {
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let props = ["expense.id",
			"expense.payment_method",
			"outcome.id outcome_id",
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
			"user.name user_name",
			"outcome.status"
		];

		let inners = [
			["cms_wt_erp.financial_outcome outcome", "outcome.id", "expense.outcome_id"],
			["cms_wt_erp.financial_outcome_category category", "outcome.category_id", "category.id"],
			["cms_wt_erp.financial_outcome_origin origin", "outcome.origin_id", "origin.id"],
			["cms_wt_erp.user user", "outcome.user_id", "user.id"]
		];

		let period = { key: "outcome.datetime", start: req.body.expense.periodStart, end: req.body.expense.periodEnd };

		let params = { keys: [], values: [] }
		let strict_params = { keys: [], values: [] }

		lib.Query.fillParam("outcome.id", req.body.expense.id, strict_params);
		lib.Query.fillParam("outcome.category_id", req.body.expense.category_id, strict_params);
		lib.Query.fillParam("outcome.origin_id", req.body.expense.origin_id, strict_params);
		lib.Query.fillParam("outcome.status", req.body.expense.status, strict_params);

		if (req.user.access != "adm" && req.user.access != "fin-ass") {
			lib.Query.fillParam("outcome.user_id", req.user.id, strict_params);
		} else {
			lib.Query.fillParam("outcome.user_id", req.body.expense.user_id, strict_params);
		}

		if (req.body.expense.income_category_id) {
			props.push("income_category.name income_category_name");
			inners.push(["cms_wt_erp.financial_income_category income_category", "outcome.income_category_id", "income_category.id"]);
			lib.Query.fillParam("outcome.income_category_id", req.body.expense.income_category_id, strict_params);
		}

		if (req.body.expense.payment_method) {
			lib.Query.fillParam("expense.payment_method", req.body.expense.payment_method, strict_params);
		}

		let order_params = [["outcome.date", "DESC"], ["expense.id", "DESC"]];
		let limit = 0;

		try {
			let expenses = await Expense.filter(props, inners, period, params, strict_params, order_params, limit);
			res.send({ expenses });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
		};
	},
	confirm: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm'])) {
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let expense = new Expense();
		expense.id = req.body.expense.id;
		expense.approval_date = lib.date.timestamp.generate();
		expense.approval_user_id = req.user.id;
		expense.approval_user_name = req.user.name;

		try {
			let exp = await Expense.findById(req.body.expense.id);
			let outcome = { id: exp[0].outcome_id, status: "A pagar" }

			await Expense.confirm(expense);
			await Outcome.update.status(outcome);
			res.send({ done: 'Despesa aprovada com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao aprovar a despesa, favor entrar em contato com o suporte." });
		};
	},
	pay: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'fin-man'])) {
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const expense = new Expense();
		expense.id = req.body.expense.id;
		expense.payment_date = lib.date.timestamp.generate();
		expense.payment_user_id = req.user.id;
		expense.payment_user_name = req.user.name;

		if (!expense.id) { return res.send({ msg: "Despesa inválida." }); };

		const outcome = new Outcome();
		outcome.id = req.body.expense.outcome_id;
		outcome.date = expense.payment_date;
		outcome.income_category_id = req.body.expense.income_category_id;
		outcome.status = 'Pago';

		if (!outcome.id) { return res.send({ msg: "Saída inválida." }); };
		if (!outcome.date) { return res.send({ msg: "Necessário informar a data do pagamento." }); };
		if (!outcome.income_category_id) { return res.send({ msg: "Informe o banco do pagamento." }); };
		if (!outcome.status) { return res.send({ msg: "Status inválido." }); };

		try {
			await Outcome.update.date(outcome);
			await Outcome.update.income_category_id(outcome);
			await Outcome.update.status(outcome);
			await Expense.pay(expense);
			res.send({ done: 'Pagamento da despesa confirmado!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao aprovar a despesa, favor entrar em contato com o suporte." });
		};
	},
	cancel: async (req, res) => {
		if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-man', 'fin-ass'])) {
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		expense = new Expense();
		expense.id = req.params.id;
		expense.cancel_date = lib.date.timestamp.generate();
		expense.cancel_user_id = req.user.id;
		expense.cancel_user_name = req.user.name;

		try {
			let exp = await Expense.findById(expense.id)
			let out = await Outcome.findById(exp[0].outcome_id);
			if (out[0].status == "Pago") { return res.send({ msg: 'Despesas pagas não podem ser canceladas!' }); }

			let outcome = { id: out[0].id, status: "Cancelada" };

			await Expense.cancel(expense);
			await Outcome.update.status(outcome);
			res.send({ done: 'Despesa cancelada com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover a saída, favor entrar em contato com o suporte." });
		};
	}
};

module.exports = expenseController;