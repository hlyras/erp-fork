const userController = require('./../../user');
const User = require('../../../model/user');
const Customer = require('../../../model/customer/main');
Customer.lead = require('../../../model/customer/lead');

const lib = require("jarmlib");

const leadController = {};

leadController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};
	res.render('customer/lead/index', { user: req.user });
};

leadController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};
	res.render('customer/lead/manage/index', { user: req.user });
};

leadController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', "com-ass", 'com-sel', 'adm-aud'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let lead = {
		id: req.body.lead.id,
		name: req.body.lead.name,
		email: req.body.lead.email,
		periodStart: req.body.lead.periodStart,
		periodEnd: req.body.lead.periodEnd,
		status: req.body.lead.status
	};

	const period = { key: "datetime", start: req.body.lead.periodStart, end: req.body.lead.periodEnd };
	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("customer_lead.id", req.body.lead.id, strict_params);
	lib.Query.fillParam("customer_lead.name", req.body.lead.name, params);
	lib.Query.fillParam("customer_lead.email", req.body.lead.email, params);
	lib.Query.fillParam("customer_lead.status", req.body.lead.status, strict_params);
	lib.Query.fillParam("customer_lead.user_id", req.body.lead.user_id, strict_params);

	const order_params = [["id", "DESC"]];

	try {
		const leads = await Customer.lead.filter([], [], period, params, strict_params, order_params);
		res.send({ leads });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

module.exports = leadController;