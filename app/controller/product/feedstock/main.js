const User = require('../../../model/user');
const userController = require('./../../user');
// const feedstock = require('../../../model/product/feedstock');

const lib = require("jarmlib");

const feedstockController = {};

feedstockController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man'])){
		return res.redirect('/');
	};

	try {
		res.render('product/feedstock/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

feedstockController.manage = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','pro-man'])){
		return res.redirect('/');
	};

	try {
		res.render('product/feedstock/manage', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

module.exports = feedstockController;