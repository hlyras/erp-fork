const userController = require('./../../user');
const lib = require("jarmlib");

const Product = require('../../../model/product/main');
Product.catalog = require('../../../model/product/catalog/main');
Product.catalog.product = require('../../../model/product/catalog/product');

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

  try {
    res.send({ done: "Catálogo cadastrado com sucesso!" });
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
    let catalogs = await Product.catalog.filter([], [], [], [], []);
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

  try {
    let catalog = (await Product.catalog.findById(req.params.id))[0];

    let strict_params = { keys: [], values: [] };
    lib.Query.fillParam("catalog_product.category_id", catalog.id, strict_params);
    catalog.products = await Product.catalog.product.filter([], [], [], strict_params, []);

    res.send({ catalog });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = catalogController;