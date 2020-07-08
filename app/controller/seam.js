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
			res.render('seam/seamstress/index', { user: req.user });
		},
		save: async (req, res) => {
			res.send('Saved');
		},
		list: async (req, res) => {
			res.send('List');
		}
	},
	internal: {
		index: async (req, res) => {
			res.render('seam/internal/index', { user: req.user });
		}
	},
	external: {
		index: async (req, res) => {
			res.render('seam/external/index', { user: req.user });
		}
	}
};

module.exports = seamController;