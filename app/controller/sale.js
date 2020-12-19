const User = require('../model/user');
const userController = require('./user');

const lib = require('../../config/lib');

const Sale = require('../model/sale');
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
		
		try {
			let row = await Sale.save(req.body.sale);
			sale.id = row.insertId;
			
			sale.products = JSON.parse(req.body.sale.products);
			for(i in sale.products){
				sale.products[i].info = req.body.sale.products[i].code+" | "+req.body.sale.products[i].name+" | "+req.body.sale.products[i].color+" | "+req.body.sale.products[i].size;
				await Sale.product.save(sale.id, sale.products[i]);
			};

			res.send({ sale });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar sua venda, favor contatar o suporte." });
		};
	}
};

module.exports = saleController;