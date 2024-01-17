const User = require('../../model/user');
const userController = require('./../user/main');

const lib = require("jarmlib");

const Feedstock = require('../../model/feedstock/main');
const FeedstockSupplier = require('../../model/feedstock/supplier/main');
const FeedstockSupplierStorage = require('../../model/feedstock/supplier/storage');

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const feedstockController = {};

feedstockController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.redirect('/');
	};

	try {
		let colors = await Product.color.list();
		let suppliers = await FeedstockSupplier.filter({});
		res.render('feedstock/manage/index', { colors, suppliers, user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte." });
	}
};

feedstockController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let feedstock = new Feedstock();
	feedstock.id = req.body.id;
	feedstock.code = req.body.code;
	feedstock.name = req.body.name;
	feedstock.color_id = req.body.color_id;
	feedstock.unit = req.body.unit;
	feedstock.uom = req.body.uom;
	feedstock.supplier_id = req.body.supplier_id;

	let strict_params = { keys: [], values: [] };
	lib.Query.fillParam("feedstock.code", feedstock.code, strict_params);

	try {
		if (!feedstock.id) {
			let feedstocks = await Feedstock.filter({ strict_params });
			if (feedstocks.length) { return res.send({ msg: 'Este código de produto já está cadastrado.' }) };

			let response = await feedstock.create();
			if (response.err) { return res.send({ msg: response.err }); }

			res.send({ done: 'Matéria prima cadastrada com sucesso!' });
		} else {
			let feedstocks = await Feedstock.filter({ strict_params });
			if (feedstocks.length) {
				if (feedstocks[0].id != feedstock.id) {
					return res.send({ msg: 'Este código de produto já está cadastrado.' });
				};
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

	lib.Query.fillParam("feedstock.id", req.body.id, strict_params);
	lib.Query.fillParam("feedstock.code", req.body.code, strict_params);
	lib.Query.fillParam("feedstock.name", req.body.name, params);
	lib.Query.fillParam("feedstock.color_id", req.body.color_id, strict_params);

	let order_params = [["feedstock.code", "ASC"]];

	try {
		let feedstocks = await Feedstock.filter({ props, inners, params, strict_params, order_params });
		res.send({ feedstocks });
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
		await FeedstockSupplierStorage.deleteByFeedstockId(req.params.id);
		res.send({ done: 'Matéria-prima excluída com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

module.exports = feedstockController;