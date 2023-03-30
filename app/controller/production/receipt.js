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

receiptController.filter = async (req, res) => {
  let props = [];
  let inners = [];

  const params = { keys: [], values: [] };
  const strict_params = { keys: [], values: [] };

  let period = { key: "production_receipt.datetime", start: req.body.periodStart, end: req.body.periodEnd };
  lib.Query.fillParam("production_receipt.id", req.body.id, strict_params);
  lib.Query.fillParam("production_receipt.production_id", req.body.production_id, strict_params);
  lib.Query.fillParam("production_receipt.status", req.body.status, strict_params);
  lib.Query.fillParam("production_receipt.user_id", req.body.user_id, params);
  let order_params = [["production_receipt.pouch", "ASC"]];

  try {
    const receipts = await Production.receipt.filter(props, inners, period, params, strict_params, order_params);
    res.send({ receipts });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
  };
};

module.exports = receiptController;