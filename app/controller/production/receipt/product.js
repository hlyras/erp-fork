const User = require('../../../model/user');
const userController = require('./../../user');

const lib = require("jarmlib");

const Production = require('../../../model/production/main');
Production.receipt = require('../../../model/production/receipt');
Production.product = require('../../../model/production/product');

const productController = {};

productController.create = async (req, res) => {
  const received_product = new Production.receipt.product();
  received_product.id = req.body.id;
  received_product.datetime = lib.date.timestamp.generate();
  received_product.receipt_id = req.body.receipt_id;
  received_product.product_id = req.body.product_id;
  received_product.amount = req.body.amount;

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    received_product.user_id = verifiedUser.id;

    let response = await received_product.create();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produção atualizada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};

module.exports = productController;