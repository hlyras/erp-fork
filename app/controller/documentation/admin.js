// const User = require('../../model/user');
// const userController = require('./../user');

const adminDocumentationController = {};

adminDocumentationController.main = async (req, res) => {
	if(!req.user){ res.redirect('/'); } else {
		try {
			res.render('documentation/admin/main', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	}
};

adminDocumentationController.nf = async (req, res) => {
	if(!req.user){ res.redirect('/'); } else {
		try {
			res.render('documentation/admin/nf', { user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	}
};

module.exports = adminDocumentationController;