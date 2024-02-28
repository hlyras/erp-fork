const userController = require('./../../user/main');
const lib = require("jarmlib");

const Product = require('../../../model/product/main');
Product.catalog = require('../../../model/product/catalog/main');
Product.catalog.product = require('../../../model/product/catalog/product');
Product.catalog.package = require('../../../model/product/catalog/package');

const productController = {};

productController.add = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let product = new Product.catalog.product();
  product.category_id = req.body.catalog_id;
  product.product_id = req.body.product_id;
  product.price = parseFloat(req.body.price);

  let strict_params = { keys: [], values: [] };
  lib.Query.fillParam("catalog_product.category_id", product.category_id, strict_params);
  lib.Query.fillParam("catalog_product.product_id", product.product_id, strict_params);

  try {
    let products = await Product.catalog.product.filter({ strict_params });
    if (products.length) { return res.send({ msg: "Este produto já está incluso no catálogo." }); }

    let response = await product.add();
    if (response.err) { return res.send({ msg: response.err }); }
    res.send({ done: "Produto adicionado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao atualizar o produto, favor contatar o suporte." });
  }
};

productController.update = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let product = new Product.catalog.product();
  product.id = req.body.id;
  product.price = parseFloat(req.body.price);

  try {
    let response = await product.update();
    if (response.err) { return res.send({ msg: response.err }); }
    res.send({ done: "Produto atualizado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao atualizar o produto, favor contatar o suporte." });
  }
};

productController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  // Products
  let product_options = {
    props: ["catalog_product.*", "product.code", "product.name", "product.color", "product.size"],
    inners: [["cms_wt_erp.product product", "catalog_product.product_id", "product.id"]],
    params: { keys: [], values: [] },
    strict_params: { keys: [], values: [] }
  };

  lib.Query.fillParam("catalog_product.category_id", req.body.catalog_id, product_options.strict_params);
  lib.Query.fillParam("product.code", req.body.code, product_options.strict_params);
  lib.Query.fillParam("product.name", req.body.name, product_options.params);

  // Packages
  let package_options = {
    props: ["catalog_package.*", "package.code", "package.name", "package.color"],
    inners: [["cms_wt_erp.product_package package", "catalog_package.package_id", "package.id"]],
    params: { keys: [], values: [] },
    strict_params: { keys: [], values: [] }
  };

  lib.Query.fillParam("catalog_package.category_id", req.body.catalog_id, package_options.strict_params);
  lib.Query.fillParam("package.code", req.body.code, package_options.strict_params);
  lib.Query.fillParam("package.name", req.body.name, package_options.params);

  try {
    let products = await Product.catalog.product.filter(product_options);
    let packages = await Product.catalog.package.filter(package_options);
    res.send({ products, packages });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar os produtos do catálogo, favor contatar o suporte." });
  }
};

productController.remove = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  try {
    await Product.catalog.product.remove(req.params.id);
    res.send({ done: "Produto removido com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar os produtos do catálogo, favor contatar o suporte." });
  }
};

module.exports = productController;