const User = require('../model/user');
const userController = require('./user');

const lib = require('../../config/lib');

const Product = require('../model/product');
const Feedstock = require('../model/feedstock');

const productController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.redirect("/");
		};

		try{
			const feedstockColors = await Feedstock.colorList();
			const productColors = await Product.colorList();
			res.render('product/index', { productColors, feedstockColors, user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man','COR-GER'])){
			return res.redirect("/");
		};

		try {
			const feedstockColors = await Feedstock.colorList();
			const productColors = await Product.colorList();
			res.render('product/manage', { productColors, feedstockColors, user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const product = {
			id: parseInt(req.body.id),
			code: parseInt(req.body.code),
			name: req.body.name,
			color: req.body.color,
			size: req.body.size
		};

		if(!product.code || product.code < 1 || product.code > 9999){return res.send({ msg: 'Código de produto inválido.' })};
		if(!product.name || product.name.length > 30){return res.send({ msg: 'Preencha o nome do produto.' })};
		if(!product.color || product.color.length > 10){return res.send({ msg: 'Preencha a cor do produto.' })};
		if(!product.size || product.size.length > 3){return res.send({ msg: 'Preencha o tamanho do produto.' })};

		try {
			if(!product.id){
				var row = await Product.findByCode(product.code);
				if(row.length){return res.send({ msg: 'Este código de produto já está cadastrado.' })};
				
				var row = await Product.save(product);
				let newProduct = await Product.findById(row.insertId);

				res.send({ done: 'Produto cadastrado com sucesso!', product: newProduct });
			} else {
				var row = await Product.findByCode(product.code);
				if(row.length){
					if(row[0].id != product.id){
						return res.send({ msg: 'Este código de produto já está cadastrado.' });
					};
				};
				
				await Product.update(product);
				let updatedProduct = await Product.findById(product.id);

				res.send({ done: 'Produto atualizado com sucesso!', product: updatedProduct });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar o produto." });
		};
	},
	list: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm','man','n/a','COR-GER'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			const products = await Product.list();
			res.send({ products });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar os produtos." });
		};
	},
	findById: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			const product = await Product.findById(req.params.id);
			if(product.length){
				product[0].images = await Product.image.list(product[0].id);
			};
			res.send({ product });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
		};
	},
	findByCode: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			const product = await Product.findByCode(req.params.code);
			if(product.length){
				product[0].images = await Product.image.list(product[0].id);
			};
			res.send({ product });
		} catch (err){
			console.log(err);
			res.send({ msg: err });
		};
	},
	findByName: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			let products = await Product.findByName(req.query.name);
			if(products.length){
				products[0].images = await Product.image.list(products[0].id);
				products[0].feedstocks = await Product.getFeedstocks(product[0].id);
			};
			res.send({ products });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao encontrar o produto." });
		};
	},
	filter: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
			// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };


		var params = [];
		var values = [];

		if(isNaN(req.query.code) || req.query.code < 0 || req.query.code > 9999){
			req.query.code = "";
		};

		if(req.query.code){
			params.push("code");
			values.push(req.query.code);
		};

		if(req.query.color){
			params.push("color");
			values.push(req.query.color);
		};

		try {
			if(req.query.name){
				const products = await Product.filter(req.query.name, params, values);
				res.send({ products });
			} else {
				const products = await Product.filter(false, params, values);
				res.send({ products });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
		};
	},
	delete: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Product.feedstock.removeByProductId(req.query.id);
			await Product.image.removeByProductId(req.query.id);
			await Product.delete(req.query.id);
			res.send({ done: 'Produto excluído com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
		};
	},
	image: {
		add: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const image = {
				product_id: req.body.product_id,
				url: req.body.image_url
			};

			try {
				await Product.image.add(image);
				res.send({ done: 'Imagem adicionada com sucesso!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao incluir a imagem, favor contatar o suporte." });
			};
		},
		remove: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Product.image.remove(req.query.image_id);
				res.send({ done: 'Imagem excluída!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover a imagem do produto, favor contatar o suporte." });
			};
		}
	},
	feedstock: {
		add: async(req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const product_feedstock = {
				id: req.body.id,
				product_id: req.body.product_id,
				feedstock_id: req.body.feedstock_id,
				uom: req.body.uom,
				amount: parseInt(req.body.amount),
				measure: parseFloat(req.body.measure),
				category_id: req.body.category_id
			};

			if(!product_feedstock.product_id){
				return res.send({ msg: "Não é possível cadastrar sem informar o produto!" })
			};

			if(!product_feedstock.feedstock_id){
				return res.send({ msg: "Selecione a Matéria-Prima" });
			};

			if(!product_feedstock.uom){
				return res.send({ msg: "Selecione a Unidade de medida" });
			};

			if(product_feedstock.uom == "cm"){
				if(!product_feedstock.amount){
					return res.send({ msg: "Informe a quantidade" });
				};
				if(!product_feedstock.measure){
					return res.send({ msg: "Informe a medida" });
				};
			};

			if(product_feedstock.uom == "un"){
				product_feedstock.measure = 0;
				if(!product_feedstock.amount){
					return res.send({ msg: "Informe a quantidade" });
				};
			};

			try {
				if(!product_feedstock.id || product_feedstock.id < 1) {
					await Product.feedstock.add(product_feedstock);
					res.send({ done: "Matéria-Prima adicionada com sucesso." });
				} else {
					await Product.feedstock.update(product_feedstock);
					res.send({ done: "Matéria-Prima atualizada com sucesso." });
				};
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima, favor contatar o suporte." });
			};
		},
		findById: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				let product_feedstock = await Product.feedstock.findById(req.params.id);
				res.send({ product_feedstock });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao encontrar a matéria-prima do produto, favor contatar o suporte." });
			};
		},
		list: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				let product = { feedstocks: [] };
				let feedstocks = [];
				product.feedstocks = await Product.feedstock.list(req.params.product_id);

				for(i in product.feedstocks){
					let feedstock = await Feedstock.findById(product.feedstocks[i].feedstock_id);
					feedstocks.push(feedstock[0]);
				};

				for(i in product.feedstocks){
					for(j in feedstocks){
						if(product.feedstocks[i].feedstock_id == feedstocks[j].id){
							product.feedstocks[i].code = feedstocks[j].code;
							product.feedstocks[i].name = feedstocks[j].name;
							product.feedstocks[i].color = feedstocks[j].color;
							product.feedstocks[i].uom = feedstocks[j].uom;
						};
					};
				};


				res.send({ feedstocks: product.feedstocks });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao listar as matérias-primas do produto, favor contatar o suporte." });
			};
		},
		remove: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Product.feedstock.remove(req.query.id);
				res.send({ done: 'Matéria-prima excluída!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
			};
		},
		category: {
			save: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				const category = {
					id: req.body.id,
					product_id: req.body.product_id,
					name: req.body.category_name
				};

				console.log(category);

				if(!category.product_id){
					return res.send({ msg: "Produto inválido!" });
				};

				if(!category.name || category.name.length < 3){
					return res.send({ msg: "O nome da categoria é inválido!" });
				};

				try {
					if(!category.id){
						await Product.feedstock.category.save(category);
					} else {
						await Product.feedstock.category.update(category);
					};
					res.send({ done: "Categoria cadastrada com sucesso!" });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao cadastrar a categoria da matéria-prima." });
				};
			},
			list: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				try {
					let product_feedstock_categories = await Product.feedstock.category.list(req.params.product_id);
					res.send({ product_feedstock_categories });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
				};
			},
			delete: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				try {
					await Product.feedstock.remove(req.query.id);
					res.send({ done: 'Matéria-prima excluída!' });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
				};
			},
			add: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				try {
					await Product.feedstock.remove(req.query.id);
					res.send({ done: 'Matéria-prima excluída!' });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
				};
			},
			remove: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				try {
					await Product.feedstock.remove(req.query.id);
					res.send({ done: 'Matéria-prima excluída!' });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao remover a matéria-prima." });
				};
			}
		}
	},
	production: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.redirect("/");
			};

			try {
				const productColors = await Product.colorList();
				const feedstockStorages = await Feedstock.storage.list();
				res.render('product/production', { user: req.user, productColors, feedstockStorages });
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
				res.render('product/production_simulate', { user: req.user, productColors, feedstockStorages });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao acessar esta área, favor contatar o suporte." });
			};
		},
		manage: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','COR-GER'])){
				return res.redirect("/");
			};

			res.render('product/production_manage', { user: req.user });
		},
		simulate: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','cut','COR-GER'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const production = {
				storage_id: req.body.storage_id,
				products: JSON.parse(req.body.products),
				feedstocks: []
			};

			try {
				// Colecting production feedstock data
				let production_feedstock_list = [];
				for(i in production.products){
					let product_feedstocks = await Product.feedstock.list(production.products[i].id);
					for(j in product_feedstocks){
						production.products[i].feedstocks.push(product_feedstocks[j]);
						if(product_feedstocks[j].uom == 'un'){
							product_feedstocks[j].amount = product_feedstocks[j].amount * production.products[i].amount;
							production_feedstock_list.push(product_feedstocks[j]);
						} else if(product_feedstocks[j].uom == 'cm'){
							product_feedstocks[j].measure = product_feedstocks[j].amount * product_feedstocks[j].measure;
							product_feedstocks[j].measure = product_feedstocks[j].measure * production.products[i].amount;
							
							console.log(product_feedstocks[j]);

							production_feedstock_list.push(product_feedstocks[j]);
						};
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

				// console.log(production);

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
	},
	categorySave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const category = {
			name: req.body.product_category_name,
			shortcut: req.body.product_category_shortcut
		};

		try {
			await Product.categorySave(category);
			res.send({ done: 'Categoria cadastrada com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar a categoria." });
		};
	},
	categoryList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const categories = await Product.categoryList();
			res.send({ categories });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar categorias." });
		};
	},
	colorSave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const color = {
			name: req.body.color_name,
			shortcut: req.body.color_shortcut			
		};

		try {
			await Product.colorSave(color);
			res.send({ done: 'Cor cadastrada com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao salvar a cor, favor contatar o suporte." });
		};
	},
	colorList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};
	
		try {
			const colors = await Product.colorList();
			res.send(colors);
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar as cores, favor contatar o suporte." });
		};
	}
};

module.exports = productController;