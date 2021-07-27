const userController = require('./../../user');
const Income = require('../../../model/financial/income');

const lib = require("../../../../config/lib");

const originController = {
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let origin = new Income.origin();
		origin.id = parseInt(req.body.origin.id);
		origin.category_id = parseInt(req.body.origin.category_id);
		origin.name = req.body.origin.name;

		if(!origin.name){ return res.send({ msg: "É necessário identificar a categoria." }); };

		try {
			if(!origin.id){
				let row = await origin.save();
				origin.id = row.insertId;
				res.send({ done: "Origem cadastrada com sucesso!", origin });
			} else {
				let row = await origin.update();
				origin.id = row.insertId;
				res.send({ done: "Origem atualizada com sucesso!", origin });
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

		console.log(req.query);
		
		lib.insertParam("cms_wt_erp.financial_income_origin.category_id", req.query.category_id, params, values);
		lib.insertParam("cms_wt_erp.financial_income_origin.name", req.query.name, params, values);

		try {
			let categories = await Income.origin.filter(props, params, values, strict_params, strict_values);
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
			const origin = await Income.origin.findById(req.params.id);
			res.send({ origin });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar a origem, favor contatar o suporte." });
		};
	},
	findByCategoryId: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const origins = await Income.origin.findByCategoryId(req.params.id);
			res.send({ origins });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
		};
	},
	delete: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Income.origin.delete(req.params.id);
			res.send({ done: 'Origem excluída com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
		};
	}
};

module.exports = originController;