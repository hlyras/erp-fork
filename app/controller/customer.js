const userController = require('./user');

const customerController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('customer/index', { user: req.user });
	}
};

module.exports = customerController;