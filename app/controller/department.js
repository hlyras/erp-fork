const User = require('../model/user');
const userController = require('./user');

const Department = require('../model/department');

const departmentController = {
	index: (req, res) => {
		res.render('user/profile', { user: req.user });
	},
	admin: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
	},
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		res.render('department/manage', { user: req.user });
	}
};

module.exports = departmentController;