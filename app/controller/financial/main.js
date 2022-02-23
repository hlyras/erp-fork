const userController = require('./../user');
const lib = require('jarmlib');

const Income = require('../../model/financial/income');
const Outcome = require('../../model/financial/outcome');

const financialController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.redirect('/');
		};

		const incomeCategories = await Income.category.list();
		const outcomeCategories = await Outcome.category.list();

		res.render('financial/index', { user: req.user, incomeCategories, outcomeCategories });
	}
};

module.exports = financialController;