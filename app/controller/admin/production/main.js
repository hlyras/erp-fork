const userController = require('./../../user/main');
const OutcomeOrigin = require('../../../model/financial/outcome/origin/main');

const lib = require("jarmlib");

const productionController = {};

productionController.index = async (req, res) => {
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

  try {
    let internal_seamstresses = await OutcomeOrigin.filter(internal_options);
    let external_seamstresses = await OutcomeOrigin.filter(external_options);
    res.render('admin/production/index', { user: req.user, internal_seamstresses, external_seamstresses });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = productionController;