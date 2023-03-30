const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Production = require('../../model/production/main');

const countController = {};

countController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ["adm"])) {
    return res.redirect('/');
  };

  try {
    res.render('production/count/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = countController;