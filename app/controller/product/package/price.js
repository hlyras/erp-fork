const userController = require('./../../user/main');

const Product = require('../../../model/product/main');
Product.package = require('../../../model/product/package/main');
Product.package.price = require('../../../model/product/package/price');

const lib = require("jarmlib");


const priceController = {};

priceController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};

	try {
		res.render('product/price', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

priceController.find = async (req, res) => {
	let price = req.body.price;

	try {
		price = await Product.package.price.find(price);
		res.send({ price });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
	};
};

priceController.update = async (req, res) => {
	let price = req.body.price;

	try {
		await Product.package.price.update(price);
		res.send({ done: "Preço atualizado com sucesso!", price: price });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
	};
};

module.exports = priceController;