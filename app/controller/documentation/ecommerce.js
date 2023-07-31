// const User = require('../../model/user');
const userController = require('./../user/main');

const ecommerceDocumentationController = {};

ecommerceDocumentationController.asks = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'eco-home'])) {
		return res.redirect('/');
	};

	try {
		res.render('documentation/ecommerce/asks', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

ecommerceDocumentationController.solution = async (req, res) => {
	if (!req.user) { res.redirect('/'); } else {
		try {
			res.render('documentation/ecommerce/solution', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	};
};

ecommerceDocumentationController.gathering = async (req, res) => {
	if (!req.user) { res.redirect('/'); } else {
		try {
			res.render('documentation/ecommerce/gathering', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	};
};

module.exports = ecommerceDocumentationController;