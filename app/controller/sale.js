const userController = require('./user');

const saleController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('sale/index', { user: req.user });
	}
};

module.exports = saleController;