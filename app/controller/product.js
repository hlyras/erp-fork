const User = require('../model/user');
const userController = require('./user');

const lib = require('../../config/lib');

const Product = require('../model/product');
const Feedstock = require('../model/feedstock');

const productController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man','adm-man'])){
			return res.redirect("/");
		};

		try {
			const feedstockColors = await Feedstock.colorList();
			const productColors = await Product.colorList();
			res.render('product/index', { productColors, feedstockColors, user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	molle: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man','adm-man'])){
			return res.redirect("/");
		};

		try{
			res.render('product/molle', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	webgl: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man','adm-man'])){
			return res.redirect("/");
		};

		try{
			res.render('product/webgl', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man','adm-man','COR-GER'])){
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
	show: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'man','adm-man'])){
		// 	return res.redirect("/");
		// };

		let product = await Product.findByCode(req.params.product_code);
		product = { ...product[0] };
		product.images = await Product.image.list(product.id);
		
		try{
			res.render('product/show', { product });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	datasheet: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'man','adm-man'])){
		// 	return res.redirect("/");
		// };

		let product = await Product.findByCode(req.params.product_code);
		product = { ...product[0] };
		product.images = await Product.image.list(product.id);
		product.feedstocks = await Product.feedstock.list(product.id);
		for(i in product.feedstocks){
			let product_feedstock = await Feedstock.findById(product.feedstocks[i].feedstock_id);
			product.feedstocks[i].feedstock_info = product_feedstock[0].code +" | "+product_feedstock[0].name +" | "+product_feedstock[0].color;
		};
		product.feedstock_categories = await Product.feedstock.category.list(product.id);

		try{
			res.render('product/datasheet', { user: req.user, product });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const product = {
			id: parseInt(req.body.id),
			code: parseInt(req.body.code),
			name: req.body.name,
			color: req.body.color,
			size: req.body.size,
			brand: req.body.brand,
			status: req.body.status,
			image: req.body.image,
			announcement: req.body.announcement
		};

		if(!product.code || product.code < 1 || product.code > 9999){return res.send({ msg: 'Código de produto inválido.' })};
		if(!product.name || product.name.length > 30){return res.send({ msg: 'Preencha o nome do produto.' })};
		if(!product.color || product.color.length > 10){return res.send({ msg: 'Preencha a cor do produto.' })};
		if(!product.size || product.size.length > 4){return res.send({ msg: 'Preencha o tamanho do produto.' })};
		if(!product.brand.length || product.brand.length < 3 || product.brand.length > 45){ return res.send({ msg: 'Preencha a marca do produto.' })};

		try {
			if(!product.id){
				var row = await Product.findByCode(product.code);
				if(row.length){ return res.send({ msg: 'Este código de produto já está cadastrado.' }) };
				
				var row = await Product.save(product);
				let newProduct = await Product.findById(row.insertId);

				let price_categories = await Product.price.category.list();
				for(let i in price_categories){
					let price = {
						category_id: price_categories[i].id,
						product_id: row.insertId,
						price: 0
					};
					await Product.price.save(price);
				};

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
		// if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','n/a','COR-GER'])){
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
		// if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','n/a'])){
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
		// if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','n/a'])){
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

		if(req.query.brand){
			params.push("brand");
			values.push(req.query.brand);
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
		if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Product.price.delete(req.query.id);
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
			if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','n/a'])){
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
			if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
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
			if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
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
			if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
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
			if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
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
			if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
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
				if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				const category = {
					id: req.body.id,
					product_id: req.body.product_id,
					name: req.body.category_name
				};

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
				if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
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
				if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
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
				if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
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
				if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
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
	price: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm'])){
				return res.redirect('/');
			};

			try {
				res.render('product/price', { user: req.user });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao realizar requisição." });
			};
		},
		filter: async (req, res) => {
			let params = [];
			let values = [];

			if(isNaN(req.body.code) || req.body.code < 0 || req.body.code > 9999){
				req.body.code = "";
			};

			// if(req.body.code){
			// 	params.push("code");
			// 	values.push(req.body.code);
			// };

			if(req.body.name){
				params.push("name");
				values.push(req.body.name);
			};

			// if(req.body.color){
			// 	params.push("color");
			// 	values.push(req.body.color);
			// };

			if(req.body.brand){
				params.push("brand");
				values.push(req.body.brand);
			};

			let status = "Disponível";

			let product_inners = [
				["cms_wt_erp.product.id","cms_wt_erp.product_price.product_id"],
				["cms_wt_erp.product_price.category_id", req.body.category_id]
			];

			let package_inners = [
				["cms_wt_erp.product_package.id","cms_wt_erp.product_package_price.package_id"],
				["cms_wt_erp.product_package_price.category_id", req.body.category_id]
			];

			try {
				let products = await Product.price.filter(params, values, product_inners, status);
				let packages = await Product.package.price.filter(params, values, package_inners, status);
				res.send({ products: products, packages: packages });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
			};
		},
		find: async (req, res) => {
			// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
				// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			// };

			let price = req.body.price;

			try {
				price = await Product.price.find(price);
				res.send({ price });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
			};
		},
		update: async (req, res) => {
			// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
				// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			// };

			let price = req.body.price;

			try {
				await Product.price.update(price);
				res.send({ done: "Preço atualizado com sucesso!", price: price});
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
			};
		},
		category: {
			save: async (req, res) => {
				// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
					// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				// };

				let category = req.body.category;

				if(!category.name || category.name.length > 50){ return res.send({ msg: 'O nome da categoria é inválido.' }); };

				try {
					if(!category.id){
						let row = await Product.price.category.save(req.body.category);
						category.id = row.insertId;
						
						let products = await Product.list();
						for(let i in products){
							let price = {
								category_id: category.id,
								product_id: products[i].id,
								price: 0
							};
							await Product.price.save(price);
						};

						let packages = await Product.package.list();
						for(let i in packages){
							let price = {
								category_id: category.id,
								package_id: packages[i].id,
								price: 0
							};
							await Product.package.price.save(price);
						};

						res.send({ done: "Categoria cadastrada com sucesso!", category: category });
					} else {
						await Product.price.category.update(req.body.category);
						res.send({ done: "Categoria atualizada com sucesso!", category: category });
					};
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao cadastrar sua venda, favor contatar o suporte." });
				};
			},
			filter: async (req, res) => {
				// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
					// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				// };

				var params = [];
				var values = [];

				if(isNaN(req.query.id) || req.query.id < 0 || req.query.id > 9999){
					req.query.id = "";
				};

				if(req.query.id){
					params.push("id");
					values.push(req.query.id);
				};

				try {
					if(req.query.name){
						let categories = await Product.price.category.filter(req.query.name, params, values);
						res.send({ categories });
					} else {
						let categories = await Product.price.category.filter(false, params, values);
						res.send({ categories });
					};
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
				};
			},
			findById: async (req, res) => {
				// if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER'])){
				// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				// };

				try {
					let category = await Product.price.category.findById(req.params.id);
					category[0].products = await Product.list();
					category[0].packages = await Product.package.list();
					
					let product_prices = await Product.price.list(req.params.id);
					let package_prices = await Product.package.price.list(req.params.id);

					category[0].products = product_prices.reduce((products, price) => {
						for(i in products){
							if(products[i].id == price.product_id){
								products[i].price_id = price.id;
								products[i].price = price.price;
								return products;
							};
						};
						products[i].price = 0;
						return products;
					}, category[0].products);

					category[0].packages = package_prices.reduce((packages, price) => {
						for(i in packages){
							if(packages[i].id == price.package_id){
								packages[i].price_id = price.id;
								packages[i].price = price.price;
								return packages;
							};
						};
						packages[i].price = 0;
						return packages;
					}, category[0].packages);

					res.send({ category });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao encontrar a os produtos da tabela, favor contatar o suporte." });
				};
			},
			delete: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				try {
					await Product.price.category.delete(req.query.id);
					await Product.price.deleteAll(req.query.id);
					await Product.package.price.deleteAll(req.query.id);
					res.send({ done: 'Tabela excluída com sucesso!' });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao remover a tabela, favor entrar em contato com o suporte." });
				};
			}
		}
	},
	package: {
		index: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man'])){
				return res.redirect('/');
			};

			try {
				let colors = await Product.colorList();
				res.render('product/package', { user: req.user, colors: colors });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao realizar requisição." });
			};
		},
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			let package = req.body.package;

			if(!package.code || package.code < 1 || package.code > 9999){return res.send({ msg: 'Código de pacote inválido.' })};
			if(!package.name || package.name.length > 50){return res.send({ msg: 'O nome do pacote é inválido.' })};
			if(!package.color){return res.send({ msg: 'A cor do pacote é inválida.' })};
			if(!package.price || isNaN(package.price)){ return res.send({ msg: 'O preço do pacote é inválido.' }); };
				
			var row = await Product.package.findByCode(package.code);
			if(row.length){
				if(row[0].id != package.id){
					return res.send({ msg: 'Este código de produto já está cadastrado.' });
				};
			};

			try {
				if(!package.id){
					let row = await Product.package.save(req.body.package);
					package.id = row.insertId;

					let price_categories = await Product.price.category.list();
					for(let i in price_categories){
						let price = {
							category_id: price_categories[i].id,
							package_id: package.id,
							price: 0
						};
						await Product.package.price.save(price);
					};

					res.send({ done: "Pacote cadastrado com sucesso!", package: package });
				} else {
					let row = await Product.package.update(req.body.package);
					res.send({ done: "Pacote atualizado com sucesso!", package: package });
				};
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar sua venda, favor contatar o suporte." });
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
					const packages = await Product.package.filter(req.query.name, params, values);
					res.send({ packages });
				} else {
					const packages = await Product.package.filter(false, params, values);
					res.send({ packages });
				};
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
			};
		},
		findById: async (req, res) => {
			// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
			// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			// };

			try {
				let package = await Product.package.findById(req.params.id);
				package[0].images = await Product.package.image.list(req.params.id);
				package[0].products = await Product.package.product.list(req.params.id);

				res.send({ package });
			} catch (err){
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
			};
		},
		delete: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Product.package.price.delete(req.query.id);
				await Product.package.image.removeByPackageId(req.query.id);
				await Product.package.product.removeAll(req.query.id);
				await Product.package.delete(req.query.id);
				res.send({ done: 'Pacote excluído com sucesso!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover o pacote, favor entrar em contato com o suporte." });
			};
		},
		image: {
			add: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','n/a'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				const image = {
					package_id: req.body.package_id,
					url: req.body.image_url
				};

				try {
					await Product.package.image.add(image);
					res.send({ done: 'Imagem adicionada com sucesso!' });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao incluir a imagem, favor contatar o suporte." });
				};
			},
			remove: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				try {
					await Product.package.image.remove(req.query.image_id);
					res.send({ done: 'Imagem excluída!' });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao remover a imagem do produto, favor contatar o suporte." });
				};
			}
		},
		product: {
			update: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm','man','adm-man'])){
					return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				};

				let package = {
					id: req.body.package.id,
					products: JSON.parse(req.body.package.products),
				};

				let actions = { add: [], update: [], remove: [] };

				try {
					let db_package_products = await Product.package.product.list(package.id);

					if(!db_package_products.length && package.products.length){
						for(i in package.products){
							package.products[i].info = ""+package.products[i].code+" | "+package.products[i].name+" | "+package.products[i].color+" | "+package.products[i].size;
							await Product.package.product.add(package.id, package.products[i]);
						};
					} else if(db_package_products.length && !package.products.length){
						await Product.package.product.removeAll(package.id);
					} else if(db_package_products.length && package.products.length){
						package.products = db_package_products.reduce((products, product) => {
							for(i in products){ if(products[i].product_id == product.product_id){ return products; }; };
							actions.remove.push(product);
							return products;
						}, package.products);

						db_package_products = package.products.reduce((products, product) => {
							for(i in products){ if(products[i].product_id == product.product_id){ actions.update.push(product); return products; }; };
							actions.add.push(product);
							return products;
						}, db_package_products);

						for(i in actions.add){
							actions.add[i].info = ""+actions.add[i].code+" | "+actions.add[i].name+" | "+actions.add[i].color+" | "+actions.add[i].size;
							await Product.package.product.add(package.id, actions.add[i]);
						};
						for(i in actions.update){ await Product.package.product.update(actions.update[i].id, actions.update[i]); };
						for(i in actions.remove){ await Product.package.product.remove(actions.remove[i].id); };
					};

					res.send({ done: "Produtos atualizados com sucesso!", package });
				} catch (err){
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
				};
			}
		},
		price: {
			index: async (req, res) => {
				if(!await userController.verifyAccess(req, res, ['adm'])){
					return res.redirect('/');
				};

				try {
					res.render('product/price', { user: req.user });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao realizar requisição." });
				};
			},
			find: async (req, res) => {
				// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
					// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				// };

				let price = req.body.price;

				try {
					price = await Product.package.price.find(price);
					res.send({ price });
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
				};
			},
			update: async (req, res) => {
				// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
					// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
				// };

				let price = req.body.price;

				try {
					await Product.package.price.update(price);
					res.send({ done: "Preço atualizado com sucesso!", price: price});
				} catch (err) {
					console.log(err);
					res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
				};
			}
		}
	},
	catalog: {
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

			if(req.query.status){
				params.push("status");
				values.push("Disponível");
			};

			if(req.query.brand){
				params.push("brand");
				values.push(req.query.brand);
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
		// if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };
	
		try {
			const colors = await Product.colorList();
			res.send(colors);
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar as cores, favor contatar o suporte." });
		};
	}
};

// (async function(){
// 	let packages = await Product.package.list();
// 	for(let i in packages){
// 		let price = {
// 			category_id: 4,
// 			package_id: packages[i].id,
// 			price: 0
// 		};
// 		await Product.package.price.save(price);
// 	};
// 	console.log('ok');
// })();

module.exports = productController;