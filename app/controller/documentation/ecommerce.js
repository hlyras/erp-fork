// const User = require('../../model/user');
// const userController = require('./../user');

const ecommerceDocumentationController = {};

ecommerceDocumentationController.solution = async (req, res) => {
	if(!req.user){ res.redirect('/'); } else {
		try {
			res.render('documentation/ecommerce/solution', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	};
};

ecommerceDocumentationController.gathering = async (req, res) => {
	if(!req.user){ res.redirect('/'); } else {
		try {
			res.render('documentation/ecommerce/gathering', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	};
};

module.exports = ecommerceDocumentationController;