const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');
Product.image = require('../../model/product/image');
Product.feedstock = require('../../model/product/feedstock');
Product.price = require('../../model/product/price');

const productController = {};

productController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','com-ass'])){
		return res.redirect("/");
	};

	try {
		const productColors = await Product.color.list();
		res.render('product/index', { productColors, user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productController.manage = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','man','adm-man','COR-GER','com-ass','adm-vis'])){
		return res.redirect("/");
	};

	try {
		const productColors = await Product.color.list();
		res.render('product/manage', { productColors, user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productController.print = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const strict_params = { keys: [], values: [] };
	lib.Query.fillParam("product.color", "Tan", strict_params);
	lib.Query.fillParam("product.status", "Disponível", strict_params);
	let order_params = [ ["product.code","ASC"] ];

	try {
		const products = await Product.filter([], [], [], strict_params, order_params);
		res.render('product/print', { user: req.user, products });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
	};
};

productController.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','adm-vis','adm-man'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const product = {
		id: parseInt(req.body.id),
		code: parseInt(req.body.code),
		name: req.body.name,
		color: req.body.color,
		size: req.body.size,
		weight: parseInt(req.body.weight),
		width: parseInt(req.body.width),
		height: parseInt(req.body.height),
		depth: parseInt(req.body.depth),
		brand: req.body.brand,
		image: req.body.image,
		video: req.body.video,
		status: req.body.status,
		description: req.body.description,
		announcement: req.body.announcement
	};

	if(!product.code || product.code < 1 || product.code > 9999){return res.send({ msg: 'Código de produto inválido.' })};
	if(!product.name || product.name.length > 75){return res.send({ msg: 'Preencha o nome do produto.' })};
	if(!product.color || product.color.length > 25){return res.send({ msg: 'Preencha a cor do produto.' })};
	if(!product.size || product.size.length > 4){return res.send({ msg: 'Preencha o tamanho do produto.' })};
	if(!product.weight || isNaN(product.weight)){return res.send({ msg: 'Preencha o peso do produto.' })};
	// if(!product.width || isNaN(product.width)){return res.send({ msg: 'Preencha a largura do produto.' })};
	// if(!product.height || isNaN(product.height)){return res.send({ msg: 'Preencha a altura do produto.' })};
	// if(!product.depth || isNaN(product.depth)){return res.send({ msg: 'Preencha a profundidade do produto.' })};
	if(!product.brand.length || product.brand.length < 3 || product.brand.length > 45){ return res.send({ msg: 'Preencha a marca do produto.' })};

	try {
		if(!product.id){
			var row = await Product.findByCode(product.code);
			if(row.length){ return res.send({ msg: 'Este código de produto já está cadastrado.' }); }
			
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
};

productController.list = async (req, res) => {
	try {
		const products = await Product.list();
		res.send({ products });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao listar os produtos." });
	};
};

productController.findById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if(product.length){ product[0].images = await Product.image.list(product[0].id); }
		
		res.send({ product });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

productController.filter = async (req, res) => {
	let props = [];
	let inners = [];

	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("product.code", req.body.product.code, strict_params);
	lib.Query.fillParam("product.name", req.body.product.name, params);
	lib.Query.fillParam("product.color", req.body.product.color, strict_params);
	lib.Query.fillParam("product.brand", req.body.product.brand, params);

	let order_params = [ ["product.code","ASC"] ];

	try {
		const products = await Product.filter(props, inners, params, strict_params, order_params);
		res.send({ products });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

productController.delete = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
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
};

module.exports = productController;