const User = require('../../../model/user');
const userController = require('./../../user');
// const Datasheet = require('../../../model/product/datasheet');

const lib = require("jarmlib");

const datasheetController = {};

datasheetController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	try {
		res.render('product/datasheet/index', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
	};
};

module.exports = datasheetController;