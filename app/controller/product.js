const User = require('../model/user');
const userController = require('./user');

const Product = require('../model/product');
const Feedstock = require('../model/feedstock');

const productController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const feedstockColors = await Feedstock.colorList();
		const productColors = await Product.colorList();

		res.render('product/index', { productColors, feedstockColors });
	},
	// API CONTROLLERS
	list: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
			return res.redirect('/');
		};

		Product.list()
			.then(products => {
				res.json(products);
			})
			.catch(err => {
				return console.log(err);
			});
	},
	findById: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
		// 	return res.redirect('/');
		// };

		Product.findById(req.params.id)
			.then(async (product) => {
				if(product.length){
					product[0].images = await Product.getImages(product[0].id);
					product[0].feedstocks = await Product.getFeedstocks(product[0].id);
					if(product[0].feedstocks.length){
						for(i in product[0].feedstocks){
							var feedstock = await Feedstock.findById(product[0].feedstocks[i].feedstock_id);
							product[0].feedstocks[i].code = feedstock[0].code;
							product[0].feedstocks[i].name = feedstock[0].name;
							product[0].feedstocks[i].color = feedstock[0].color;
							product[0].feedstocks[i].uom = feedstock[0].uom;
						};
					};
				};
				res.send(product);
			})
			.catch(err => {
				return console.log(err);
			});
	},
	findByCode: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
			return res.redirect('/');
		};

		let product = await Product.findByCode(req.params.code);

		if(product.length){
			product[0].images = await Product.getImages(product[0].id);
			product[0].feedstocks = await Product.getFeedstocks(product[0].id);
		};

		res.send(product);
	},
	findByName: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
			return res.redirect('/');
		};

		let products = await Product.findByName(req.query.name);
		if(products.length){
			products[0].images = await Product.getImages(products[0].id);
			products[0].feedstocks = await Product.getFeedstocks(product[0].id);
		};

		res.send(products);
	},
	filter: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
		// 	return res.redirect('/');
		// };

		if(isNaN(req.query.code) || req.query.code < 0 || req.query.code > 9999){
			req.query.code = "";
		};

		if(req.query.name){
			Product.findByName(req.query.name)
				.then(products => {
					res.send(products);
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			if(req.query.code){
				Product.findByCode(req.query.code)
					.then(products => {
						res.send(products);
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				const product = {
					color: req.query.color
				};
				
				Product.filter(product)
					.then(products => {
						res.send(products);
					})
					.catch(err => {
						console.log(err);
					});
			};
		};
	},
	remove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		await Product.remove(req.query.id);
		await Product.removeProductImages(req.query.id);
		await Product.removeProductFeedstocks(req.query.id);
		
		res.send({ done: 'Produto excluído com sucesso!' });
	},
	addImage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
			return res.redirect('/');
		};

		const image = {
			product_id: req.query.product_id,
			url: req.query.image_url
		};

		await Product.addImage(image);
	
		res.send({ done: 'Imagem adicionada com sucesso!' });
	},
	removeImage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		await Product.removeImage(req.query.id);

		res.send({ done: 'Imagem excluída!' });
	},
	addFeedstock: async(req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const insert = {
			product_id: req.body.product_id,
			feedstock_id: req.body.feedstock_id,
			amount: req.body.feedstock_amount
		};

		await Product.addFeedstock(insert);

		var product_feedstocks = await Product.getFeedstocks(insert.product_id);
		if(product_feedstocks.length){
			for(i in product_feedstocks){
				var feedstock = await Feedstock.findById(product_feedstocks[i].feedstock_id);
				product_feedstocks[i].code = feedstock[0].code;
				product_feedstocks[i].name = feedstock[0].name;
				product_feedstocks[i].color = feedstock[0].color;
				product_feedstocks[i].uom = feedstock[0].uom;
			};
		};

		res.send({ done: 'Matéria-prima incluída com sucesso!', product_feedstocks });
	},
	removeFeedstock: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		await Product.removeFeedstock(req.query.id);

		res.send({ done: 'Matéria-prima excluída!' });
	},
	options: (req, res, next) => {
		res.status(204).send("");
	},

	/////////////////////////////////////////////
	
	// PRODUCTS APLICATION CONTROLLERS
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const product = {
			id: parseInt(req.body.product_id),
			code: parseInt(req.body.product_code),
			name: req.body.product_name,
			color: req.body.product_color,
			size: req.body.product_size,
		};

		if(!product.code || product.code < 1 || product.code > 9999){return res.send({ msg: 'Código de produto inválido.' })};
		if(!product.name || product.name.length > 15){return res.send({ msg: 'Preencha o nome do produto.' })};
		if(!product.color || product.color.length > 10){return res.send({ msg: 'Preencha a cor do produto.' })};
		if(!product.size || product.size.length > 3){return res.send({ msg: 'Preencha o tamanho do produto.' })};

		if(!product.id){
			var row = await Product.findByCode(product.code);
			if(row.length){return res.send({ msg: 'Este código de produto já está cadastrado.' })};
			
			var row = await Product.save(product);
		} else {
			var row = await Product.findByCode(product.code);
			if(row.length){
				if(row[0].id != product.id){
					return res.send({ msg: 'Este código de produto já está cadastrado.' });
				};
			};
			
			var row = await Product.update(product);
		};

		let newProduct = await Product.findById(row.insertId);

		res.send({ done: 'Produto cadastrado com sucesso!', product: newProduct });
	},
	
	categorySave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const category = {
			name: req.body.product_category_name,
			shortcut: req.body.product_category_shortcut
		};

		await Product.categorySave(category);

		res.send({ done: 'Categoria cadastrada com sucesso!' });
	},
	categoryList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
			return res.redirect('/');
		};

		const categories = await Product.categoryList();

		res.send({ categories });
	},
	colorSave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const color = {
			name: req.body.color_name,
			shortcut: req.body.color_shortcut			
		};

		await Product.colorSave(color);

		res.send({ done: 'Cor cadastrada com sucesso!' });
	},
	colorList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 's/a'])){
			return res.redirect('/');
		};
		
		const colors = await Product.colorList();

		res.send(colors);
	}
};

module.exports = productController;