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
	molle: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
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
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
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
	show: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
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
		// if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
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
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const product = {
			id: parseInt(req.body.id),
			code: parseInt(req.body.code),
			name: req.body.name,
			color: req.body.color,
			size: req.body.size,
			brand: req.body.brand
		};

		if(!product.code || product.code < 1 || product.code > 9999){return res.send({ msg: 'Código de produto inválido.' })};
		if(!product.name || product.name.length > 30){return res.send({ msg: 'Preencha o nome do produto.' })};
		if(!product.color || product.color.length > 10){return res.send({ msg: 'Preencha a cor do produto.' })};
		if(!product.size || product.size.length > 3){return res.send({ msg: 'Preencha o tamanho do produto.' })};
		if(!product.brand.length || product.brand.length < 3 || product.brand.length > 45){ return res.send({ msg: 'Preencha a marca do produto.' })};

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
		// if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
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

module.exports = productController;