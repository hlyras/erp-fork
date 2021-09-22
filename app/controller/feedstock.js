const User = require('../model/user');
const userController = require('./user');

const lib = require("jarmlib");

const Feedstock = require('../model/feedstock');
const Product = require('../model/product/main');

const feedstockController = {
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.redirect('/');
		};
		
		const feedstockColors = await Feedstock.colorList();
		res.render('feedstock/manage', { feedstockColors, user: req.user });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
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
				
				const newFeedstock = await Feedstock.save(feedstock);
					
				//INSERT CREATED FEEDSTOCK IN STORAGES
				const storages = await Feedstock.storage.list();

				for(i in storages){
					const insert = {
						storage_id: storages[i].id,
						feedstock_id: newFeedstock.insertId,
						amount: 0
					};

					await Feedstock.storage.feedstock.add(insert);
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
		if(!await userController.verifyAccess(req, res, ['adm','man','n/a','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		Feedstock.findById(req.params.id)
			.then(async (feedstock) => {
				res.send(feedstock);
			})
			.catch(err => {
				return console.log(err);
			});
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let params = [];
		let values = [];

		try {
			if(parseInt(req.query.code)){
				params.push("code");
				values.push(req.query.code);
			};

			if(req.query.color){
				params.push("color");
				values.push(req.query.color);
			};

			if(req.query.name){
				const feedstocks = await Feedstock.filter(req.query.name, params, values);
				res.send({ feedstocks });
			} else {
				const feedstocks = await Feedstock.filter(false, params, values);
				res.send({ feedstocks });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as matérias-primas, favor contatar o suporte." });
		};
	},
	delete: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Feedstock.delete(req.query.id);
			await Feedstock.supplier.feedstock.removeByFeedstockId(req.query.id);
			await Feedstock.storage.removeByFeedstockId(req.query.id);
			await Product.feedstock.removeByFeedstockId(req.query.id);
			res.send({ done: "Matéria Prima excluída com sucesso." });
		} catch (err) {
			console.log(err);
			res.send({ msg: err });
		};
	},
	storage: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto','cut','COR-GER'])){
				return res.redirect('/');
			};

			const feedstockColors = await Feedstock.colorList();
			const feedstockStorages = await Feedstock.storage.list();
			res.render('feedstock/storage', { user: req.user, feedstockColors, feedstockStorages });
		},
		manage: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.redirect('/');
			};

			const feedstockColors = await Feedstock.colorList();
			const feedstockStorages = await Feedstock.storage.list();
			res.render('feedstock/storage_manage', { feedstockColors: feedstockColors, feedstockStorages: feedstockStorages, user: req.user });
		},
		create: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			if(req.body.name.length < 3 || req.body.name.length > 30){return res.send({ msg: 'Nome de Estoque inválido!' })};

			try {
				var result = await Feedstock.storage.save(req.body.name);	
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

					await Feedstock.storage.feedstock.add(insert);
				};
				
				res.send({ done: 'Estoque criado e matérias-primas inseridas com sucesso!' });
			} catch (err){
				console.log(err);
				return res.send({ msg: 'Ocorreu um erro ao registrar uma matéria-prima ao estoque, favor contatar o suporte.' });
			};
		},
		list: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				const storages = await Feedstock.storage.list();
				res.send(storages);
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao listar os estoques." });
			};
		},
		feedstock: {
			filter: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','sto','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
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

								var storageRows = await Feedstock.storage.feedstock.filter(params, values);

								for(j in storageRows){
									storageFeedstocks.push(storageRows[j]);
								};
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

								var storageRows = await Feedstock.storage.feedstock.filter(params, values);

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
			},
			amount: {
				set: async (req, res) => {
					if(!await userController.verifyAccess(req, res, ['adm','COR-GER'])){
						return res.redirect('/');
					};

					if(req.query.id){
						if(isNaN(req.query.amount) || req.query.amount < 0 || req.query.amount == ""){
							return res.send({ msg: "O valor inserido é inválido." });
						};

						const updatedFeedstock = {
							id: req.query.id,
							amount: 0
						};

						try {
							const storage_feedstock = await Feedstock.storage.feedstock.findById(req.query.id);
							const feedstock = await Feedstock.findById(storage_feedstock[0].feedstock_id);
							
							updatedFeedstock.amount = feedstock[0].standard * req.query.amount;
							
							await Feedstock.storage.feedstock.amount.set(updatedFeedstock);
							res.send({ done: "Atualizado com sucesso!" });
						} catch (err) {
							res.send({ msg: "Ocorreu um erro ao atualizar a quantidade, favor contatar o suporte." });
						};
					};
				}
			}
		}		
	},
	request: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
				return res.redirect('/');
			};

			const feedstockColors = await Feedstock.colorList();
			const feedstockStorages = await Feedstock.storage.list();
			res.render('feedstock/request', { user: req.user, feedstockColors, feedstockStorages });
		},
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const request = {
				date: lib.genPatternDate(),
				full_date: lib.genFullDate(),
				storage_id: req.body.storage_id,
				feedstocks: JSON.parse(req.body.feedstocks),
				user: req.user.name,
				obs: req.body.obs
			};

			try {
				for(i in request.feedstocks){
					let feedstock = await Feedstock.findById(request.feedstocks[i].id);
					request.feedstocks[i].standard = feedstock[0].standard;
					if(request.feedstocks[i].uom == 'cm'){
						request.feedstocks[i].releasedAmount = feedstock[0].standard * request.feedstocks[i].amount;
					} else if(request.feedstocks[i].uom == 'un'){
						request.feedstocks[i].releasedAmount = request.feedstocks[i].amount;
					};
					let storage_feedstock = await Feedstock.storage.feedstock.filter(['storage_id', 'feedstock_id'], [request.storage_id, feedstock[0].id]);
					if(storage_feedstock[0].amount < request.feedstocks[i].releasedAmount){
						if(request.feedstocks[i].uom == 'cm'){
							return res.send({ msg: "Não há estoque de "+feedstock[0].name+" "+feedstock[0].color+" suficiente para realizar o pedido.\n Quantidade em estoque: "+storage_feedstock[0].amount / feedstock[0].standard });
						} else if(request.feedstocks[i].uom == 'un'){
							return res.send({ msg: "Não há estoque de "+feedstock[0].name+" "+feedstock[0].color+" suficiente para realizar o pedido.\n Quantidade em estoque: "+storage_feedstock[0].amount });
						};
					};
				};

				let savedRequest = await Feedstock.request.save(request);

				for(i in request.feedstocks){
					let option = {
						request_id: savedRequest.insertId,
						feedstock_id: request.feedstocks[i].id,
						feedstock_info: request.feedstocks[i].name+" "+request.feedstocks[i].color,
						feedstock_uom: request.feedstocks[i].uom,
						amount: request.feedstocks[i].releasedAmount
					};
					await Feedstock.request.feedstock.add(option);
				};

				res.send({ done: "Pedido solicitado com sucesso!" });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao confirmar a solicitação favor contatar o suporte." });
			};
		},
		filter: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			let params = [];
			let values = [];

			if(req.body.feedstock_request_periodStart && req.body.feedstock_request_periodEnd){
				var periodStart = req.body.feedstock_request_periodStart;
				var periodEnd = req.body.feedstock_request_periodEnd;
			} else {
				var periodStart = "";
				var periodEnd = "";
			};

			if(req.body.feedstock_request_status){
				params.push("status");
				values.push(req.body.feedstock_request_status);
			};

			const requests = await Feedstock.request.filter(periodStart, periodEnd, params, values);

			res.send({ requests });
		},
		findById: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				const request = await Feedstock.request.findById(req.params.id);
				const request_feedstocks = await Feedstock.request.feedstock.list(req.params.id);
				const feedstocks = [];
				for(i in request_feedstocks){
					let feedstock = await Feedstock.findById(request_feedstocks[i].feedstock_id);
					request_feedstocks[i].feedstock_standard = feedstock[0].standard;
				};
				res.send({ request, request_feedstocks });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Erro ao encontrar a compra" });
			};
		},
		confirm: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			var option = {
				request_id: req.body.request_id,
				storage_id: req.body.storage_id,
				user: req.user.name
			};

			try {
				await Feedstock.request.confirm(option);
				const request_feedstocks = await Feedstock.request.feedstock.list(option.request_id);
				for(i in request_feedstocks){
					var option = {
						feedstock_id: request_feedstocks[i].feedstock_id,
						storage_id: req.body.storage_id,
						amount: request_feedstocks[i].amount
					};
					await Feedstock.storage.feedstock.amount.decrease(option);
				};
				res.send({ done: "Pedido confirmado com sucesso." });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Erro ao confirmar o pedido, favor contatar o suporte," });
			};
		},
	},
	regress: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
				return res.redirect('/');
			};

			const feedstockColors = await Feedstock.colorList();
			const feedstockStorages = await Feedstock.storage.list();
			res.render('feedstock/regress', { user: req.user, feedstockColors, feedstockStorages });
		},
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const regress = {
				date: lib.genPatternDate(),
				full_date: lib.genFullDate(),
				storage_id: req.body.storage_id,
				feedstocks: JSON.parse(req.body.feedstocks),
				user: req.user.name,
				obs: req.body.obs
			};

			try {
				for(i in regress.feedstocks){
					let feedstock = await Feedstock.findById(regress.feedstocks[i].id);
					regress.feedstocks[i].standard = feedstock[0].standard;
					if(regress.feedstocks[i].uom == 'cm'){
						regress.feedstocks[i].releasedAmount = feedstock[0].standard * regress.feedstocks[i].amount;
					} else if(regress.feedstocks[i].uom == 'un'){
						regress.feedstocks[i].releasedAmount = regress.feedstocks[i].amount;
					};
				};

				let savedRegress = await Feedstock.regress.save(regress);

				for(i in regress.feedstocks){
					let option = {
						regress_id: savedRegress.insertId,
						feedstock_id: regress.feedstocks[i].id,
						feedstock_info: regress.feedstocks[i].name+" "+regress.feedstocks[i].color,
						feedstock_uom: regress.feedstocks[i].uom,
						amount: regress.feedstocks[i].releasedAmount
					};
					await Feedstock.regress.feedstock.add(option);
				};

				res.send({ done: "Pedido solicitado com sucesso!" });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao confirmar a solicitação favor contatar o suporte." });
			};
		},
		filter: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			let params = [];
			let values = [];

			if(req.body.feedstock_regress_periodStart && req.body.feedstock_regress_periodEnd){
				var periodStart = req.body.feedstock_regress_periodStart;
				var periodEnd = req.body.feedstock_regress_periodEnd;
			} else {
				var periodStart = "";
				var periodEnd = "";
			};

			if(req.body.feedstock_regress_status){
				params.push("status");
				values.push(req.body.feedstock_regress_status);
			};

			const regresses = await Feedstock.regress.filter(periodStart, periodEnd, params, values);

			res.send({ regresses });
		},
		findById: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				const regress = await Feedstock.regress.findBy.Id(req.params.id);
				const regress_feedstocks = await Feedstock.regress.feedstock.list(req.params.id);
				const feedstocks = [];
				for(i in regress_feedstocks){
					let feedstock = await Feedstock.findById(regress_feedstocks[i].feedstock_id);
					regress_feedstocks[i].feedstock_standard = feedstock[0].standard;
				};
				res.send({ regress, regress_feedstocks });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Erro ao encontrar a solicitação, favor contatar o suporte." });
			};
		},
		confirm: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			var option = {
				regress_id: req.body.regress_id,
				storage_id: req.body.storage_id,
				user: req.user.name
			};

			try {
				await Feedstock.regress.confirm(option);
				const regress_feedstocks = await Feedstock.regress.feedstock.List(option.regress_id);
				for(i in regress_feedstocks){
					var option = {
						feedstock_id: regress_feedstocks[i].feedstock_id,
						storage_id: req.body.storage_id,
						amount: regress_feedstocks[i].amount
					};
					await Feedstock.storage.feedstock.amount.increase(option);
				};
				res.send({ done: "Pedido de retorno confirmado com sucesso." });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Erro ao confirmar o pedido, favor contatar o suporte," });
			};
		}
	},
	supplier: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.redirect('/');
			};
			
			const feedstockColors = await Feedstock.colorList();
			res.render('feedstock/supplier', { user: req.user, feedstockColors });
		},
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
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
				await Feedstock.supplier.save(supplier);
				res.send({ done: "Fornecedor cadastrado com sucesso!" });
			} catch (err) {
				console.log(err);
				res.send({ msg: err });
			};
		},
		findById: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const supplier = await Feedstock.supplier.findById(req.params.id);
			res.send({ done: 'OK', supplier });
		},
		filter: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			if(req.query.supplier_name){
				try {
					const suppliers = await Feedstock.supplier.findByName(req.query.supplier_name);
					res.send({ suppliers });
				} catch (err) {
					console.log(err);
					res.send({ msg: err });
				};
			} else {
				try {
					const suppliers = await Feedstock.supplier.list();
					res.send({ suppliers });
				} catch (err) {
					console.log(err);
					res.send({ msg: err });
				};
			};
		},
		feedstock: {
			add: async(req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				const insertion = {
					id: req.body.id,
					supplier_id: req.body.supplier_id,
					feedstock_id: req.body.feedstock_id,
					value: req.body.feedstock_value
				};

				if(insertion.id){
					try {
						await Feedstock.supplier.feedstock.update(insertion);
						res.send({ done: 'Matéria-prima atualizada com sucesso!' });
					} catch (err) {
						console.log(err);
						res.send({ msg: 'Erro ao incluir matéria-prima!' });
					};
				} else {
					try {
						await Feedstock.supplier.feedstock.add(insertion);
						res.send({ done: 'Matéria-prima incluída com sucesso!' });
					} catch (err) {
						console.log(err);
						res.send({ msg: 'Erro ao incluir matéria-prima!' });
					};
				};
			},
			list: async(req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				try {
					var feedstocks = [];
					const supplier_storage = await Feedstock.supplier.storage.list(req.params.id);
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
			remove: async(req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				try {
					await Feedstock.supplier.feedstock.remove(req.params.id);
					res.send({ done: "Matéria-Prima removida com sucesso." })
				} catch (err) {
					console.log(err);
					res.send({ msg: 'Erro ao remover matéria-prima' });
				};
			}
		},
		storage: {
			list: async(req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				try {
					var feedstocks = [];
					const supplier_storage = await Feedstock.supplier.feedstock.storage.list(req.params.id);
					for(i in supplier_storage){
						var feedstock = await Feedstock.findById(supplier_storage[i].feedstock_id);
						feedstocks.push(feedstock[0]);
					};

					res.send({ supplier_storage, feedstocks });
				} catch (err) {
					console.log(err);
					res.send({ msg: 'Erro ao listar os produtos!' });
				};
			}
		}
	},
	purchase: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.redirect('/');
			};
			
			const feedstockSuppliers = await Feedstock.supplier.list();
			const feedstockColors = await Feedstock.colorList();
			const feedstockStorages = await Feedstock.storage.list();
			res.render('feedstock/purchase', { user: req.user, feedstockColors, feedstockStorages, feedstockSuppliers });
		},
		manage: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.redirect('/');
			};

			const feedstockSuppliers = await Feedstock.supplier.list();

			res.render('feedstock/purchase_manage', { user: req.user, feedstockSuppliers });
		},
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
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
				const purchase_row = await Feedstock.purchase.save(purchase);
				for(i in feedstocks){
					var option = {
						purchase_id: purchase_row.insertId,
						feedstock_id: feedstocks[i].id,
						feedstock_info: feedstocks[i].code+" | "+feedstocks[i].name+" | "+feedstocks[i].color,
						amount: feedstocks[i].amount,
						feedstock_uom: feedstocks[i].uom,
						feedstock_value: feedstocks[i].value
					};

					await Feedstock.purchase.feedstock.save(option);
				};
				res.send({ done: "Compra de código: "+purchase_row.insertId+" cadastrada com sucesso.\n Confirme após conferência para efetivar entrada no estoque." });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Erro ao cadastrar a compra." });
			};
		},
		findById: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				const purchase = await Feedstock.purchase.findById(req.params.id);
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
		filter: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','sto'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
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

			const purchases = await Feedstock.purchase.filter(periodStart, periodEnd, params, values);

			res.send({ purchases });
		},
		confirm: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','sto'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			var option = {
				purchase_id: req.body.purchase_id,
				storage_id: req.body.storage_id,
				user: req.user.name
			};

			try {
				await Feedstock.purchase.confirm(option);
				const purchase_feedstocks = await Feedstock.purchaseListProducts(option.purchase_id);
				for(i in purchase_feedstocks){
					var option = {
						feedstock_id: purchase_feedstocks[i].feedstock_id,
						storage_id: req.body.storage_id,
						amount: purchase_feedstocks[i].amount
					};
					await Feedstock.storage.feedstock.amount.increase(option);
				};
				res.send({ done: "Compra confirmada com sucesso." });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Erro ao confirmar a compra, favor contatar o suporte," });
			};
		}
	}	
};

module.exports = feedstockController;