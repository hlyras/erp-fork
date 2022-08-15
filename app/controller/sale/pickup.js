const User = require('../../model/user');
const userController = require('./../user');

const Sale = require('../../model/sale/main');
const Customer = require('../../model/customer/main');
const Triage = require('../../model/sale/triage');

const lib = require("jarmlib");

const pickupController = {};

pickupController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-ass','fin-ass'])){
		return res.redirect('/');
	};

	try {
		res.render('sale/pickup/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

pickupController.recept = {};

pickupController.recept.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-ass','fin-ass'])){
		return res.redirect('/');
	};

	res.render('sale/pickup/recept/index', { user: req.user });
};

pickupController.deliver = {};

pickupController.deliver.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel','com-ass','fin-ass'])){
		return res.redirect('/');
	};

	res.render('sale/pickup/deliver/index', { user: req.user });
};

pickupController.deliver.confirm = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel','com-ass','fin-ass'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let sale = {
		id: req.params.id,
		shipment_user_id: req.user.id,
		shipment_user_name: req.user.name,
		shipment_confirmation_date: new Date().getTime(),
		status: "Entregue"
	};

	try {
		await Triage.shipment.confirm(sale);
		res.send({ done: "Entrega confirmada!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao confirmar a entrega, favor contatar o suporte." });
	};
};

pickupController.deliver.print = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel','com-ass','fin-ass'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		let sale = (await Sale.findById(req.params.id))[0];
		sale.customer = (await Customer.findBy.id(sale.customer_id))[0];
		sale.payment_confirmation_date = lib.date.timestamp.toDate(sale.payment_confirmation_date).split(" ")[0];
		sale.shipment_confirmation_date = lib.date.timestamp.toDate(sale.shipment_confirmation_date).split(" ")[0];
		res.render('sale/pickup/deliver/print', { user: req.user, sale });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
	};
};

module.exports = pickupController;