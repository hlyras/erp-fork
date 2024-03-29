const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Sale = require('../../../model/sale/main');

const metricsController = {};

metricsController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'pro-man', 'pro-ass'])) {
		return res.redirect('/');
	};

	try {
		let users = await User.list();
		res.render('sale/metrics/index', { user: req.user, users: users });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao acessar as métricas de venda, favor contatar o suporte." })
	};
};

module.exports = metricsController;