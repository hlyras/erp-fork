const userController = require('./../../user/main');
const IncomeCategory = require('../../../model/financial/income/category');
const Outcome = require('../../../model/financial/outcome/main');
const OutcomeCategory = require('../../../model/financial/outcome/category');

const lib = require("jarmlib");
const { response } = require('express');

const outcomeController = {}

outcomeController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
		return res.redirect('/');
	};

	const incomeCategories = await IncomeCategory.filter({});
	const outcomeCategories = await OutcomeCategory.filter({});

	res.render('financial/outcome/manage/index', { user: req.user, incomeCategories, outcomeCategories });
};

outcomeController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let outcome = new Outcome();
	outcome.id = req.body.id;
	outcome.datetime = lib.date.timestamp.generate();
	outcome.category_id = req.body.category_id;
	outcome.origin_id = req.body.origin_id;
	outcome.income_category_id = req.body.income_category_id;
	outcome.value = req.body.value;
	outcome.description = req.body.description;
	outcome.status = req.body.status != "A pagar" ? req.body.status : null;
	outcome.user_id = req.user.id;

	outcome.payment_method = req.body.payment_method;
	outcome.payment_date = req.body.payment_date;

	if (!outcome.payment_method) { return res.send({ msg: "É necessário selecionar um método de pagamento válido." }); };

	if (outcome.payment_method == "Boleto") {
		outcome.billet_bank = req.body.billet_bank;
		outcome.billet_receiver = req.body.billet_receiver;
		outcome.billet_code = req.body.billet_code;

		if (!outcome.billet_bank) { return res.send({ msg: "É necessário informar o banco recebedor do boleto." }); };
		if (!outcome.billet_receiver) { return res.send({ msg: "É necessário informar o nome do beneficiário do boleto." }); };
		if (!outcome.billet_code) { return res.send({ msg: "É necessário informar um código de barras válido." }); };
	} else if (outcome.payment_method == "Cheque") {
		outcome.check_bank = req.body.check_bank;
		outcome.check_receiver = req.body.check_receiver;
		outcome.check_number = req.body.check_number;

		if (!outcome.check_bank) { return res.send({ msg: "É necessário informar o banco recebedor do cheque." }); };
		if (!outcome.check_receiver) { return res.send({ msg: "É necessário informar o nome do beneficiário do cheque." }); };
		if (!outcome.check_number) { return res.send({ msg: "É necessário informar o número do cheque." }); };
	} else if (outcome.payment_method == "Pix") {
		outcome.pix_receiver = req.body.pix_receiver;
		outcome.pix_key = req.body.pix_key;

		if (!outcome.pix_receiver) { return res.send({ msg: "É necessário informar o beneficiário do Pix." }); };
		if (!outcome.pix_key) { return res.send({ msg: "É necessário informar a chave Pix." }); };
	} else if (outcome.payment_method == "Transferência bancária") {
		outcome.transfer_receiver = req.body.transfer_receiver;
		outcome.transfer_register = req.body.transfer_register;
		outcome.transfer_bank = req.body.transfer_bank;
		outcome.transfer_agency = req.body.transfer_agency;
		outcome.transfer_account = req.body.transfer_account;
		outcome.transfer_account_type = req.body.transfer_account_type;

		if (!outcome.transfer_receiver) { return res.send({ msg: "É necessário informar o beneficiário da conta." }); };
		if (!outcome.transfer_register) { return res.send({ msg: "É necessário informar o CPF ou CNPJ do beneficiário." }); };
		if (!outcome.transfer_bank) { return res.send({ msg: "É necessário informar o banco da conta." }); };
		if (!outcome.transfer_agency) { return res.send({ msg: "É necessário informar a agência bancária." }); };
		if (!outcome.transfer_account) { return res.send({ msg: "É necessário informar o número da conta." }); };
		if (!outcome.transfer_account_type) { return res.send({ msg: "É necessário informar o tipo da conta." }); };
	}

	try {
		if (!outcome.id) {
			let createResponse = await outcome.create();
			if (createResponse.err) { return res.send({ msg: createResponse.err }); }

			outcome.id = createResponse.insertId;
			res.send({ done: "Saída cadastrada com sucesso!", outcome });
		} else {
			// Caso o usuário não possa editar a despesa de outros
			// if (req.user.access != "adm") {
			// 	let strict_params = { keys: [], values: [] }
			// 	lib.fillParam("outcome.id", outcome.id, strict_params);
			// 	let outcome_user_id = (await Outcome.filter({ strict_params }))[0].user_id;
			// 	if (outcome.id != outcome_user_id) { return res.send({ unauthorized: "Você não tem permissão para editar essa despesa!" }); }
			// }

			if (!outcome.payment_date) { return res.send({ msg: "É necessário selecionar a data." }); }
			if (!outcome.category_id) { return res.send({ msg: "É necessário selecionar a categoria." }); }
			if (!outcome.origin_id) { return res.send({ msg: "É necessário selecionar a origem." }); }
			if (!outcome.value || outcome.value < 0.01) { return res.send({ msg: "É necessário selecionar o valor da entrada." }); }

			let updateResponse = await outcome.update();
			if (updateResponse.err) { return res.send({ msg: updateResponse.err }); }

			outcome.id = updateResponse.insertId;
			res.send({ done: "Saída atualizada com sucesso!", outcome });
		};
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
	};
};

