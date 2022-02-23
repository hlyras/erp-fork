const User = require('../../model/user');
const userController = require('./../user');

const Logistics = require('../../model/sale/logistics');

const logisticsController = {};

logisticsController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man',"com-sel","adm-man","adm-ass", "adm-aud", 'log-pac','COR-GER'])){
		return res.redirect('/');
	};

	try {
		res.render('sale/triage', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

logisticsController.confirmPackment = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm',"adm-man",'pro-man','COR-GER','log-pac'])){
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

	try {
		await Logistics.confirmPackment(sale);
		res.send({ done: "Embalo confirmado com sucesso!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

logisticsController.confirmNF = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let sale = {
		id: req.body.sale.id,
		nf: req.body.sale.nf,
		nf_user_id: req.user.id,
		nf_user_name: req.user.name,
		nf_confirmation_date: new Date().getTime(),
		status: "Ag. envio"
	};

	try {
		await Logistics.confirmNF(sale);
		res.send({ done: "Nota fiscal anexada com sucesso!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao anexar a NF, favor contatar o suporte." });
	};
};

logisticsController.confirmShipment = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let sale = {
		id: req.params.id,
		shipment_user_id: req.user.id,
		shipment_user_name: req.user.name,
		shipment_confirmation_date: new Date().getTime(),
		status: "Enviado"
	};

	try {
		await Logistics.confirmShipment(sale);
		res.send({ done: "Envio confirmado com sucesso!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
	};
};

module.exports = logisticsController;