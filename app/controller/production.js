const User = require('../model/user');
const userController = require('./user');

const lib = require('../../config/lib');

const Production = require('../model/production');
const Product = require('../model/product');
const Feedstock = require('../model/feedstock');

const productionController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
			return res.redirect("/");
		};

		try {
			const productColors = await Product.colorList();
			const feedstockStorages = await Feedstock.storage.list();
			res.render('production/index', { user: req.user, productColors, feedstockStorages });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao acessar esta área, favor contatar o suporte." });
		};
	},
	simulation: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
			return res.redirect("/");
		};

		try {
			const productColors = await Product.colorList();
			const feedstockStorages = await Feedstock.storage.list();
			res.render('production/simulate', { user: req.user, productColors, feedstockStorages });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao acessar esta área, favor contatar o suporte." });
		};
	},
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
			return res.redirect("/");
		};

		res.render('production/manage', { user: req.user });
	},
	simulate: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const production = {
			products: req.body.products,
			feedstocks: []
		};

		try {
			let production_feedstocks = [];
			for(i in production.products){
				let product_feedstocks = await Product.feedstock.list(production.products[i].id);
				
				production.products[i].feedstocks = product_feedstocks.reduce((feedstocks, feedstock) => {
					feedstocks.push(feedstock);

					if(feedstock.uom == "cm"){
						feedstock.total_amount = (feedstock.amount * feedstock.measure) * production.products[i].amount;
					} else if(feedstock.uom == "un"){
						feedstock.total_amount = (feedstock.amount) * production.products[i].amount;
					};

					production_feedstocks.push(feedstock);
					return feedstocks;
				}, production.products[i].feedstocks);
			};

			production.feedstocks = production_feedstocks.reduce((feedstocks, feedstock) => {
				for(i in feedstocks){
					if(feedstocks[i].id == feedstock.feedstock_id){
						feedstocks[i].total_amount += feedstock.total_amount;
						return feedstocks;
					};
				};
				feedstocks.push({ id: feedstock.feedstock_id, total_amount: feedstock.total_amount });
				return feedstocks;
			}, production.feedstocks);

			for(i in production.feedstocks){
				let feedstock = await Feedstock.findById(production.feedstocks[i].id);
				production.feedstocks[i].code = feedstock[0].code;
				production.feedstocks[i].name = feedstock[0].name;
				production.feedstocks[i].color = feedstock[0].color;
				production.feedstocks[i].standard = feedstock[0].standard;
				production.feedstocks[i].uom = feedstock[0].uom;
				production.feedstocks[i].total_amount = lib.roundValue(production.feedstocks[i].total_amount);
			};

			res.send({ production });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao simular a produção." });			
		};
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const production = {
			date: lib.genPatternDate(),
			full_date: lib.genFullDate(),
			storage_id: req.body.storage_id,
			user: req.user.name,
			products: JSON.parse(req.body.products),
			feedstocks: []
		};

		// console.log(production);
		// return res.send({ msg: "Esta função está sendo implementada." });

		try {
			let production_feedstock_list = [];
			for(i in production.products){
				let product_feedstocks = await Product.feedstock.list(production.products[i].id);
				for(j in product_feedstocks){
					production.products[i].feedstocks.push(product_feedstocks[j]);

					product_feedstocks[j].amount = product_feedstocks[j].amount * production.products[i].amount;
					production_feedstock_list.push(product_feedstocks[j]);
				};
			};

			production.feedstocks = production_feedstock_list.reduce((production_feedstocks, feedstock_list) => {
				for(i in production_feedstocks){
					if(production_feedstocks[i].feedstock_id == feedstock_list.feedstock_id){
						production_feedstocks[i].amount += feedstock_list.amount;
						return production_feedstocks;
					};
				};
				production_feedstocks.push(feedstock_list);
				return production_feedstocks;
			}, production.feedstocks);

			for(i in production.feedstocks){
				let feedstock = await Feedstock.findById(production.feedstocks[i].feedstock_id);
				production.feedstocks[i].code = feedstock[0].code;
				production.feedstocks[i].name = feedstock[0].name;
				production.feedstocks[i].color = feedstock[0].color;
				production.feedstocks[i].standard = feedstock[0].standard;
				production.feedstocks[i].uom = feedstock[0].uom;
			};

			const saved_production = await Product.production.save(production);
			production.id = saved_production.insertId;
			for(i in production.products){
				await Product.production.product.add(production.id, production.products[i]);
			};
			for(i in production.feedstocks){
				if(production.feedstocks[i].uom == 'cm'){
					// production.feedstocks[i].amount = lib.roundToInt(production.feedstocks[i].amount / production.feedstocks[i].standard);
					production.feedstocks[i].amount = lib.roundToInt(production.feedstocks[i].amount / production.feedstocks[i].standard);
				} else if(production.feedstocks[i].uom == 'un'){
					production.feedstocks[i].amount = production.feedstocks[i].amount;
				};
				await Product.production.feedstock.add(production.id, production.feedstocks[i]);
			};

			res.send({ production });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao solicitar produção." });
		};
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','sto','cut','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let params = [];
		let values = [];

		if(req.body.product_production_periodStart && req.body.product_production_periodEnd){
			var periodStart = req.body.product_production_periodStart;
			var periodEnd = req.body.product_production_periodEnd;
		} else {
			var periodStart = "";
			var periodEnd = "";
		};

		if(req.body.product_production_status){
			params.push("status");
			values.push(req.body.product_production_status);
		};

		try{
			const productions = await Product.production.filter(periodStart, periodEnd, params, values);
			res.send({ productions });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as produções, favor contatar o suporte." });
		};
	},
	confirm: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','cut','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		var option = {
			production_id: req.body.production_id,
			storage_id: req.body.storage_id,
			user: req.user.name
		};

		try {
			await Product.production.confirm(option);
			const production_feedstocks = await Product.production.feedstock.list(option.production_id);
			for(i in production_feedstocks){
				var option = {
					feedstock_id: production_feedstocks[i].feedstock_id,
					storage_id: req.body.storage_id,
					amount: production_feedstocks[i].releasedAmount
				};
				await Feedstock.decreaseStorageFeedstockAmount(option);
			};
			res.send({ done: "Produção confirmada com sucesso." });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Erro ao confirmar a produção, favor contatar o suporte," });
		};
	},
	cancel: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		var option = {
			production_id: req.body.production_id,
			storage_id: req.body.storage_id,
			user: req.user.name
		};

		try {
			await Product.production.cancel(option);
			res.send({ done: "Produção cancelada com sucesso." });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Erro ao cancelar a produção, favor contatar o suporte," });
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','sto','cut','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const production = await Product.production.findById(req.params.id);
			const production_products = await Product.production.product.list(req.params.id);
			const production_feedstocks = await Product.production.feedstock.list(req.params.id);
			res.send({ production, production_products, production_feedstocks });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Erro ao encontrar a produção" });
		};
	}
};

module.exports = productionController;