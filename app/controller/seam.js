const userController = require('./user');

const Seamstress = require('./../model/seamstress');

const seamController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		res.render('seam/index', { user: req.user });
	},
	seamstress: {
		index: async (req, res) => {
			res.render('seam/index', { user: req.user });
		},
		save: async (req, res) => {
			res.send('Saved');
		},
		list: async (req, res) => {
			res.send('List');
		}
	}
};

module.exports = seamController;