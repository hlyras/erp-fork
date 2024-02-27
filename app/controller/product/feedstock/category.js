const userController = require('./../../user/main');

const Product = require('../../../model/product/main');
Product.feedstock = require('../../../model/product/feedstock/main');
Product.feedstock.category = require('../../../model/product/feedstock/category');

const lib = require("jarmlib");

const categoryController = {};

categoryController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-pro'])) {
    return res.redirect('/');
  };

  try {
    res.render('product/feedstock/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
  };
};

categoryController.manage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-pro'])) {
    return res.redirect('/');
  };

  try {
    const productColors = await Product.color.list();
    res.render('product/feedstock/manage/index', { user: req.user, productColors });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
  };
};

categoryController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-pro'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let category = new Product.feedstock.category();
  category.id = req.body.id;
  category.product_id = req.body.product_id;
  category.name = req.body.name;

  try {
    if (!category.id) {
      let response = await category.create();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Processo cadastrado com sucesso!" });
    } else {
      let response = await category.update();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Processo atualizado com sucesso!" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

categoryController.findById = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-pro', 'pro-man'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  try {
    let category = (await Product.feedstock.category.findById(req.params.id))[0];
    res.send({ category });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

categoryController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-pro', 'pro-man'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let strict_params = { keys: [], values: [] };
  lib.Query.fillParam("product_feedstock_category.category_id", req.body.category_id, strict_params);
  lib.Query.fillParam("product_feedstock_category.product_id", req.body.product_id, strict_params);

  try {
    let categories = await Product.feedstock.category.filter({ strict_params });
    res.send({ categories });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

categoryController.delete = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-pro'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  try {
    await Product.feedstock.category.delete(req.params.id);
    await Product.feedstock.removeByCategoryId(req.params.id);
    res.send({ done: "Categoria excluída com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = categoryController;