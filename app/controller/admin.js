const userController = require('./user/main');

const adminController = {};

adminController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};
	res.render('admin/index', { user: req.user });
};

adminController.user = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};
	res.render('admin/user/index', { user: req.user });
};

module.exports = adminController;