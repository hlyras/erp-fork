const userController = require('../../user/main');
const User = require('../../../model/user');

const Customer = require('../../../model/customer/main');
const Sale = require('../../../model/sale/main');

const lib = require("jarmlib");

const saleController = {};

saleController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.redirect('/');
  };
  res.render('customer/report/sale/index', { user: req.user });
};

// saleController.filter = async (req, res) => {
//   if (!await userController.verifyAccess(req, res, ['adm', 'com-sel'])) {
//     return res.send({ unauthorized: "Você não tem permissão para acessar!" });
//   };

//   res.send();
// };

module.exports = saleController;
