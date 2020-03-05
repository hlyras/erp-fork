const User = require('../model/user');
const userController = require('./user');

const lib = require('../../config/lib');

const Feedstock = require('../model/feedstock');
const Product = require('../model/product');

const feedstockController = {
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		
		const feedstockColors = await Feedstock.colorList();
		res.render('feedstock/manage', { feedstockColors, user: req.user });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const feedstock = {
			id: parseInt(req.body.id),
			code: parseInt(req.body.feedstock_code),
			name: req.body.name,
			color: req.body.color,
			standard: req.body.standard,
			uom: req.body.uom
		};

		if(!feedstock.code || feedstock.code < 1 || feedstock.code > 9999){return res.send({ msg: 'Código de produto inválido.' })};
		if(!feedstock.name || feedstock.name.length > 20){return res.send({ msg: 'Preencha o nome do produto.' })};
		if(!feedstock.color || feedstock.color.length > 10){return res.send({ msg: 'Preencha a cor do produto.' })};
		if(!feedstock.standard || feedstock.standard.length > 5){return res.send({ msg: 'Preencha a medida padrão.' })};
		if(!feedstock.uom || feedstock.uom.length > 2){return res.send({ msg: 'Preencha a unidade de medida.' })};

		try {
			if(!feedstock.id){
				const feedstocks = await Feedstock.findByCode(feedstock.code);
				if(feedstocks.length){return res.send({ msg: 'Este código de produto já está cadastrado.' })};
				
				await Feedstock.save(feedstock);
				
				//INSERT CREATED FEEDSTOCK IN STORAGES
				const storages = await Feedstock.storageList();

				for(i in storages){
					const insert = {
						storage_id: storages[i].id,
						feedstock_id: feedstock.id,
						amount: 0
					};
					await Feedstock.insertInStorage(insert);
				};
				
				res.send({ done: 'Matéria prima cadastrada com sucesso!' });
			} else {
				const feedstocks = await Feedstock.findByCode(feedstock.code);
				if(feedstocks.length){
					if(feedstocks[0].id != feedstock.id){
						return res.send({ msg: 'Este código de produto já está cadastrado.' });
					};
				};
				
				await Feedstock.update(feedstock);
				
				res.send({ done: 'Matéria prima atualizada com sucesso!' });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima, favor contatar o suporte" });
		};
	},
	findById: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
		// 	return res.redirect('/');
		// };

		Feedstock.findById(req.params.id)
			.then(async (feedstock) => {
				res.send(feedstock);
			})
			.catch(err => {
				return console.log(err);
			});
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		let params = [];
		let values = [];

		if(req.query.name){
			Feedstock.findByName(req.query.name)
				.then(feedstocks => {
					res.send(feedstocks);
				})
				.catch(err => {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as matérias primas, favor contatar o suporte" });
				});
		} else {
			if(parseInt(req.query.code)){
				params.push("code");
				values.push(req.query.code);
			};

			if(req.query.color){
				params.push("color");
				values.push(req.query.color);
			};

			Feedstock.filter(params, values)
				.then(feedstocks => {
					res.send(feedstocks);
				})
				.catch(err => {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as matérias primas, favor contatar o suporte" });
				});
		};
	},
	remove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		try {
			await Feedstock.remove(req.query.id);
			await Feedstock.supplierFeedstockClear(req.query.id);
			await Product.feedstockClear(req.query.id);
			res.send({ done: "Matéria Prima excluída com sucesso." });
		} catch (err) {
			console.log(err);
			res.send({ msg: err });
		};
	},
	supplier: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		
		const feedstockColors = await Feedstock.colorList();

		res.render('feedstock/supplier', { user: req.user, feedstockColors });
	},
	supplierCreate: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		const supplier = {
			id: req.body.supplier_id,
			name: req.body.supplier_name,
			phone: req.body.supplier_phone
		};

		if(supplier.id){
			return res.send({ msg: "função ainda não implementada." });
		};

		if(!supplier.name || supplier.name.length < 3){
			return res.send({ msg: "O nome do fornecedor é inválido." });
		};

		if(!supplier.phone || supplier.phone.length < 11){
			return res.send({ msg: "O telefone do fornecedor é inválido." });
		};

		try {
			await Feedstock.supplierCreate(supplier);
			res.send({ done: "Fornecedor cadastrado com sucesso!" });
		} catch (err) {
			console.log(err);
			res.send({ msg: err });
		};
	},
	supplierFindById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		const supplier = await Feedstock.supplierFindById(req.params.id);

		res.send({ done: 'OK', supplier });
	},
	supplierFilter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		if(req.query.supplier_name){
			try {
				const suppliers = await Feedstock.supplierFindByName(req.query.supplier_name);
				res.send({ suppliers });
			} catch (err) {
				console.log(err);
				res.send({ msg: err });
			};
		} else {
			try {
				const suppliers = await Feedstock.supplierList();
				res.send({ suppliers });
			} catch (err) {
				console.log(err);
				res.send({ msg: err });
			};
		};
	},
	supplierAddFeedstock: async(req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const insertion = {
			id: req.body.id,
			supplier_id: req.body.supplier_id,
			feedstock_id: req.body.feedstock_id,
			value: req.body.feedstock_value
		};

		if(insertion.id){
			try {
				await Feedstock.supplierUpdateFeedstock(insertion);
				res.send({ done: 'Matéria-prima atualizada com sucesso!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: 'Erro ao incluir matéria-prima!' });
			};
		} else {
			try {
				await Feedstock.supplierAddFeedstock(insertion);
				res.send({ done: 'Matéria-prima incluída com sucesso!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: 'Erro ao incluir matéria-prima!' });
			};
		};
	},
	supplierRemoveFeedstock: async(req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		try {
			await Feedstock.supplierRemoveFeedstock(req.params.id);
			res.send({ done: "Matéria-Prima removida com sucesso." })
		} catch (err) {
			console.log(err);
			res.send({ msg: 'Erro ao remover matéria-prima' });
		};
	},
	supplierStorageList: async(req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		try {
			var feedstocks = [];
			const supplier_storage = await Feedstock.supplierStorageList(req.params.id);
			for(i in supplier_storage){
				var feedstock = await Feedstock.findById(supplier_storage[i].feedstock_id);
				feedstocks.push(feedstock[0]);
			};

			res.send({ supplier_storage, feedstocks });
		} catch (err) {
			console.log(err);
			res.send({ msg: 'Erro ao listar os produtos!' });
		};
	},
	purchase: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		
		const feedstockSuppliers = await Feedstock.supplierList();
		const feedstockColors = await Feedstock.colorList();
		const feedstockStorages = await Feedstock.storageList();
		res.render('feedstock/purchase', { user: req.user, feedstockColors, feedstockStorages, feedstockSuppliers });
	},
	purchaseManage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const feedstockSuppliers = await Feedstock.supplierList();

		res.render('feedstock/purchase_manage', { user: req.user, feedstockSuppliers });
	},
	purchaseSave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const feedstocks = JSON.parse(req.body.feedstocks);

		const purchase = {
			date: lib.genPatternDate(),
			full_date: lib.genFullDate(),
			supplier_id: req.body.supplier_id,
			supplier_name: req.body.supplier_name,
			value: req.body.total_value,
			storage_id: req.body.storage_id,
			user: req.user.name
		};

		try {
			const purchase_row = await Feedstock.purchaseSave(purchase);
			for(i in feedstocks){
				var option = {
					purchase_id: purchase_row.insertId,
					feedstock_id: feedstocks[i].id,
					feedstock_info: feedstocks[i].code+" | "+feedstocks[i].name+" | "+feedstocks[i].color,
					amount: feedstocks[i].amount,
					feedstock_uom: feedstocks[i].uom,
					feedstock_value: feedstocks[i].value
				};

				await Feedstock.purchaseSaveProduct(option);
			};
			res.send({ done: "Compra de código: "+purchase_row.insertId+" cadastrada com sucesso.\n Confirme após conferência para efetivar entrada no estoque." });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Erro ao cadastrar a compra." });
		};
	},
	purchaseConfirm: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		var option = {
			purchase_id: req.body.purchase_id,
			storage_id: req.body.storage_id,
			user: req.user.name
		};

		try {
			await Feedstock.purchaseConfirm(option);
			const purchase_feedstocks = await Feedstock.purchaseListProducts(option.purchase_id);
			for(i in purchase_feedstocks){
				var option = {
					feedstock_id: purchase_feedstocks[i].feedstock_id,
					storage_id: req.body.storage_id,
					amount: purchase_feedstocks[i].amount
				};
				await Feedstock.increaseStorageFeedstockAmount(option);
			};
			res.send({ done: "Compra confirmada com sucesso." });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Erro ao confirmar a compra, favor contatar o suporte," });
		};
	},
	purchaseFindById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		try {
			const purchase = await Feedstock.purchaseFindById(req.params.id);
			const purchase_feedstocks = await Feedstock.purchaseListProducts(req.params.id);
			const feedstocks = [];
			for(i in purchase_feedstocks){
				let feedstock = await Feedstock.findById(purchase_feedstocks[i].feedstock_id);
				// feedstocks.push(feedstock);
				purchase_feedstocks[i].feedstock_standard = feedstock[0].standard;
			};
			res.send({ purchase, purchase_feedstocks });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Erro ao encontrar a compra" });
		};
	},
	purchaseFilter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		let params = [];
		let values = [];

		if(req.body.feedstock_purchase_periodStart && req.body.feedstock_purchase_periodEnd){
			var periodStart = req.body.feedstock_purchase_periodStart;
			var periodEnd = req.body.feedstock_purchase_periodEnd;
		} else {
			var periodStart = "";
			var periodEnd = "";
		};

		if(req.body.feedstock_purchase_supplier_id){
			params.push("supplier_id");
			values.push(req.body.feedstock_purchase_supplier_id);
		};

		if(req.body.feedstock_purchase_status){
			params.push("status");
			values.push(req.body.feedstock_purchase_status);
		};

		const purchases = await Feedstock.purchaseFilter(periodStart, periodEnd, params, values);

		res.send({ purchases });
	},
	production: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		
		const feedstockSuppliers = await Feedstock.supplierList();
		const feedstockColors = await Feedstock.colorList();
		const feedstockStorages = await Feedstock.storageList();
		res.render('feedstock/purchase', { user: req.user, feedstockColors, feedstockStorages, feedstockSuppliers });
	},
	storage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		res.render('feedstock/storage', { user: req.user });
	},
	storageManage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const feedstockColors = await Feedstock.colorList();
		const feedstockStorages = await Feedstock.storageList();
		res.render('feedstock/storage_manage', { feedstockColors: feedstockColors, feedstockStorages: feedstockStorages, user: req.user });
	},
	storageCreate: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		if(req.body.name.length < 3 || req.body.name.length > 20){return res.send({ msg: 'Nome de Estoque inválido!' })};

		try {
			var result = await Feedstock.storageCreate(req.body.name);	
		} catch (err){
			console.log(err);
			return res.send({ msg: 'Ocorreu um erro ao criar este banco de dados favor entrar em contato com o suporte.' });
		};

		try {
			const feedstocks = await Feedstock.list();

			for(i in feedstocks){
				var insert = {
					storage_id: result.insertId,
					feedstock_id: feedstocks[i].id,
					amount: 0
				};

				await Feedstock.insertInStorage(insert);
			};
			
			res.send({ done: 'Estoque criado e matérias-primas inseridas com sucesso!' });
		} catch (err){
			console.log(err);
			return res.send({ msg: 'Ocorreu um erro ao registrar uma matéria-prima ao estoque, favor contatar o suporte.' });
		};
	},
	storageList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const storages = await Feedstock.storageList();

		res.send(storages);
	},
	storageFilter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		let params = [];
		let values = [];

		if(req.query.name){
			Feedstock.findByName(req.query.name)
				.then(async feedstocks => {
					var storageFeedstocks = [];
					
					for(i in feedstocks){
						params = [];
						values = [];

						if(req.query.storage){
							params.push('storage_id');
							values.push(req.query.storage);
						};

						params.push('feedstock_id');
						values.push(feedstocks[i].id);

						var storageRows = await Feedstock.findInStorage(params, values);

						for(j in storageRows){
							storageFeedstocks.push(storageRows[j]);
						}
					};

					res.send({ feedstocks, storageFeedstocks });
				})
				.catch(err => {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as matérias primas, favor contatar o suporte" });
				});
		} else {
			if(parseInt(req.query.code)){
				params.push("code");
				values.push(req.query.code);
			};

			if(req.query.color){
				params.push("color");
				values.push(req.query.color);
			};

			Feedstock.filter(params, values)
				.then(async feedstocks => {
					var storageFeedstocks = [];
					
					for(i in feedstocks){
						params = [];
						values = [];

						if(req.query.storage){
							params.push('storage_id');
							values.push(req.query.storage);
						};

						params.push('feedstock_id');
						values.push(feedstocks[i].id);

						var storageRows = await Feedstock.findInStorage(params, values);

						for(j in storageRows){
							storageFeedstocks.push(storageRows[j]);
						}
					};

					res.send({ feedstocks, storageFeedstocks });
				})
				.catch(err => {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar as matérias primas, favor contatar o suporte" });
				});
		};
	}
};

module.exports = feedstockController;