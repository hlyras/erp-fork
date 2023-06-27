const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Production = require('../../model/production/main');
Production.receipt = require('../../model/production/receipt');
Production.product = require('../../model/production/product');

const Outcome = require('../../model/financial/outcome');

const receiptController = {};

receiptController.index = async (req, res) => {
  try {
    res.render('production/receipt/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

receiptController.manage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
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
    res.render('production/receipt/manage/index', { user: req.user, internal_seamstresses, external_seamstresses });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

receiptController.collect = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ["adm", 'pro-man', 'pro-ass', 'log-pac'])) {
    return res.redirect('/');
  };

  try {
    res.render('production/receipt/collect/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

receiptController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  let receipt = new Production.receipt();
  receipt.id = req.body.id;
  receipt.datetime = lib.date.timestamp.generate();
  receipt.production_id = req.body.production_id;
  receipt.pouch = req.body.pouch;
  receipt.seal = req.body.seal;
  receipt.user_id = req.user.id;

  try {
    let response = await receipt.create();
    if (response.err) { return res.send({ msg: response.err }); }

    const strict_params = { keys: [], values: [] };
    lib.Query.fillParam("production_receipt.production_id", req.body.production_id, strict_params);

    const receipts = await Production.receipt.filter([], [], [], [], strict_params, []);
    const production = (await Production.findById(req.body.production_id))[0];

    let volume_verify = receipts.reduce((vol, r) => {
      for (let i = 1; i <= production.preparation_volume; i++) { if (r.pouch == i) { vol++; } };
      return vol;
    }, 0);

    if (volume_verify == production.preparation_volume) {
      let p = new Production();
      p.id = production.id;
      p.status = "Entregue";
      let response = await p.update();
      if (response.err) { return res.send({ msg: response.err }); }
    }

    res.send({ done: "Produção recebida com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao gerar o recebimento." });
  };
};

module.exports = receiptController;