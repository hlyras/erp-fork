const userController = require('./../user');
const User = require('../../model/user');
const Customer = require('../../model/customer');
Customer.landingPage = require('../../model/customer/landing-page');

const lib = require("jarmlib");

const landingPageController = {};

landingPageController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};
	res.render('customer/landing-page/index', { user: req.user });
};

landingPageController.manage = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};
	res.render('customer/landing-page/manage/index', { user: req.user });
};

landingPageController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man',"com-ass",'com-sel','adm-aud'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let lead = {
		name: req.body.lead.name,
		email: req.body.lead.email,
		periodStart: req.body.lead.periodStart,
		periodEnd: req.body.lead.periodEnd,
		status: req.body.lead.status
	};

	const period = { key: "datetime", start: req.body.lead.periodStart, end: req.body.lead.periodEnd };
	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("lead_lp.name", req.body.lead.name, params);
	lib.Query.fillParam("lead_lp.email", req.body.lead.email, params);
	lib.Query.fillParam("lead_lp.status", req.body.lead.status, strict_params);
	lib.Query.fillParam("lead_lp.user_id", req.body.lead.user_id, strict_params);

	const order_params = [ ["id","DESC"] ];

	try {
		const leads = await Customer.landingPage.filter([], [], period, params, strict_params, []);
		res.send({ leads });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

module.exports = landingPageController;