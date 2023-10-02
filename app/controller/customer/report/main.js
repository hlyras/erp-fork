const userController = require('../../user/main');
const User = require('../../../model/user');

const lib = require("jarmlib");

const reportController = {};

reportController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.redirect('/');
  };
  res.render('customer/report/sale/index', { user: req.user });
};

module.exports = reportController;
