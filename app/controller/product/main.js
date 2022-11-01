const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');
Product.image = require('../../model/product/image');
Product.feedstock = require('../../model/product/feedstock/main');
Product.price = require('../../model/product/price');

const imageController = require('./image');

const productController = {};

productController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'man', 'adm-man', 'COR-GER', 'com-ass', 'adm-vis'])) {
		return res.redirect("/");
	};

	try {
		const productColors = await Product.color.list();
		res.render('product/manage/index', { productColors, user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

productController.print = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', "adm-man", "adm-ass", "adm-aud", 'COR-GER', 'log-pac', "fin-ass"])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const strict_params = { keys: [], values: [] };
	lib.Query.fillParam("product.color", "Tan", strict_params);
	lib.Query.fillParam("product.status", "Disponível", strict_params);
	let order_params = [["product.code", "ASC"]];

	try {
		const products = await Product.filter([], [], [], strict_params, order_params);
		res.render('product/print', { user: req.user, products });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
	};
};

productController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-vis', 'adm-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const product = new Product();
	product.id = parseInt(req.body.id);
	product.code = req.body.code;
	product.name = req.body.name;
	product.color = req.body.color;
	product.size = req.body.size;
	product.weight = req.body.weight;
	product.brand = req.body.brand;
	product.image = req.body.image;
	product.video_url = req.body.video_url;
	product.status = req.body.status;
	product.description = req.body.description;
	product.announcement = req.body.announcement;

	try {
		if (!product.id) {
			let verifyCodeDuplicity = await Product.findByCode(product.code);
			if (verifyCodeDuplicity.length) { return res.send({ msg: "Este código já está cadastrado." }); }

			let response = await product.create();
			if (response.err) { return res.send({ msg: response.err }); }

			for (let i in req.files) {
				await imageController.upload(req.files[i], parseInt(response.insertId));
			};

			res.send({ done: "Produto cadastrado com sucesso!" });
		} else {
			let verifyCodeDuplicity = await Product.findByCode(product.code);
			if (verifyCodeDuplicity.length && verifyCodeDuplicity[0].id != product.id) {
				return res.send({ msg: 'Este código de produto já está cadastrado.' });
			};

			let response = await product.update();
			if (response.err) { return res.send({ msg: response.err }); }

			for (let i in req.files) {
				await imageController.upload(req.files[i], parseInt(product.id));
			};

			res.send({ done: "Produto atualizado com sucesso!" });
		}
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o produto." });
	}
};

productController.list = async (req, res) => {
	try {
		const products = await Product.list();
		res.send({ products });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao listar os produtos." });
	};
};

productController.findById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product.length) { product[0].images = await Product.image.list(product[0].id); }

		res.send({ product });
	} catch (err) {
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

	let order_params = [["product.code", "ASC"]];

	try {
		const products = await Product.filter(props, inners, params, strict_params, order_params);
		res.send({ products });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

productController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Product.price.delete(req.params.id);
		await Product.feedstock.removeByProductId(req.params.id);
		await Product.feedstock.category.deleteByProductId(req.params.id);
		await imageController.deleteByProductId(req.params.id);
		await Product.image.deleteByProductId(req.params.id);
		await Product.delete(req.params.id);
		res.send({ done: 'Produto excluído com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

productController.price = {};

productController.price.find = async (req, res) => {
	try {
		price = await Product.price.find(req.body.price);
		res.send({ price });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar a atualização, favor contatar o suporte." });
	};
};

module.exports = productController;