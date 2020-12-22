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
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		try {
			res.render('sale/manage', { user: req.user });
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
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let params = [];
		let values = [];

		let periodStart = ""; 
		let periodEnd = "";

		if(req.body.sale.periodStart && req.body.sale.periodEnd){
			periodStart = req.body.sale.periodStart;
			periodEnd = req.body.sale.periodEnd;
		} else {
			periodStart = "";
			periodEnd = "";
		};

		if(req.body.sale.customer_name){
			params.push("customer_name");
			values.push(req.body.sale.customer_name);
		};

		if(parseInt(req.body.sale.customer_cnpj)){
			params.push("customer_cnpj");
			values.push(req.body.sale.customer_cnpj);
		};

		if(req.body.sale.status){
			params.push("status");
			values.push(req.body.sale.status);
		};

		try {
			let sales = await Sale.filter(periodStart, periodEnd, params, values);
			res.send({ sales });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const sale = await Sale.findById(req.params.id);
			sale[0].products = await Sale.product.list(req.params.id);

			res.send({ sale });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar a venda, favor contatar o suporte." });
		};
	}
};

module.exports = saleController;