const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Sale = require('../../model/ecommerce/sale');

const Product = require('../../model/product/main');
Product.color = require('../../model/product/color');

const ecommerceController = {};

ecommerceController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'fin-ass', 'adm-aud', 'pro-ass'])) {
    return res.redirect('/');
  };

  try {
    res.render('ecommerce/sale/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

ecommerceController.gathering = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'fin-ass', 'adm-aud'])) {
    return res.redirect('/');
  };

  try {
    res.render('ecommerce/sale/gathering', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

ecommerceController.manage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'log-pac', 'pro-ass'])) {
    return res.redirect('/');
  };

  try {
    res.render('ecommerce/sale/manage', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

ecommerceController.triage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'log-pac', 'pro-ass', 'pro-sto'])) {
    return res.redirect('/');
  };

  try {
    res.render('ecommerce/triage/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

ecommerceController.packment = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'log-pac', 'pro-ass'])) {
    return res.redirect('/');
  };

  try {
    res.render('ecommerce/sale/triage', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

ecommerceController.removal = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'log-pac', 'pro-ass', 'pro-sto'])) {
    return res.redirect('/');
  };

  try {
    res.render('ecommerce/triage/removal/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

ecommerceController.report = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'log-pac', 'pro-ass'])) {
    return res.redirect('/');
  };

  try {
    res.render('ecommerce/report/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = ecommerceController;