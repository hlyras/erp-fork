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
  receipt_product.approved_amount = req.body.approved_amount;
  receipt_product.approved_datetime = lib.date.timestamp.generate();

  if (isNaN(receipt_product.approved_amount)) { return res.send({ msg: "Quantidade aprovada inválida!" }); }

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
  receipt_product.reproved_amount = req.body.reproved_amount;
  receipt_product.reproved_datetime = lib.date.timestamp.generate();
  receipt_product.reproved_status = "Concluído";

  if (isNaN(receipt_product.reproved_amount)) { return res.send({ msg: "Quantidade de defeitos inválida!" }); }
  if (receipt_product.reproved_amount > 0) { receipt_product.reproved_status = "Pendente"; }

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    receipt_product.reproved_user_id = verifiedUser.id;

    let response = await receipt_product.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produtos reprovados!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};

conferenceController.filigran_reproved = async (req, res) => {
  const receipt_product = new Production.receipt.product();
  receipt_product.id = req.body.id;
  receipt_product.filigran_reproved_amount = req.body.filigran_reproved_amount;
  receipt_product.filigran_reproved_datetime = lib.date.timestamp.generate();
  receipt_product.filigran_reproved_status = "Concluído";

  if (isNaN(receipt_product.filigran_reproved_amount)) { return res.send({ msg: "Quantidade de defeitos inválida!" }); }
  if (receipt_product.filigran_reproved_amount > 0) { receipt_product.filigran_reproved_status = "Pendente"; }

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    receipt_product.filigran_reproved_user_id = verifiedUser.id;

    let response = await receipt_product.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produtos reprovados!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};

conferenceController.confirm = async (req, res) => {
  const production_receipt = new Production.receipt();
  production_receipt.id = req.body.id;
  production_receipt.conference_datetime = lib.date.timestamp.generate();
  production_receipt.status = "Ag. armazenamento";

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    production_receipt.conference_user_id = verifiedUser.id;

    let response = await production_receipt.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produção conferida com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};

module.exports = conferenceController;