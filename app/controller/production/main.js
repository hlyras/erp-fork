const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Production = require('../../model/production/main');

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const productionController = {};

productionController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ["adm","com-sel",'com-ass','adm-man','adm-ass','adm-aud','fin-ass'])){
		return res.redirect('/');
	};

	try {
		res.render('sale/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productionController.manage = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ["adm","com-sel",'com-ass','adm-man','adm-ass','adm-aud','fin-ass'])){
		return res.redirect('/');
	};

	try {
		const productColors = await Product.color.list();
		res.render('sale/index', { productColors, user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

module.exports = productionController;