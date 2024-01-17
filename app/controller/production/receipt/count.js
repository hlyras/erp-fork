const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Production = require('../../../model/production/main');
Production.receipt = require('../../../model/production/receipt');
Production.product = require('../../../model/production/product');

const countController = {};

countController.count = {};

countController.index = async (req, res) => {
  try {
    res.render('production/receipt/count/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

countController.confirm = async (req, res) => {
  const production_receipt = new Production.receipt();
  production_receipt.id = req.body.id;
  production_receipt.count_datetime = lib.date.timestamp.generate();
  production_receipt.status = "Em conferência";

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    production_receipt.count_user_id = verifiedUser.id;

    let response = await production_receipt.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produção atualizada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};

module.exports = countController;