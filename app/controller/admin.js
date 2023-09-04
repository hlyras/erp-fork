const userController = require('./user/main');
const Outcome = require('../model/financial/outcome');

const lib = require("jarmlib");

const adminController = {};

adminController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};
	res.render('admin/index', { user: req.user });
};

adminController.user = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};
	res.render('admin/user/index', { user: req.user });
};

adminController.production = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};

	const internal_strict_params = { keys: [], values: [] };
	lib.Query.fillParam("outcome_origin.category_id", 1, internal_strict_params);
	lib.Query.fillParam("outcome_origin.role_id", 1, internal_strict_params);

	const external_strict_params = { keys: [], values: [] };
	lib.Query.fillParam("outcome_origin.category_id", 10, external_strict_params);

	try {
		let internal_seamstresses = await Outcome.origin.filter([], [], internal_strict_params, [['name', 'ASC']]);
		let external_seamstresses = await Outcome.origin.filter([], [], external_strict_params, [['name', 'ASC']]);
		res.render('admin/production/index', { user: req.user, internal_seamstresses, external_seamstresses });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

module.exports = adminController;