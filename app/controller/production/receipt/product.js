const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Production = require('../../../model/production/main');
Production.receipt = require('../../../model/production/receipt');
Production.product = require('../../../model/production/product');

const productController = {};

productController.create = async (req, res) => {
  const received_product = new Production.receipt.product();
  received_product.id = req.body.id;
  received_product.datetime = lib.date.timestamp.generate();
  received_product.receipt_id = req.body.receipt_id;
  received_product.product_id = req.body.product_id;
  received_product.amount = req.body.amount;

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    received_product.user_id = verifiedUser.id;

    let response = await received_product.create();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produção atualizada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};

productController.filter = async (req, res) => {
  const props = ["receipt_product.*",
    "product.code product_code", "product.name product_name", "product.color product_color", "product.size product_size",
    "receipt.production_id production_id", "receipt.pouch", "receipt.status receipt_status",
    "production.seamstress_id", "production.location", "production.preparation_volume",
    "seamstress.name seamstress_name"
  ];

  const inners = [
    ["cms_wt_erp.product", "product.id", "receipt_product.product_id"],
    ["cms_wt_erp.production_receipt receipt", "receipt.id", "receipt_product.receipt_id"],
    ["cms_wt_erp.production", "receipt.production_id", "production.id"],
    ["cms_wt_erp.financial_outcome_origin seamstress", "production.seamstress_id", "seamstress.id"]
  ];

  const params = { keys: [], values: [] };
  const strict_params = { keys: [], values: [] };

  let period = { key: "receipt_product.datetime", start: req.body.periodStart, end: req.body.periodEnd };

  lib.Query.fillParam("receipt.status", req.body.receipt_status, strict_params);
  lib.Query.fillParam("production.seamstress_id", req.body.seamstress_id, strict_params);
  lib.Query.fillParam("receipt_product.reproved_status", req.body.reproved_status, strict_params);
  lib.Query.fillParam("receipt_product.filigran_reproved_status", req.body.filigran_reproved_status, strict_params);
  lib.Query.fillParam("production.location", req.body.location, strict_params);

  let order_params = [["receipt_product.product_id", "ASC"]];

  try {
    const products = await Production.receipt.product.filter(props, inners, period, params, strict_params, order_params);

    res.send({ products });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar os recebimentos." });
  };
};

module.exports = productController;