const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Production = require('../../../model/production/main');
Production.receipt = require('../../../model/production/receipt');
Production.product = require('../../../model/production/product');

const Outcome = require('../../../model/financial/outcome');

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

receiptController.storage = async (req, res) => {
  try {
    res.render('production/receipt/storage/index', { user: req.user });
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

receiptController.filter = async (req, res) => {
  const props = ["production_receipt.*", "production.seamstress_id", "seamstress.name", "production.preparation_volume"];
  const inners = [
    ["cms_wt_erp.production", "production.id", "production_receipt.production_id"],
    ["cms_wt_erp.financial_outcome_origin seamstress", "seamstress.id", "production.seamstress_id"]
  ];

  const params = { keys: [], values: [] };
  const strict_params = { keys: [], values: [] };

  let period = { key: "production_receipt.datetime", start: req.body.periodStart, end: req.body.periodEnd };
  lib.Query.fillParam("production_receipt.production_id", req.body.production_id, strict_params);
  lib.Query.fillParam("production_receipt.status", req.body.status, strict_params);
  lib.Query.fillParam("production_receipt.seal", req.body.seal, strict_params);
  lib.Query.fillParam("production_receipt.user_id", req.body.user_id, strict_params);

  lib.Query.fillParam("production.location", req.body.location, strict_params);
  lib.Query.fillParam("production.seamstress_id", req.body.seamstress_id, strict_params);

  let order_params = [["production_receipt.pouch", "ASC"]];

  try {
    const receipts = await Production.receipt.filter(props, inners, period, params, strict_params, order_params);
    res.send({ receipts });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar os recebimentos." });
  };
};

receiptController.findById = async (req, res) => {
  try {
    const receipt_props = ["production.preparation_volume", "production_receipt.*", "financial_outcome_origin.name seamstress_name"];
    const receipt_inners = [
      ["cms_wt_erp.production", "production.id", "production_receipt.production_id"],
      ["cms_wt_erp.financial_outcome_origin", "financial_outcome_origin.id", "production.seamstress_id"]
    ];
    const strict_params = { keys: [], values: [] };
    lib.Query.fillParam("production_receipt.id", req.params.id, strict_params);
    const receipt = (await Production.receipt.filter(receipt_props, receipt_inners, [], [], strict_params, []))[0];

    const product_props = ["production_product.production_id", "production_product.product_id", "production_product.amount", "product.code", "product.name", "product.color", "product.size"];
    const product_inners = [
      ["cms_wt_erp.product", "product.id", "production_product.product_id"]
    ];
    const product_strict_params = { keys: [], values: [] };
    lib.Query.fillParam("production_product.production_id", receipt.production_id, product_strict_params);
    let product_order_params = [["production_product.id", "ASC"]];
    receipt.products = await Production.product.filter(product_props, product_inners, [], product_strict_params, product_order_params);

    const received_product_props = ["production_receipt_product.*", "product.code", "product.name", "product.color", "product.size"];
    const received_product_inners = [
      ["cms_wt_erp.product", "product.id", "production_receipt_product.product_id"]
    ];
    const received_product_strict_params = { keys: [], values: [] };
    lib.Query.fillParam("production_receipt_product.receipt_id", receipt.id, received_product_strict_params);
    let received_product_order_params = [["production_receipt_product.id", "ASC"]];
    receipt.received_products = await Production.receipt.product.filter(received_product_props, received_product_inners, [], [], received_product_strict_params, received_product_order_params);

    res.send({ receipt });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao encontrar o recebimento." });
  }
};

module.exports = receiptController;