const userController = require('./../../user/main');
const OutcomeCategory = require('../../../model/financial/outcome/category');
const OutcomeOrigin = require('../../../model/financial/outcome/origin/main');
const OutcomeOriginPayment = require('../../../model/financial/outcome/origin/payment');

const lib = require("jarmlib");

const categoryController = {};

categoryController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let category = new OutcomeCategory();
	category.id = req.body.id;
	category.name = req.body.name;

	if (!category.name) { return res.send({ msg: "É necessário identificar a categoria." }); };

	try {
		if (!category.id) {
			let row = await category.create();
			category.id = row.insertId;
			res.send({ done: "Categoria cadastrada com sucesso!", category });
		} else {
			let row = await category.update();
			category.id = row.insertId;
			res.send({ done: "Categoria atualizado com sucesso!", category });
		};
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
	};
};

categoryController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	let params = { keys: [], values: [] }
	let strict_params = { keys: [], values: [] }

	lib.Query.fillParam("outcome_category.id", req.body.id, strict_params);
	lib.Query.fillParam("outcome_category.name", req.body.name, params);

	let order_params = [["outcome_category.name", "ASC"]];

	try {
		let categories = await OutcomeCategory.filter({ params, strict_params, order_params });
		res.send({ categories });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

categoryController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		const category = (await OutcomeCategory.findById(req.params.id))[0];
		res.send({ category });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

categoryController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let strict_params = { keys: [], values: [] }
	lib.Query.fillParam("outcome_origin.category_id", req.params.id, strict_params);

	try {
		let origins = await OutcomeOrigin.filter({ strict_params });
		origins.forEach(async origin => { OutcomeOriginPayment.deleteByOriginId(origin.id); });
		await OutcomeOrigin.deleteByCategoryId(req.params.id);
		await OutcomeCategory.delete(req.params.id);

		res.send({ done: 'Categoria excluída com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

module.exports = categoryController;