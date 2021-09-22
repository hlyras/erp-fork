const Product = require('../../model/product/main');
Product.price = require('../../model/product/price');

const productController = require('./main');

const userController = require('./../user');

productController.price = {};

productController.price.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};

	try {
		res.render('product/price', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productController.price.filter = async (req, res) => {
	let params = [];
	let values = [];

	if(isNaN(req.body.code) || req.body.code < 0 || req.body.code > 9999){
		req.body.code = "";
	};

	if(req.body.name){
		params.push("name");
		values.push(req.body.name);
	};

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
};

productController.price.find = async (req, res) => {
	let price = req.body.price;

	try {
		price = await Product.price.find(price);
		res.send({ price });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
	};
};

productController.price.update = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let price = req.body.price;

	try {
		await Product.price.update(price);
		res.send({ done: "Preço atualizado com sucesso!", price: price});
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
	};
};

productController.price.category = {};

productController.price.category.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

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
};

productController.price.category.filter = async (req, res) => {
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
};

productController.price.category.findById = async (req, res) => {
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
};

productController.price.category.delete = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
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
};

module.exports = productController.price;