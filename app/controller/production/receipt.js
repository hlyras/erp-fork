const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Production = require('../../model/production/main');
Production.receipt = require('../../model/production/receipt');

const receiptController = {};

receiptController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ["adm"])) {
    return res.redirect('/');
  };

  try {
    res.render('production/receipt/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

receiptController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
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
    res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
  };
};

receiptController.filter = async (req, res) => {
  const params = { keys: [], values: [] };
  const strict_params = { keys: [], values: [] };

  let period = { key: "production_receipt.datetime", start: req.body.periodStart, end: req.body.periodEnd };
  lib.Query.fillParam("production_receipt.id", req.body.id, strict_params);
  lib.Query.fillParam("production_receipt.production_id", req.body.production_id, strict_params);
  lib.Query.fillParam("production_receipt.status", req.body.status, strict_params);
  lib.Query.fillParam("production_receipt.user_id", req.body.user_id, params);
  let order_params = [["production_receipt.pouch", "ASC"]];

  try {
    const receipts = await Production.receipt.filter([], [], period, params, strict_params, order_params);
    res.send({ receipts });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
  };
};

module.exports = receiptController;