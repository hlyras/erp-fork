const userController = require('./../../user/main');
const lib = require("jarmlib");

const Product = require('../../../model/product/main');
Product.catalog = require('../../../model/product/catalog/main');
Product.catalog.product = require('../../../model/product/catalog/product');
Product.catalog.package = require('../../../model/product/catalog/package');

const catalogController = {};

catalogController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.redirect('/');
  };

  try {
    res.render('product/catalog/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

catalogController.manage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.redirect('/');
  };

  try {
    res.render('product/catalog/manage/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

catalogController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let catalog = new Product.catalog();
  catalog.id = req.body.id;
  catalog.name = req.body.name;
  catalog.path = req.body.path;

  try {
    if (!catalog.id) {
      let response = await catalog.create();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Catálogo cadastrado com sucesso!" });
    } else {
      let response = await catalog.update();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Catálogo atualizado com sucesso!" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

catalogController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  try {
    let catalogs = await Product.catalog.filter({});
    res.send({ catalogs });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

catalogController.findById = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  // Produtos
  let product_options = {
    props: ["catalog_product.*", "product.code", "product.name", "product.color", "product.size"],
    inners: [["cms_wt_erp.product product", "catalog_product.product_id", "product.id"]],
    strict_params: { keys: [], values: [] }
  };
  lib.Query.fillParam("catalog_product.category_id", req.params.id, product_options.strict_params);

  // Pacotes
  let package_options = {
    props: ["catalog_package.*", "package.code", "package.name", "package.color"],
    inners: [["cms_wt_erp.product_package package", "catalog_package.package_id", "package.id"]],
    strict_params: { keys: [], values: [] }
  };
  lib.Query.fillParam("catalog_package.category_id", req.params.id, package_options.strict_params);

  try {
    let catalog = (await Product.catalog.findById(req.params.id))[0];
    catalog.products = await Product.catalog.product.filter(product_options);
    catalog.packages = await Product.catalog.package.filter(package_options);

    res.send({ catalog });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = catalogController;