const User = require('../../../model/user');
const userController = require('./../../user/main');
const userOriginController = require('./../../user/origin');

const lib = require("jarmlib");

const Production = require('../../../model/production/main');
Production.product = require('../../../model/production/product');

const Outcome = require('../../../model/financial/outcome');
const Product = require('../../../model/production/product');

const internalController = {};

internalController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ["adm"])) {
    return res.redirect('/');
  };

  const internal_strict_params = { keys: [], values: [] };
  lib.Query.fillParam("outcome_origin.category_id", 1, internal_strict_params);
  lib.Query.fillParam("outcome_origin.role_id", 1, internal_strict_params);

  const external_strict_params = { keys: [], values: [] };
  lib.Query.fillParam("outcome_origin.category_id", 10, external_strict_params);

  try {
    let internal_seamstresses = await Outcome.origin.filter([], [], internal_strict_params, [['name', 'ASC']]);
    let external_seamstresses = await Outcome.origin.filter([], [], external_strict_params, [['name', 'ASC']]);
    res.render('production/defect/internal/index', { user: req.user, internal_seamstresses, external_seamstresses });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

internalController.collect = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  try {
    let verifiedUser = await userOriginController.verifyPass(req.body.user_pass, ["adm", "sew-man"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    let production = (await Production.findById(req.body.production_id))[0];
    if (production.seamstress_id != verifiedUser) { }

    res.send({ done: "Produção confirmada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao confirmar a produção, favor contatar o suporte." });
  };
};

//function model
// internalController.collect = async (req, res) => {
//   if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
//     return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
//   };

//   try {
//     res.send({ done: "Produção confirmada com sucesso!" });
//   } catch (err) {
//     console.log(err);
//     res.send({ msg: "Ocorreu um erro ao confirmar a produção, favor contatar o suporte." });
//   };
// };

module.exports = internalController;