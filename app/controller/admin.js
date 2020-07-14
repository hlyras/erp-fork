const User = require('../model/user');
const userController = require('./user');

const adminController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('admin/index', { user: req.user });
	},
	user: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('admin/user', { user: req.user });
	},
	userDepartment: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect("/");
		};

		

		res.render('admin/user_department', { user: req.user, user_departments: [] });
	},
	product: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('product/index', { user: req.user });
	},
};

module.exports = adminController;