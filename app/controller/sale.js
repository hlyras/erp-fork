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
		sale.products = JSON.parse(req.body.sale.products);

		if(!sale.customer_id){ return res.send({ msg: "É necessário selecionar o cliente" }); };
		if(!sale.sale_date){ return res.send({ msg: "É necessário selecionar a data da venda" }); };
		if(!sale.estimated_shipping_date){ return res.send({ msg: "É necessário selecionar a previsão de envio" }); };
		if(!sale.payment_method){ return res.send({ msg: "É necessário selecionar o método de pagamento" }); };
		if(!sale.status){ return res.send({ msg: "É necessário selecionar o status da venda" }); };
		if(!sale.products.length){ return res.send({ msg: "É necessário selecionar ao menos um produto." }); };

		try {
			let row = await Sale.save(req.body.sale);
			sale.id = row.insertId;
			
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