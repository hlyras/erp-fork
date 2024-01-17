const userController = require('./../../user/main');

const lib = require("jarmlib");

const OutcomeOrigin = require('../../../model/financial/outcome/origin/main');

const FeedstockSupplier = require('../../../model/feedstock/supplier/main');
const Product = require('../../../model/product/main');
Product.color = require('../../../model/product/color');

const supplierController = {};

supplierController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.redirect('/');
	};

	try {
		let colors = await Product.color.list();

		let strict_params = { keys: [], values: [] };
		lib.Query.fillParam("outcome_origin.category_id", 2, strict_params);
		let outcomeOrigins = await OutcomeOrigin.filter({ strict_params });

		res.render('feedstock/supplier/manage', { user: req.user, colors, outcomeOrigins });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte." });
	}
};

supplierController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.redirect('/');
	};

	let supplier = new FeedstockSupplier();

	supplier.id = req.body.id;
	supplier.cnpj = req.body.cnpj;
	supplier.trademark = req.body.trademark;
	supplier.brand = req.body.brand;
	supplier.name = req.body.name;
	supplier.phone = req.body.phone;
	supplier.origin_id = req.body.origin_id;

	try {
		if (!supplier.id) {
			await supplier.create();
			res.send({ done: 'Fornecedor cadastrado com sucesso!' });
		} else {
			await supplier.update();
			res.send({ done: 'Fornecedor atualizado com sucesso!' });
		}
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima, favor contatar o suporte" });
	};
};

supplierController.filter = async (req, res) => {
	let params = { keys: [], values: [] };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("supplier.cnpj", req.body.cnpj, params);
	lib.Query.fillParam("supplier.trademark", req.body.trademark, params);
	lib.Query.fillParam("supplier.brand", req.body.brand, params);
	lib.Query.fillParam("supplier.name", req.body.name, params);
	lib.Query.fillParam("supplier.pass", req.body.pass, strict_params);

	let order_params = [["supplier.id", "ASC"]];

	try {
		let suppliers = await FeedstockSupplier.filter({ params, strict_params, order_params });
		res.send({ suppliers });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

supplierController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await FeedstockSupplier.delete(req.params.id);
		await FeedstockSupplierFeedstock.deleteBySupplierId(req.params.id);
		res.send({ done: 'Matéria-prima excluída com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

module.exports = supplierController;