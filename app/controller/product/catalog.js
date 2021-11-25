const lib = require("jarmlib");

const Product = require('../../model/product/main');
Product.catalog = require('../../model/product/catalog');

const productController = require('./main');

const userController = require('./../user');

productController.catalog = {};

productController.catalog.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};

	try {
		res.render('product/catalog', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

module.exports = productController.catalog;