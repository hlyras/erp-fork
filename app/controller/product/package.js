const Product = require('../../model/product/main');
Product.package = require('../../model/product/package');

const lib = require("jarmlib");

const productController = require('./main');

const userController = require('./../user');

productController.package = {};

productController.package.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-vis'])){
		return res.redirect('/');
	};

	try {
		let colors = await Product.color.list();
		res.render('product/package', { user: req.user, colors: colors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productController.package.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','adm-vis'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let package = req.body.package;

	if(!package.code || package.code < 1 || package.code > 9999){return res.send({ msg: 'Código de pacote inválido.' })};
	if(!package.name || package.name.length > 50){return res.send({ msg: 'O nome do pacote é inválido.' })};
	if(!package.color){return res.send({ msg: 'A cor do pacote é inválida.' })};
	if(!package.weight || isNaN(package.weight)){ return res.send({ msg: 'O peso do pacote é inválido.' }); };
	if(!package.status){return res.send({ msg: 'O status do pacote é inválido.' })};
		
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
					package_id: package.id
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
};

productController.package.filter = async (req, res) => {
	let props = [];
	let inners = [];

	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("package.code", req.body.package.code, strict_params);
	lib.Query.fillParam("package.name", req.body.package.name, params);
	lib.Query.fillParam("package.color", req.body.package.color, strict_params);
	// lib.Query.fillParam("package.status", req.body.package.status, strict_params);

	let order_params = [ ["package.code","ASC"] ];

	try {
		const packages = await Product.package.filter(props, inners, params, strict_params, order_params);
		res.send({ packages });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

productController.package.findById = async (req, res) => {
	try {
		let package = await Product.package.findById(req.params.id);
		package[0].images = await Product.package.image.list(req.params.id);
		package[0].products = await Product.package.product.list(req.params.id);

		res.send({ package });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

productController.package.delete = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
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
};

productController.package.image = {
	add: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','n/a','adm-vis'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const image = {
			package_id: req.body.package_id,
			url: req.body.url
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
		if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','adm-vis'])){
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
};

productController.package.product = {
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
};

productController.package.price = {
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
		let price = req.body.price;

		try {
			await Product.package.price.update(price);
			res.send({ done: "Preço atualizado com sucesso!", price: price});
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
		};
	}
};

module.exports = productController.package;