const userController = require('./user');

const Seamstress = require('./../model/seamstress');

const seamController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		res.render('seam/index', { user: req.user });
	},
	internal: {
		index: async (req, res) => {
			res.render('seam/internal/index', { user: req.user });
		},
		seamstress: {
			save: async (req, res) => {
				res.send('Saved');
			},
			list: async (req, res) => {
				
			}
		}
	},
	external: {
		index: async (req, res) => {
			res.render('seam/external/index', { user: req.user });
		},
		seamstress: {
			save: async (req, res) => {
				res.send('Saved');
			},
			list: async (req, res) => {

			}
		}
	}
};

module.exports = seamController;