const lib = require("jarmlib");

const User = require('../../../model/user');
const userController = require('./../../user/main');

const Product = require('../../../model/product/main');
Product.color = require('../../../model/product/color');
Product.seam = require('../../../model/product/seam/main');

const seamController = {};

seamController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.redirect('/');
  };

  try {
    res.render('product/seam/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
  };
};

seamController.manage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.redirect('/');
  };

  try {
    const productColors = await Product.color.list();
    res.render('product/seam/manage/index', { user: req.user, productColors });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
  };
};

seamController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let seam = new Product.seam();
  seam.id = req.body.id;
  seam.product_id = req.body.product_id;
  seam.code = req.body.code;
  seam.machine = req.body.machine;
  seam.name = req.body.name;
  seam.time = req.body.time;

  try {
    if (!seam.id) {
      let response = await seam.create();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Processo de costura cadastrado com sucesso!" });
    } else {
      let response = await seam.update();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Processo de costura atualizado com sucesso!" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

seamController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let props = [];
  let inners = [];

  let params = { keys: [], values: [] };
  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("product_seam.id", req.body.id, strict_params);
  lib.Query.fillParam("product_seam.code", req.body.code, strict_params);
  lib.Query.fillParam("product_seam.name", req.body.name, params);

  try {
    let seams = await Product.seam.filter({ props, inners, params, strict_params });
    res.send({ seams });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

seamController.findById = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let props = [];
  let inners = [];

  let strict_params = { keys: [], values: [] };
  lib.Query.fillParam("product_seam.id", req.params.id, strict_params);

  try {
    let seam = (await Product.seam.filter({ props, inners, strict_params }))[0];
    res.send({ seam });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

seamController.delete = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  try {
    let response = await Product.seam.delete(req.params.id);
    res.send({ done: "Processo de costura excluído com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = seamController;