const userController = require('./user/main');
const OutcomeOrigin = require('../model/financial/outcome/origin/main');

const lib = require("jarmlib");

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

adminController.production = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.redirect('/');
  };

  const internal_options = { strict_params: { keys: [], values: [] } };
  lib.Query.fillParam("outcome_origin.category_id", 1, internal_options.strict_params);
  lib.Query.fillParam("outcome_origin.role_id", 1, internal_options.strict_params);
  internal_options.order_params = [['name', 'ASC']];

  const external_options = { strict_params: { keys: [], values: [] } }
  lib.Query.fillParam("outcome_origin.category_id", 10, external_options.strict_params);
  external_options.order_params = [['name', 'ASC']];

  console.log('okok')

  try {
    let internal_seamstresses = await OutcomeOrigin.filter(internal_options);
    console.log(internal_seamstresses);
    let external_seamstresses = await OutcomeOrigin.filter(external_options);
    res.render('admin/production/index', { user: req.user, internal_seamstresses, external_seamstresses });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = adminController;