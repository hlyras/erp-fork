const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Financial = require('../../model/sale/financial');

const financialController = {};

financialController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};

	try {
		res.render('sale/financial', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

financialController.confirmPayment = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
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
		await Financial.confirmPayment(sale);
		res.send({ done: "Pagamento confirmado com sucesso!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

module.exports = financialController;