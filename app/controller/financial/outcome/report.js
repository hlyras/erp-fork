const lib = require("jarmlib");

const userController = require('./../../user');

const Income = require('../../../model/financial/income');
const Outcome = require('../../../model/financial/outcome');
const Expense = require('../../../model/financial/expense');

const reportController = {};

reportController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};

	const incomeCategories = await Income.category.list();
	const outcomeCategories = await Outcome.category.list();

	res.render('financial/outcome/report/index', { user: req.user, incomeCategories, outcomeCategories });
};

module.exports = reportController;