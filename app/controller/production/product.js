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

  let props = ["production_product.*", "product.code", "product.name", "product.color", "product.size"];
  let inners = [
    ["cms_wt_erp.product product", "product.id", "production_product.product_id"]
  ];

  const params = { keys: [], values: [] };
  const strict_params = { keys: [], values: [] };

  lib.Query.fillParam("production_product.production_id", req.body.production_id, strict_params);
  lib.Query.fillParam("product.code", req.body.code, params);
  lib.Query.fillParam("product.name", req.body.name, params);
  // let order_params = [["product.code", "ASC"]];

  try {
    let products = await Production.product.filter([], [], params, strict_params, []);
    res.send({ products });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
  };
};

module.exports = productController;