outcomeController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let props = ["outcome.*",
		"category.name category_name",
		"origin.name origin_name",
		"income_category.name income_category_name",
		"user.name user_name",
		"payment_user.name payment_user_name"
	];

	let inners = [
		["cms_wt_erp.financial_outcome_category category", "outcome.category_id", "category.id"],
		["cms_wt_erp.financial_outcome_origin origin", "outcome.origin_id", "origin.id"],
		["cms_wt_erp.user user", "outcome.user_id", "user.id"]
	];

	let lefts = [
		["cms_wt_erp.financial_income_category income_category", "outcome.income_category_id", "income_category.id"],
		["cms_wt_erp.user payment_user", "payment_user.id", "outcome.payment_user_id"]
	];

	let period = { key: "outcome.payment_date", start: req.body.period_start, end: req.body.period_end };
	let strict_params = { keys: [], values: [] }

	lib.Query.fillParam("outcome.id", req.body.id, strict_params);
	lib.Query.fillParam("outcome.category_id", req.body.category_id, strict_params);
	lib.Query.fillParam("outcome.origin_id", req.body.origin_id, strict_params);
	lib.Query.fillParam("outcome.status", req.body.status, strict_params);
	lib.Query.fillParam("income_category.id", req.body.income_category_id, strict_params);
	req.user.access != "adm" && lib.Query.fillParam("outcome.user_id", req.user.id, strict_params);

	let order_params = [["outcome.payment_date", "DESC"]];

	try {
		const outcomes = await Outcome.filter({ props, inners, lefts, period, strict_params, order_params });
		res.send({ outcomes });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

outcomeController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const outcome = {
		id: req.params.id,
		status: "Cancelado"
	};

	try {
		// await Outcome.delete(req.params.id);
		// res.send({ done: 'Saída excluída com sucesso!' });

		await outcome.update();
		res.send({ done: 'Saída cancelada com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover a saída, favor entrar em contato com o suporte." });
	};
};

outcomeController.payment = {};

outcomeController.payment.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
		return res.redirect('/');
	};

	const incomeCategories = await IncomeCategory.filter({});
	const outcomeCategories = await OutcomeCategory.filter({});

	res.render('financial/outcome/payment/index', { user: req.user, incomeCategories, outcomeCategories });
};

outcomeController.payment.approve = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const outcome = new Outcome();
	outcome.id = req.params.id;
	outcome.status = "A pagar";
	outcome.approval_date = lib.date.timestamp.generate();
	outcome.approval_user_id = req.user.id;

	if (!outcome.id) { return res.send({ msg: "É necessário informar o id da despesa" }); }
	if (outcome.status !== "A pagar") { return res.send({ msg: "O status informado é inválido" }); }
	if (!outcome.approval_date) { return res.send({ msg: "É necessário informar o id da despesa" }); }
	if (!outcome.approval_user_id) { return res.send({ msg: "É necessário informar o id da despesa" }); }

	try {
		const approval_confirm = await outcome.update();
		if (approval_confirm.err) { return res.send({ msg: response.err }); }

		res.send({ done: "Despesa aprovada com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao aprovar a venda, atualize a página e tente novamente, caso o problema persista entre em contato com o suporte." });
	}
};

outcomeController.payment.confirm = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const outcome = new Outcome();
	outcome.id = req.body.id;
	outcome.income_category_id = req.body.income_category_id;
	outcome.status = "Pago";
	outcome.payment_date = lib.date.timestamp.generate();
	outcome.payment_user_id = req.user.id;

	if (!outcome.id) { return res.send({ msg: "É necessário informar o id da despesa" }); }
	if (!req.body.income_category_id || isNaN(req.body.income_category_id)) { return res.send({ msg: "É necessário informar a instituição pagadora." }); }
	if (outcome.status !== "Pago") { return res.send({ msg: "O status informado é inválido" }); }
	if (!outcome.payment_date) { return res.send({ msg: "É necessário registrar o horário do pagamento" }); }
	if (!outcome.payment_user_id) { return res.send({ msg: "É necessário registrar o usuário." }); }

	try {
		const payment_confirm = await outcome.update();
		if (payment_confirm.err) { return res.send({ msg: response.err }); }

		res.send({ done: "Pagamento confirmado com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao aprovar a venda, atualize a página e tente novamente, caso o problema persista entre em contato com o suporte." });
	}
};

module.exports = outcomeController;