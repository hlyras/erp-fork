const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Sale = require('../../model/sale/main');
const Financial = require('../../model/sale/financial');

const financialController = {};

financialController.payment = {};

financialController.payment.index = async (req, res) => {
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

financialController.setEstimatedShipmentDate = (sale) => {
	if(sale.value <= 1000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day());
	} else if(sale.value > 1000 && sale.value < 2000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 2);
	} else if(sale.value > 2000 && sale.value < 3000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 3);
	} else if(sale.value > 3000 && sale.value < 4000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 4);
	} else if(sale.value > 4000 && sale.value < 5000) {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 5);
	} else {
		sale.estimated_shipment_date = new Date().getTime() + (lib.date.timestamp.day() * 7);
	}
};

financialController.payment.confirm = async (req, res) => {
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
		sale.value = (await Sale.findById(req.params.id))[0].value;
		financialController.setEstimatedShipmentDate(sale);
		await Financial.payment.confirm(sale);
		res.send({ done: "Pagamento confirmado com sucesso!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

module.exports = financialController;