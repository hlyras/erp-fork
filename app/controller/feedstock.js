const User = require('../model/user');
const userController = require('./user');

// const Feedstock = require('../model/feedstock');

const feedstockController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		res.render('feedstock/index');
	}
};

module.exports = feedstockController;