const userController = require('./../../user');
const Outcome = require('../../../model/financial/outcome');

const lib = require("jarmlib");

const categoryController = {
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','fin-ass'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let category = new Outcome.category();
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
		if(!await userController.verifyAccess(req, res, ['adm','pro-man','fin-ass'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let props = [];

		let params = { keys: [], values: [] }
		let strict_params = { keys: [], values: [] }
		
		lib.Query.fillParam("outcome_category.name", req.query.name, params);

		let order_params = [ ["outcome_category.name","ASC"] ];

		try {
			let categories = await Outcome.category.filter(props, params, strict_params, order_params);
			res.send({ categories });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','pro-man','fin-ass'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const category = await Outcome.category.findById(req.params.id);
			res.send({ category });
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
			await Outcome.category.delete(req.params.id);
			await Outcome.origin.deleteByCategoryId(req.params.id);
			res.send({ done: 'Categoria excluída com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
		};
	}
};

module.exports = categoryController;