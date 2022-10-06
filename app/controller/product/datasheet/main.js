const lib = require("jarmlib");

const User = require('../../../model/user');
const userController = require('./../../user');

const Product = require('../../../model/product/main');
Product.color = require('../../../model/product/color');

const datasheetController = {};

datasheetController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};

	try {
		res.render('product/datasheet/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

datasheetController.cost = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};

	try {
		let productColors = Product.color.list();
		res.render('product/datasheet/cost/index', { user: req.user, productColors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

module.exports = datasheetController;