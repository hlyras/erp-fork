const userController = require('./../../../user/main');
const OutcomeOrigin = require('../../../../model/financial/outcome/origin/main');

const lib = require("jarmlib");

const originController = {};

originController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  let origin = new OutcomeOrigin();
  origin.id = req.body.id;
  origin.category_id = req.body.category_id;
  origin.name = req.body.name;

  if (!origin.name) { return res.send({ msg: "É necessário identificar a categoria." }); };

  try {
    if (!origin.id) {
      let row = await origin.create();
      origin.id = row.insertId;

      res.send({ done: "Origem cadastrada com sucesso!", origin });
    } else {
      let row = await origin.update();
      origin.id = row.insertId;

      res.send({ done: "Origem atualizada com sucesso!", origin });
    };
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
  };
};

originController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para acessar!" });
  };

  let params = { keys: [], values: [] }
  let strict_params = { keys: [], values: [] }

  lib.Query.fillParam("outcome_origin.id", req.body.id, strict_params);
  lib.Query.fillParam("outcome_origin.category_id", req.body.category_id, strict_params);
  lib.Query.fillParam("outcome_origin.name", req.body.name, params);
  lib.Query.fillParam("outcome_origin.cost_type", req.body.cost_type, strict_params);
  lib.Query.fillParam("outcome_origin.role_id", req.body.role_id, strict_params);

  let order_params = [["outcome_origin.name", "ASC"]];

  try {
    let origins = await OutcomeOrigin.filter({ params, strict_params, order_params });
    res.send({ origins });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

originController.findById = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  try {
    const origin = (await OutcomeOrigin.findById(req.params.id))[0];
    res.send({ origin });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
  };
};

originController.delete = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  try {
    await OutcomeOrigin.delete(req.params.id);
    res.send({ done: 'Origem excluída com sucesso!' });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
  };
};

module.exports = originController;