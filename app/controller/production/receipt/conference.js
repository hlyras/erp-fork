const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Production = require('../../../model/production/main');
Production.receipt = require('../../../model/production/receipt');
Production.product = require('../../../model/production/product');

const Outcome = require('../../../model/financial/outcome');

const conferenceController = {};

conferenceController.count = {};

conferenceController.index = async (req, res) => {
  try {
    res.render('production/receipt/conference/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

conferenceController.approved = async (req, res) => {
  const receipt_product = new Production.receipt.product();
  receipt_product.id = req.body.id;
  receipt_product.approved_amount = req.body.amount;
  receipt_product.approved_datetime = lib.date.timestamp.generate();

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    receipt_product.approved_user_id = verifiedUser.id;

    let response = await receipt_product.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produtos aprovados!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};

conferenceController.reproved = async (req, res) => {
  const receipt_product = new Production.receipt.product();
  receipt_product.id = req.body.id;
  receipt_product.reproved_amount = req.body.amount;
  receipt_product.reproved_datetime = lib.date.timestamp.generate();

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    receipt_product.reproved_user_id = verifiedUser.id;

    let response = await receipt_product.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produtos aprovados!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};

conferenceController.filigran_reproved = async (req, res) => {
  const receipt_product = new Production.receipt.product();
  receipt_product.id = req.body.id;
  receipt_product.filigran_reproved_amount = req.body.amount;
  receipt_product.filigran_reproved_datetime = lib.date.timestamp.generate();

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    receipt_product.filigran_reproved_user_id = verifiedUser.id;

    let response = await receipt_product.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produtos aprovados!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};

module.exports = conferenceController;