const lib = require("jarmlib");

const userController = require('./../../user');

const Product = require('../../../model/product/main');

const storageController = {};

storageController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.redirect('/');
  };

  try {
    res.render('product/storage/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
  };
};

storageController.manage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.redirect('/');
  };

  try {
    res.render('product/storage/manage/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
  };
};

module.exports = storageController;