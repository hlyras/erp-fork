const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Feedstock = require('../../model/feedstock/main');
Feedstock.supplier = require('../../model/feedstock/supplier');

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const feedstockController = {};

feedstockController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.redirect('/');
	};

	try {
		let colors = await Product.color.list();
		let suppliers = await Feedstock.supplier.filter([], [], [], [], []);
		res.render('feedstock/manage/index', { colors, suppliers, user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte." });
	}
}

feedstockController.save = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let feedstock = new Feedstock();
	feedstock.id = parseInt(req.body.id);
	feedstock.code = parseInt(req.body.code);
	feedstock.name = req.body.name;
	feedstock.color_id = req.body.color_id;
	feedstock.unit = req.body.unit;
	feedstock.uom = req.body.uom;
	feedstock.supplier_id = req.body.supplier_id;

	try {
		if (!feedstock.id) {
			let feedstocks = await Feedstock.findByCode(feedstock.code);
			if (feedstocks.length) { return res.send({ msg: 'Este código de produto já está cadastrado.' }) };

			let response = await feedstock.save();
			if (response.err) { return res.send({ msg: response.err }); }

			res.send({ done: 'Matéria prima cadastrada com sucesso!' });
		} else {
			let feedstocks = await Feedstock.findByCode(feedstock.code);
			if (feedstocks.length) {
				if (feedstocks[0].id != feedstock.id) { return res.send({ msg: 'Este código de produto já está cadastrado.' }); };
			};

			let response = await feedstock.update();
			if (response.err) { return res.send({ msg: response.err }); }

			res.send({ done: 'Matéria prima atualizada com sucesso!' });
		};
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima, favor contatar o suporte" });
	};
};

feedstockController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man', 'pro-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let props = [
		"feedstock.*",
		"color.name color_name"
	];

	let inners = [
		["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"]
	];

	let params = { keys: [], values: [] };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("feedstock.code", req.body.feedstock.code, strict_params);
	lib.Query.fillParam("feedstock.name", req.body.feedstock.name, params);
	lib.Query.fillParam("feedstock.color_id", req.body.feedstock.color_id, strict_params);

	let order_params = [["feedstock.code", "ASC"]];

	try {
		let feedstocks = await Feedstock.filter(props, inners, params, strict_params, order_params);
		res.send({ feedstocks });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

feedstockController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man', 'pro-pro'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let props = [
		"feedstock.*",
		"color.name color_name",
		"supplier.name supplier_name", "supplier.name supplier_brand"
	];

	let inners = [
		["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"],
		["cms_wt_erp.feedstock_supplier supplier", "supplier.id", "feedstock.supplier_id"]
	];

	let params = { keys: [], values: [] };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("feedstock.id", req.params.id, strict_params);

	let order_params = [["feedstock.code", "ASC"]];

	try {
		let feedstock = (await Feedstock.filter(props, inners, params, strict_params, order_params))[0];
		res.send({ feedstock });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

feedstockController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Feedstock.delete(req.params.id);
		await Feedstock.supplier.storage.deleteByFeedstockId(req.params.id);
		res.send({ done: 'Matéria-prima excluída com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

feedstockController.report = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	// Busca todos os preços nas tabelas de fornecedores
	let props = [
		'feedstock.id',
		'feedstock.name',
		'color.name color_name',
		'feedstock.unit',
		'feedstock.uom',
		'supplier.name supplier_name',
		'supplier.brand',
		'supplier_storage.price'
	];

	let inners = [
		['cms_wt_erp.feedstock_supplier_storage supplier_storage', 'feedstock.id', 'supplier_storage.feedstock_id'],
		['cms_wt_erp.feedstock_supplier supplier', 'supplier_storage.supplier_id', 'supplier.id'],
		['cms_wt_erp.product_color color', 'feedstock.color_id', 'color.id']
	];

	let strict_params = { keys: [], values: [] };
	lib.Query.fillParam("feedstock.id", req.params.id, strict_params);

	try {
		let feedstocks = await Feedstock.filter(props, inners, [], strict_params, []);
		res.send({ feedstocks });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

module.exports = feedstockController;