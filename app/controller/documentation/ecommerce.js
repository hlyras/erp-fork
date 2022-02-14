// const User = require('../../model/user');
// const userController = require('./../user');

const ecommerceDocumentationController = {};

ecommerceDocumentationController.solution = async (req, res) => {
	if(!req.user){ res.redirect('/'); };
	
	try {
		res.render('documentation/ecommerce/solution', { user: req.user });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

module.exports = ecommerceDocumentationController;