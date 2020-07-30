const userController = require('./user');

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
		}
	},
	external: {
		index: async (req, res) => {
			res.render('seam/external/index', { user: req.user });
		}
	}
};

module.exports = seamController;