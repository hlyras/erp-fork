const userController = require('./../../user/main');
const IncomeCategory = require('../../../model/financial/income/category');
const IncomeOrigin = require('../../../model/financial/income/origin');

const lib = require("jarmlib");

const categoryController = {};

categoryController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', 'com-sel', "adm-aud"])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let category = new IncomeCategory();
	category.id = req.body.id;
	category.name = req.body.name;

	try {
		if (!category.id) {
			let create_response = await category.create();
			if (create_response.err) { return res.send({ msg: create_response.err }); }

			category.id = create_response.insertId;

			res.send({ done: "Categoria cadastrada com sucesso!" });
		} else {
			let update_response = await category.update();
			if (update_response.err) { return res.send({ msg: update_response.err }); }

			res.send({ done: "Categoria atualizado com sucesso!" });
		};
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
	};
};

categoryController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let strict_params = { keys: [], values: [] };
	let params = { keys: [], values: [] };

	lib.Query.fillParam("income_category.id", req.body.name, strict_params);
	lib.Query.fillParam("income_category.name", req.body.name, params);

	let order_params = [["income_category.name", "ASC"]];

	try {
		let categories = await IncomeCategory.filter({ params, strict_params, order_params });
		res.send({ categories });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

categoryController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		const category = (await IncomeCategory.findById(req.params.id))[0];
		res.send({ category });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a categoria, favor contatar o suporte." });
	};
};

categoryController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await IncomeCategory.delete(req.params.id);
		await IncomeOrigin.deleteByCategoryId(req.params.id);
		res.send({ done: 'Categoria excluída com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

module.exports = categoryController;