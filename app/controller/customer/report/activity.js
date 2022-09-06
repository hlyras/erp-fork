const userController = require('./../../user');
const User = require('../../../model/user');

const Sale = require('../../../model/sale/main');

const lib = require("jarmlib");

const activityController = {};

activityController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};
	res.render('customer/report/activity/index', { user: req.user });
};

activityController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel'])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let props = ["sale.*"];

	let inners = [ ["cms_wt_erp.customer customer", "customer.id", "sale.customer_id"] ];

	const period = { key: "sale.shipment_confirmation_date", start: req.body.period_start, end: req.body.period_end };
	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("customer.id", req.body.customer_id, strict_params);
	lib.Query.fillParam("customer.name", req.body.customer_name, params);

	try {
		let sales = await Sale.filter(props, inners, period, params, strict_params, [], 0);
		res.send({ sales });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

module.exports = activityController;
