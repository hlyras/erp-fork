const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Production = require('../../model/production/main');
Production.product = require('../../model/production/product');

const productController = {};

productController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass', 'log-pac'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  let props = ["production_product.*",
    "production.id production_id", "production.id seamstress_name",
    "production.preparation_deadline", "production.status production_status",
    "outcome_origin.name seamstress_name",
    "product.code", "product.name", "product.color", "product.size"];
  let inners = [
    ["cms_wt_erp.product product", "product.id", "production_product.product_id"],
    ["cms_wt_erp.production production", "production.id", "production_product.production_id"],
    ["cms_wt_erp.financial_outcome_origin outcome_origin", "outcome_origin.id", "production.seamstress_id"]
  ];

  const params = { keys: [], values: [] };
  const strict_params = { keys: [], values: [] };

  lib.Query.fillParam("production_product.production_id", req.body.production_id, strict_params);
  lib.Query.fillParam("product.code", req.body.code, params);
  lib.Query.fillParam("product.name", req.body.name, params);
  lib.Query.fillParam("production.seamstress_id", req.body.seamstress_id, strict_params);
  lib.Query.fillParam("production.location", req.body.location, strict_params);
  lib.Query.fillParam("production.status", req.body.status, strict_params);
  if (req.body.order) {
    order_params = [[req.body.order, "ASC"]];
  } else {
    order_params = [["production.id", "ASC"]];
  }

  try {
    let products = await Production.product.filter(props, inners, params, strict_params, order_params);
    res.send({ products });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
  };
};

module.exports = productController;