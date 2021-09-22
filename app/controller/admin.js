const User = require('../model/user');
const Product = require('../model/product/main');
const Sale = require('../model/sale');
const Ecommerce_sale = require('../model/ecommerce/sale');
const userController = require('./user');

const adminController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','pro-man','COR-GER'])){
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
	product: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('product/index', { user: req.user });
	}
};

module.exports = adminController;