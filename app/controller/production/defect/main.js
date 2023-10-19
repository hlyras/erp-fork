const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Production = require('../../../model/production/main');
Production.product = require('../../../model/production/product');

const Outcome = require('../../../model/financial/outcome');
const Product = require('../../../model/production/product');

const defectController = {};

defectController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ["adm"])) {
    return res.redirect('/');
  };

  try {
    res.render('production/defect/internal/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = defectController;