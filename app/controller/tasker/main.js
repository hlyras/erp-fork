const lib = require("jarmlib");

const User = require('../../model/user');
const userController = require('./../user/main');

const Department = require('../../model/department/main');

const departmentController = {};

departmentController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man'])) {
		return res.redirect("/");
	};

	res.render('tasker/index', { user: req.user });
};

departmentController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man'])) {
		return res.redirect("/");
	};

	res.render('tasker/manage/index', { user: req.user });
};

module.exports = departmentController;