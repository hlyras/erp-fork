const userController = require('./user');
const lib = require('../../config/lib');

const Financial = require('../model/financial');

const financialController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.redirect('/');
		};

		const incomeCategories = await Financial.incomeCategoryList();
		const outcomeCategories = await Financial.outcomeCategoryList();

		res.render('financial/index', { user: req.user, incomeCategories, outcomeCategories });
	},
	balance: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let params = [];
		let values = [];

		if(req.body.balance_periodStart && req.body.balance_periodEnd){
			var periodStart = req.body.balance_periodStart;
			var periodEnd = req.body.balance_periodEnd;
		} else {
			var periodStart = "";
			var periodEnd = "";
		};

		const incomeValue = await Financial.incomeSum(periodStart, periodEnd, params, values);
		const outcomeValue = await Financial.outcomeSum(periodStart, periodEnd, params, values);

		res.send({ incomeValue, outcomeValue });
	},
	income: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.redirect('/');
		};

		const incomeCategories = await Financial.incomeCategoryList();

		res.render('financial/income', { user: req.user, incomeCategories });
	},
	incomeSave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		const income = {
			date: lib.genPatternDate(),
			category_id: req.body.category_id,		
			category_name: req.body.category_name,		
			origin_id: req.body.origin_id,		
			origin_name: req.body.origin_name,		
			value: req.body.value,
			obs: req.body.obs,
			user_id: req.user.id,
			user_name: req.user.name
		};

		Financial.incomeSave(income)
			.then(() => {
				res.send({ done: "Receita cadastrada com sucesso!" });
			})
			.catch(err => {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar a receita, favor contatar o suporte" });
			});
	},
	incomeFindById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		Financial.incomeFindById(req.params.id)
			.then(income => {
				res.send(income);
			})
			.catch(err => {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar as receitas, favor contatar o suporte" });
			});
	},
	incomeFilter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let params = [];
		let values = [];

		if(req.body.income_periodStart && req.body.income_periodEnd){
			var periodStart = req.body.income_periodStart;
			var periodEnd = req.body.income_periodEnd;
		} else {
			var periodStart = "";
			var periodEnd = "";
		};

		if(parseInt(req.body.income_category)){
			params.push("category_id");
			values.push(req.body.income_category);
		};

		if(parseInt(req.body.income_origin)){
			params.push("origin_id");
			values.push(req.body.income_origin);
		};

		Financial.incomeFilter(periodStart, periodEnd, params, values)
			.then(incomes => {
				res.send(incomes);
			})
			.catch(err => {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar as receitas, favor contatar o suporte" });
			});
	},
	incomeCategorySave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const category = {
			name: req.body.category_name
		};

		Financial.incomeCategorySave(category)
			.then(row => {
				res.send({ done: 'A categoria de receita foi cadastrada com sucesso!' });
			})
			.catch(err => {
				res.send({ err: 'Ocorreu um erro ao salvar a categoria de receita!' });
			});
	},
	incomeCategoryFilter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const category = {
			name: req.query.name
		};

		if(req.query.name){
			Financial.findIncomeCategoryByName(category)
				.then(categories => {
					res.send( categories );
				})
				.catch(err => {
					res.send({ err: 'Ocorreu um erro ao filtrar as categorias de receita!' });
				});
		} else {
			Financial.incomeCategoryList()
				.then(categories => {
					res.send( categories );
				})
				.catch(err => {
					res.send({ err: 'Ocorreu um erro ao filtrar as categorias de receita!' });
				});
		};
	},
	incomeCategoryList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		Financial.incomeCategoryList()
			.then(incomeCategories => {
				res.send(incomeCategories);
			})
			.catch(err => {
				res.send({ err: 'Ocorreu um erro ao salvar a categoria de receita!' });
			});
	},
	incomeCategoryRemove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		await Financial.incomeOriginRemoveByCategory(req.query.id);

		Financial.incomeCategoryRemove(req.query.id)
			.then(result => {
				res.send({ done: "Categoria removida com sucesso!" });
			})
			.catch(err => {
				res.send({ done: "Ocorreu um erro ao remover a categoria, favor contatar o suporte." });
			});
	},
	incomeOriginSave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const origin = {
			category_id: req.body.category_id,
			name: req.body.origin_name
		};

		Financial.incomeOriginSave(origin)
			.then(result => {
				res.send({ done: "Categoria cadastrada com sucesso!" });
			})
			.catch(err => {
				res.send({ msg: "Ocorreu um erro ao cadastrar a origem da receita!" });
			});
	},
	incomeOriginFilterByCategory: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		Financial.incomeOriginFindByCategory(req.query.id)
			.then(incomeOrigins => {
				res.send(incomeOrigins);
			})
			.catch(err => {
				res.send({ msg: "Ocorreu um erro ao cadastrar a origem da receita!" });
			});
	},
	incomeOriginFilter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		Financial.incomeOriginFindById(req.query.id)
			.then(origin => {
				res.send(origin);
			})
			.catch(err => {
				res.send({ msg: "Ocorreu um erro ao cadastrar a origem da receita!" });
			});
	},
	incomeOriginRemove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		Financial.incomeOriginRemove(req.query.id)
			.then(result => {
				res.send({ done: "Origem removida com sucesso!" });
			})
			.catch(err => {
				res.send({ done: "Ocorreu um erro ao remover a categoria, favor contatar o suporte." });
			});
	},

	// --------------------------
	// outcome functions
	// --------------------------
	outcome: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.redirect('/');
		};

		const outcomeCategories = await Financial.outcomeCategoryList();

		res.render('financial/outcome', { user: req.user, outcomeCategories });
	},
	outcomeSave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		const outcome = {
			date: lib.genPatternDate(),
			full_date: lib.genFullDate(),
			category_id: req.body.category_id,		
			category_name: req.body.category_name,		
			origin_id: req.body.origin_id,		
			origin_name: req.body.origin_name,		
			payment_id: req.body.payment_id,		
			payment_name: req.body.payment_name,		
			value: req.body.value,
			obs: req.body.obs,
			user_id: req.user.id,
			user_name: req.user.name
		};

		Financial.outcomeSave(outcome)
			.then(() => {
				res.send({ done: "Despesa cadastrada com sucesso!" });
			})
			.catch(err => {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar a despesa, favor contatar o suporte" });
			});
	},
	outcomeFindById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		Financial.outcomeFindById(req.params.id)
			.then(outcome => {
				res.send(outcome);
			})
			.catch(err => {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar as receitas, favor contatar o suporte" });
			});
	},
	outcomeFilter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let params = [];
		let values = [];

		if(req.body.outcome_periodStart && req.body.outcome_periodEnd){
			var periodStart = req.body.outcome_periodStart;
			var periodEnd = req.body.outcome_periodEnd;
		} else {
			var periodStart = "";
			var periodEnd = "";
		};

		if(parseInt(req.body.outcome_category)){
			params.push("category_id");
			values.push(req.body.outcome_category);
		};

		if(parseInt(req.body.outcome_origin)){
			params.push("origin_id");
			values.push(req.body.outcome_origin);
		};

		if(parseInt(req.body.outcome_payment)){
			params.push("payment_id");
			values.push(req.body.outcome_payment);
		};

		Financial.outcomeFilter(periodStart, periodEnd, params, values)
			.then(outcomes => {
				res.send(outcomes);
			})
			.catch(err => {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar as receitas, favor contatar o suporte" });
			});
	},
	outcomeDelete: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Financial.outcomeDelete(req.query.id);
			res.send({ done: 'Saída excluída com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao excluir a saída, favor entrar em contato com o suporte." });
		};
	},
	outcomeCategorySave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const category = {
			name: req.body.category_name
		};

		Financial.outcomeCategorySave(category)
			.then(row => {
				res.send({ done: 'A categoria de receita foi cadastrada com sucesso!' });
			})
			.catch(err => {
				res.send({ err: 'Ocorreu um erro ao salvar a categoria de receita!' });
			});
	},
	outcomeCategoryFilter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const category = {
			name: req.query.name
		};

		if(req.query.name){
			Financial.findOutcomeCategoryByName(category)
				.then(categories => {
					res.send( categories );
				})
				.catch(err => {
					res.send({ err: 'Ocorreu um erro ao filtrar as categorias de receita!' });
				});
		} else {
			Financial.outcomeCategoryList()
				.then(categories => {
					res.send( categories );
				})
				.catch(err => {
					res.send({ err: 'Ocorreu um erro ao filtrar as categorias de receita!' });
				});
		};
	},
	outcomeCategoryList: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		Financial.outcomeCategoryList()
			.then(outcomeCategories => {
				res.send(outcomeCategories);
			})
			.catch(err => {
				res.send({ err: 'Ocorreu um erro ao salvar a categoria de receita!' });
			});
	},
	outcomeCategoryRemove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		await Financial.outcomeOriginRemoveByCategory(req.query.id);

		Financial.outcomeCategoryRemove(req.query.id)
			.then(result => {
				res.send({ done: "Categoria removida com sucesso!" });
			})
			.catch(err => {
				res.send({ done: "Ocorreu um erro ao remover a categoria, favor contatar o suporte." });
			});
	},
	outcomeOriginSave: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		const origin = {
			category_id: req.body.category_id,
			name: req.body.origin_name
		};

		Financial.outcomeOriginSave(origin)
			.then(result => {
				res.send({ done: "Categoria cadastrada com sucesso!" });
			})
			.catch(err => {
				res.send({ msg: "Ocorreu um erro ao cadastrar a origem da receita!" });
			});
	},
	outcomeOriginFilterByCategory: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		Financial.outcomeOriginFindByCategory(req.query.id)
			.then(outcomeOrigins => {
				res.send(outcomeOrigins);
			})
			.catch(err => {
				res.send({ msg: "Ocorreu um erro ao cadastrar a origem da receita!" });
			});
	},
	outcomeOriginFilter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		Financial.outcomeOriginFindById(req.query.id)
			.then(origin => {
				res.send(origin);
			})
			.catch(err => {
				res.send({ msg: "Ocorreu um erro ao cadastrar a origem da receita!" });
			});
	},
	outcomeOriginRemove: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		Financial.outcomeOriginRemove(req.query.id)
			.then(result => {
				res.send({ done: "Origem removida com sucesso!" });
			})
			.catch(err => {
				res.send({ done: "Ocorreu um erro ao remover a categoria, favor contatar o suporte." });
			});
	}
};

module.exports = financialController;