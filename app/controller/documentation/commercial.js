// const User = require('../../model/user');
// const userController = require('./../user');

const commercialDocumentationController = {};

commercialDocumentationController.nf = async (req, res) => {
	if(!req.user){ res.redirect('/'); } else {
		try {
			res.render('documentation/commercial/nf', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	}
};

commercialDocumentationController.prospect = async (req, res) => {
	if(!req.user){ res.redirect('/'); } else {
		try {
			res.render('documentation/commercial/prospect', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	}
};

module.exports = commercialDocumentationController;