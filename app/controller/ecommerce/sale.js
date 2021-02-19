const User = require('../../model/user');
const userController = require('./../user');

const lib = require('../../../config/lib');

const Sale = require('../../model/ecommerce/sale');
const Product = require('../../model/product');

const saleController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		try {
			res.render('ecommerce/sale/index', { user: req.user });
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
			res.render('ecommerce/sale/manage', { user: req.user });
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
		sale.date = lib.genFullDate();
		sale.products = JSON.parse(req.body.sale.products);
		sale.packages = JSON.parse(req.body.sale.packages);
		sale.user_id = req.user.id;
		sale.user_name = req.user.name;

		if(!sale.origin){ return res.send({ msg: "É necessário informar a origem da venda" }); };
		if(!sale.code){ return res.send({ msg: "É necessário informar o código da venda" }); };
		if(!sale.customer_user){ return res.send({ msg: "É necessário informar a origem da venda" }); };
		if(!sale.customer_name){ return res.send({ msg: "É necessário informar a origem da venda" }); };
		if(!sale.datetime){ return res.send({ msg: "É necessário informar o horário da venda" }); };
		if(!sale.status){ return res.send({ msg: "É necessário informar o status da venda" }); };
		if(!sale.tracker){ return res.send({ msg: "É necessário informar o código de rastreio da venda" }); };
		if(!sale.status){ return res.send({ msg: "É necessário informar o status da venda" }); };
		if(!sale.products.length && !sale.packages.length){ return res.send({ msg: "É necessário incluir ao menos um produto ou pacote." }); };

		try {
			let row = await Sale.save(req.body.sale);
			sale.id = row.insertId;
			
			for(i in sale.products){
				sale.products[i].info = sale.products[i].code+" | "+sale.products[i].name+" | "+sale.products[i].color+" | "+sale.products[i].size;
				await Sale.product.save(sale.id, sale.products[i]);
			};

			for(i in sale.packages){
				sale.packages[i].info = sale.packages[i].code+" | "+sale.packages[i].name+" | "+sale.packages[i].color;
				await Sale.package.save(sale.id, sale.packages[i]);
				for(j in sale.packages[i].products){
					await Sale.package.product.add(sale.id, sale.packages[i].id, sale.packages[i].products[j]);
				};
			};

			res.send({ done: "Venda cadastrada com sucesso!", sale: sale });
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

		if(req.body.sale.customer_username){
			params.push("customer_username");
			values.push(req.body.sale.customer_username);
		};

		if(req.body.sale.customer_name){
			params.push("customer_name");
			values.push(req.body.sale.customer_name);
		};

		if(req.body.sale.status){
			params.push("status");
			values.push(req.body.sale.status);
		};

		if(req.body.sale.tracker){
			params.push("tracker");
			values.push(req.body.sale.tracker);
		};

		try {
			let sales = await Sale.filter(periodStart, periodEnd, params, values);
			res.send({ sales });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
		};
	}
};

module.exports = saleController;