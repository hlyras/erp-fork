const userController = require('./../../user');
const Income = require('../../../model/financial/income');

const lib = require("../../../../config/lib");

const categoryController = {
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man','com-sel', "adm-aud"])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let category = new Income.category();
		category.id = parseInt(req.body.category.id);
		category.name = req.body.category.name;

		if(!category.name){ return res.send({ msg: "É necessário identificar a categoria." }); };

		try {
			if(!category.id){
				let row = await category.save();
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
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let props = [];
		let params = []; let values = [];
		let strict_params = []; let strict_values = [];
		
		lib.insertParam("cms_wt_erp.financial_income_category.name", req.query.name, params, values);

		try {
			let categories = await Income.category.filter(props, params, values, strict_params, strict_values);
			res.send({ categories });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const category = await Income.category.findById(req.params.id);
			res.send({ category });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar a categoria, favor contatar o suporte." });
		};
	},
	delete: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Income.category.delete(req.params.id);
			await Income.origin.deleteByCategoryId(req.params.id);
			res.send({ done: 'Categoria excluída com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
		};
	}
};

module.exports = categoryController;