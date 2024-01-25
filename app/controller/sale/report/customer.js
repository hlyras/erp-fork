const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Sale = require('../../../model/sale/main');

const customerController = {};

customerController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel'])) {
		return res.redirect('/');
	};
	let users = await User.list();
	res.render('sale/report/customer', { user: req.user, users: users });
};

customerController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let props = [];

	let inners = [["cms_wt_erp.customer customer", "customer.id", "sale.customer_id"]];

	const period = { key: "sale.shipment_confirmation_date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("customer.id", req.body.sale.customer_id, strict_params);
	lib.Query.fillParam("customer.name", req.body.sale.customer_name, params);
	lib.Query.fillParam("sale.status", req.body.sale.status, strict_params);

	try {
		let sales = await Sale.filter({ props, inners, period, params, strict_params });
		res.send({ sales });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

module.exports = customerController;