const lib = require("jarmlib");

const User = require('../../../model/user');
const userController = require('./../../user/main');

const Product = require('../../../model/product/main');
Product.color = require('../../../model/product/color');
Product.filigran = require('../../../model/product/seam/filigran');

const filigranController = {};

filigranController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.redirect('/');
  };

  try {
    res.render('product/seam/filigran/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
  };
};

filigranController.manage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.redirect('/');
  };

  try {
    const productColors = await Product.color.list();
    res.render('product/seam/filigran/manage', { user: req.user, productColors });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
  };
};

filigranController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let filigran = new Product.filigran();
  filigran.id = req.body.id;
  filigran.product_id = req.body.product_id;
  filigran.code = req.body.code;
  filigran.template = req.body.template;
  filigran.name = req.body.name;
  filigran.time = req.body.time;

  try {
    if (!filigran.id) {
      let response = await filigran.create();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Processo de costura cadastrado com sucesso!" });
    } else {
      let response = await filigran.update();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Processo de costura atualizado com sucesso!" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

filigranController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let props = [];
  let inners = [];

  let params = { keys: [], values: [] };
  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("product_filigran.id", req.body.id, strict_params);
  lib.Query.fillParam("product_filigran.code", req.body.code, strict_params);
  lib.Query.fillParam("product_filigran.name", req.body.name, params);

  try {
    let filigrans = await Product.filigran.filter(props, inners, params, strict_params, []);
    res.send({ filigrans });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

filigranController.findById = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let props = [];
  let inners = [];

  let strict_params = { keys: [], values: [] };
  lib.Query.fillParam("product_filigran.id", req.params.id, strict_params);

  try {
    let filigran = (await Product.filigran.filter(props, inners, [], strict_params, []))[0];
    res.send({ filigran });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

filigranController.delete = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  try {
    let response = await Product.filigran.delete(req.params.id);
    res.send({ done: "Processo de costura excluído com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = filigranController;