const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Sale = require('../../model/sale/main');
const Financial = require('../../model/sale/financial');

const financialController = {};

financialController.payment = {};

financialController.payment.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};

	try {
		res.render('sale/financial/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

financialController.setEstimatedShipmentDate = (sale) => {
	if (sale.value <= 1000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day());
	} else if (sale.value > 1000 && sale.value < 2000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 2);
	} else if (sale.value > 2000 && sale.value < 3000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 3);
	} else if (sale.value > 3000 && sale.value < 4000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 4);
	} else if (sale.value > 4000 && sale.value < 5000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 5);
	} else {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 7);
	}
};

financialController.payment.confirm = async (req, res) => {
	if (!userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let sale = {
		id: req.params.id,
		payment_user_id: req.user.id,
		payment_user_name: req.user.name,
		payment_confirmation_date: new Date().getTime(),
		status: "Ag. embalo",
		estimated_shipment_date: new Date().getTime() + (lib.date.timestamp.day() * 2)
	};

	try {
		financialController.setEstimatedShipmentDate(sale);
		await Financial.payment.confirm(sale);
		res.send({ done: "Pagamento confirmado com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

financialController.payment2 = {};

financialController.payment2.confirm = async (req, res) => {
	if (!userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let sale = {
		id: req.params.id,
		payment2_confirmation_date: new Date().getTime(),
		payment2_user_id: req.user.id,
		payment2_user_name: req.user.name,
		status: "Ag. nota fiscal"
	};

	try {
		let verifySalePaymentMethod = (await Sale.findById(sale.id))[0];
		if (verifySalePaymentMethod.shipment_method == "Retirada em Loja") { sale.status = "Ag. envio p/ retirada"; }

		await Financial.payment2.confirm(sale);
		res.send({ done: "Pagamento confirmado com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

financialController.billet = {};

financialController.billet.confirm = async (req, res) => {
	if (!userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let sale = {
		id: req.body.id,
		billet_user_id: req.user.id,
		billet_user_name: req.user.name,
		billet_confirmation_date: new Date().getTime(),
		status: "Ag. nota fiscal",
		billet_url: req.body.billet_url
	};

	try {
		await Financial.billet.confirm(sale);
		res.send({ done: "Boletos incluídos com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

module.exports = financialController;