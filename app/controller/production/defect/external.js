const userController = require('./../user/main');

const Production = require('../../model/production/main');
Production.product = require('../../model/production/product');

const externalDefectController = {};

externalDefectController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ["adm"])) {
    return res.redirect('/');
  };

  try {
    res.render('production/defect/internal/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = externalDefectController;