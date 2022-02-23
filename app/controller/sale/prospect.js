const User = require('../../model/user');
const userController = require('./../user');

const prospectController = {};

prospectController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};

	res.render("sale/flow/index", { user: req.user });
};

module.exports = prospectController;