const userController = require('./../user/main');

const Sale = require('../../model/sale/main');
const Triage = require('../../model/sale/triage');

const lib = require("jarmlib");

const triageController = {};

triageController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass', 'log-pac', 'pro-sto', 'pro-dri'])) {
		return res.redirect('/');
	};

	try {
		res.render('sale/triage/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

triageController.packment = {};

triageController.packment.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass', 'log-pac', 'pro-sto'])) {
		return res.redirect('/');
	};

	try {
		res.render('sale/triage/packment/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

triageController.packment.confirm = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-ass', 'log-pac'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let sale = {
		id: parseInt(req.body.sale_id),
		box_amount: parseInt(req.body.box_amount),
		packment_user_id: req.user.id,
		packment_user_name: req.user.name,
		packment_confirmation_date: new Date().getTime(),
		status: "Ag. nota fiscal"
	};

	if (isNaN(sale.box_amount)) { return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" }); }
	if (sale.box_amount <= 0) { return res.send({ msg: "O volume inserido é inválido." }); }

	let verifySalePaymentMethod = (await Sale.findById(req.body.sale_id))[0];
	if (verifySalePaymentMethod.payment_method == "Boleto") { sale.status = "Ag. boletos"; }
	if (verifySalePaymentMethod.payment_method == "Cartão de crédito") { sale.status = "Ag. cartão de crédito"; }
	if (verifySalePaymentMethod.payment_period == "50%/50%") { sale.status = "Ag. pagamento 2/2"; }

	try {
		await Triage.packment.confirm(sale);
		res.send({ done: "Embalo confirmado com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

triageController.nf = {};

triageController.nf.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'fin-ass'])) {
		return res.redirect('/');
	};

	try {
		res.render('sale/triage/nf/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

triageController.nf.save = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let saleParams = {
		id: req.body.sale.id,
		nf_code: req.body.sale.nf_code || 0,
		nf: req.body.sale.nf,
		nf_user_id: req.user.id,
		nf_user_name: req.user.name,
		nf_confirmation_date: new Date().getTime()
	};

	let sale = (await Sale.findById(req.body.sale.id))[0];

	if (sale.shipment_method == "Retirada em Loja") { saleParams.status = "Ag. envio p/ retirada"; }
	if (sale.shipment_method != "Retirada em Loja") {
		if (saleParams.nf.length < 10) {
			return res.send({ msg: "É necessário incluir a NF para envio dos produtos por transportadora" });
		}
		saleParams.status = "Ag. envio";
	}

	try {
		await Triage.nf.save(saleParams);
		!saleParams.nf && res.send({ done: "Não foi incluída nota fiscal neste pedido!" });
		saleParams.nf && res.send({ done: "Nota fiscal anexada com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao anexar a NF, favor contatar o suporte." });
	};
};

module.exports = triageController;