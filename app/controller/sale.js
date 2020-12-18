const User = require('../model/user');
const userController = require('./user');

const lib = require('../../config/lib');

const Product = require('../model/product');

const saleController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		try {
			const productColors = await Product.colorList();
			res.render('sale/index', { productColors, user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		let sale = req.body.sale;
		sale.products = JSON.parse(req.body.sale.products);

		console.log(req.body.sale);

		res.send(sale);

		// try {
		// 	res.render('sale/index', { productColors, user: req.user });
		// } catch (err) {
		// 	console.log(err);
		// 	res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		// };
	}
};

module.exports = saleController;