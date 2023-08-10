const lib = require("jarmlib");

const User = require('../../../model/user');
const userController = require('./../../user/main');

const Product = require('../../../model/product/main');
Product.color = require('../../../model/product/color');
Product.feedstock = require('../../../model/product/feedstock/main');

const feedstockController = {};

feedstockController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-pro'])) {
		return res.redirect('/');
	};

	try {
		res.render('product/feedstock/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

feedstockController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-pro'])) {
		return res.redirect('/');
	};

	try {
		const productColors = await Product.color.list();
		res.render('product/feedstock/manage/index', { user: req.user, productColors });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

feedstockController.add = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
	};

	let feedstock = new Product.feedstock();
	feedstock.id = req.body.id;
	feedstock.product_id = req.body.product_id;
	feedstock.feedstock_id = req.body.feedstock_id;
	feedstock.measure = req.body.measure;
	feedstock.amount = req.body.amount;
	feedstock.category_id = req.body.category_id;
	feedstock.obs = req.body.obs;

	try {
		if (!feedstock.id) {
			let response = await feedstock.add();
			if (response.err) { return res.send({ msg: response.err }); }
			res.send({ done: "Matéria-prima adicionada com sucesso!" });
		} else {
			let response = await feedstock.update();
			if (response.err) { return res.send({ msg: response.err }); }
			res.send({ done: "Matéria-prima atualizada com sucesso!" });
		}
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

feedstockController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-pro', 'pro-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
	};

	let props = [
		"product_feedstock.*",
		"feedstock.name", "feedstock.code", "product_color.name color", "feedstock.uom"
	];

	let inners = [
		["cms_wt_erp.feedstock", "feedstock.id", "product_feedstock.feedstock_id"],
		["cms_wt_erp.product_color", "product_color.id", "feedstock.color_id"]
	];

	let strict_params = { keys: [], values: [] };
	lib.Query.fillParam("product_feedstock.id", req.body.id, strict_params);
	lib.Query.fillParam("product_feedstock.name", req.body.name, strict_params);
	lib.Query.fillParam("product_feedstock.product_id", req.body.product_id, strict_params);
	lib.Query.fillParam("product_feedstock.category_id", req.body.category_id, strict_params);

	try {
		let feedstocks = await Product.feedstock.filter(props, inners, [], strict_params, []);
		res.send({ feedstocks });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

feedstockController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-pro', 'pro-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
	};

	let props = [
		"product_feedstock.*",
		"feedstock.code", "feedstock.name", "product_color.name color", "feedstock.unit", "feedstock.uom"
	];

	let inners = [
		["cms_wt_erp.feedstock", "feedstock.id", "product_feedstock.feedstock_id"],
		["cms_wt_erp.product_color", "product_color.id", "feedstock.color_id"]
	];

	let strict_params = { keys: [], values: [] };
	lib.Query.fillParam("product_feedstock.id", req.params.id, strict_params);

	try {
		let feedstock = (await Product.feedstock.filter(props, inners, [], strict_params, []))[0];
		res.send({ feedstock });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

feedstockController.remove = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
	};

	try {
		let response = await Product.feedstock.remove(req.params.id);
		if (response.err) { return res.send({ msg: response.err }); }
		res.send({ done: "Matéria-prima removída com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

module.exports = feedstockController;