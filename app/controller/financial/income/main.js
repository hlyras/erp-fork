const userController = require('./../../user');
const Income = require('../../../model/financial/income');

const lib = require("jarmlib");

const incomeController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		const incomeCategories = await Income.category.list();

		res.render('financial/income/index', { user: req.user, incomeCategories });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man','com-sel', "adm-aud"])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let income = new Income();
		income.id = req.body.income.id;
		income.datetime = lib.date.timestamp.generate();
		income.date = req.body.income.date;
		income.category_id = req.body.income.category_id;
		income.origin_id = req.body.income.origin_id;
		income.cash = req.body.income.cash;
		income.description = req.body.income.description;
		income.user_id = req.user.id;

		if(!income.date){ return res.send({ msg: "É necessário selecionar a data." }); };
		if(!income.category_id){ return res.send({ msg: "É necessário selecionar a categoria." }); };
		if(!income.origin_id){ return res.send({ msg: "É necessário selecionar a origem." }); };
		if(!income.cash){ return res.send({ msg: "É necessário selecionar o valor da entrada." }); };

		try {
			if(!income.id){
				let row = await income.save();
				income.id = row.insertId;
				res.send({ done: "Entrada cadastrada com sucesso!", income });
			} else {
				let row = await income.update();
				income.id = row.insertId;
				res.send({ done: "Entrada atualizada com sucesso!", income });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
		};
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};
		
		let params = { keys: [], values: [] }
		let strict_params = { keys: [], values: [] }

		let props = ["cms_wt_erp.income.id",
			"income.datetime",
			"income.date",
			"income.category_id",
			"category.name category_name",
			"income.origin_id",
			"origin.name origin_name",
			"income.description",
			"income.cash",
			"income.user_id",
			"user.name user_name"
		];

		let inners = [
			["cms_wt_erp.financial_income_category category","income.category_id","category.id"],
			["cms_wt_erp.financial_income_origin origin","income.origin_id","origin.id"],
			["cms_wt_erp.user user","income.user_id","user.id"]
		];
		
		let period = { key: "date", start: req.query.periodStart, end: req.query.periodEnd };
		lib.Query.fillParam("income.id", req.query.id, strict_params);
		lib.Query.fillParam("income.category_id", req.query.category_id, strict_params);
		lib.Query.fillParam("income.origin_id", req.query.origin_id, strict_params);

		let order_params = [ ["date","DESC"], ["id","DESC"] ];
		let limit = 0;

		try {
			let incomes = await Income.filter(props, inners, period, params, strict_params, order_params, limit);
			res.send({ incomes });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as entradas, favor contatar o suporte" });
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let props = ["income.id",
			"income.datetime",
			"income.date",
			"income.category_id",
			"category.name category_name",
			"income.origin_id",
			"origin.name origin_name",
			"income.description",
			"income.cash",
			"income.user_id",
			"user.name user_name"
		];

		let inners = [
			["cms_wt_erp.financial_income_category category","income.category_id","category.id"],
			["cms_wt_erp.financial_income_origin origin","income.origin_id","origin.id"],
			["cms_wt_erp.user user","income.user_id","user.id"]
		];

		let period = { key: "", start: '', end: '' };
		let params = { keys: [], values: [] };
		let strict_params = { keys: [], values: [] };
		
		lib.Query.fillParam("income.id", req.params.id, strict_params);

		let order_params = [ ["date","DESC"], ["id","DESC"] ];
		let limit = 0;

		try {
			let income = await Income.filter(props, inners, period, params, strict_params, order_params, limit);
			res.send({ income });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as entradas, favor contatar o suporte" });
		};
	},
	delete: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Income.delete(req.params.id);
			res.send({ done: 'Entrada excluída com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover a entrada, favor entrar em contato com o suporte." });
		};
	}
};

module.exports = incomeController;