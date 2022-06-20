const User = require('../../../model/user');
const userController = require('./../../user');

const lib = require("jarmlib");

const Sale = require('../../../model/sale/main');

const financialController = {};

financialController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel','com-ass','fin-ass'])){
		return res.redirect('/');
	};

	try	{
		let users = await User.list();
		res.render('sale/metrics/financial', { user: req.user, users });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao acessar as métricas de venda, favor contatar o suporte." })
	};
};

financialController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel','com-ass','fin-ass'])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	const period = { key: "payment_confirmation_date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("sale.id", req.body.sale.id, strict_params);
	lib.Query.fillParam("sale.customer_name", req.body.sale.customer_name, params);
	lib.Query.fillParam("sale.customer_cnpj", req.body.sale.customer_cnpj, params);
	lib.Query.fillParam("sale.status", req.body.sale.status, strict_params);
	lib.Query.fillParam("sale.shipment_method", req.body.sale.shipment_method, strict_params);
	lib.Query.fillParam("sale.user_id", req.body.sale.user_id, strict_params);

	const order_params = [ ["id","DESC"] ];
	const limit = 0;

	try {
		let sales = await Sale.filter([], [], period, params, strict_params, order_params, limit);
		res.send({ sales });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

module.exports = financialController;