const userController = require('./user');
const Expense = require('../model/expense');

const expenseController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('expense/index', { user: req.user });
	}
};

module.exports = expenseController;