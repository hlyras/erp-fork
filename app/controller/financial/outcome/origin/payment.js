const userController = require('./../../../user/main');
const OutcomeOriginPayment = require('../../../../model/financial/outcome/origin/payment');

const lib = require("jarmlib");

const paymentController = {};

paymentController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  let payment = new OutcomeOriginPayment();
  payment.id = req.body.id;
  payment.origin_id = req.body.origin_id;
  payment.method = req.body.method;
  payment.user_id = req.user.id;

  if (payment.method == "Pix") {
    payment.pix_receiver = req.body.pix_receiver;
    payment.pix_key = req.body.pix_key;
  } else if (payment.method == "Transferência bancária") {
    payment.transfer_receiver = req.body.transfer_receiver;
    payment.transfer_register = req.body.transfer_register;
    payment.transfer_bank = req.body.transfer_bank;
    payment.transfer_agency = req.body.transfer_agency;
    payment.transfer_account = req.body.transfer_account;
    payment.transfer_account_type = req.body.transfer_account_type;
  }

  if (!payment.origin_id) { return res.send({ msg: "É necessário identificar a origem." }); };
  if (!payment.method) { return res.send({ msg: "É necessário identificar o método de pagamento." }); };

  if (payment.method == "Pix") {
    if (!payment.pix_receiver) { return res.send({ msg: "É necessário identificar o recebedor do Pix." }); };
    if (!payment.pix_key) { return res.send({ msg: "É necessário identificar a chave do Pix." }); };
  } else if (payment.method == "Transferência bancária") {
    if (!payment.transfer_receiver) { return res.send({ msg: "É necessário identificar o recebedor do pagamento." }); };
    if (!payment.transfer_register) { return res.send({ msg: "É necessário identificar o registro do recebedor (CPF ou CNPJ)." }); };
    if (!payment.transfer_bank) { return res.send({ msg: "É necessário identificar o banco do recebedor." }); };
    if (!payment.transfer_agency) { return res.send({ msg: "É necessário identificar a agência." }); };
    if (!payment.transfer_account) { return res.send({ msg: "É necessário identificar a conta." }); };
    if (!payment.transfer_account_type) { return res.send({ msg: "É necessário identificar o tipo de conta." }); };
  }

  try {
    if (!payment.id) {
      let row = await payment.create();
      payment.id = row.insertId;
      res.send({ done: "Pagamento cadastrado com sucesso!", payment });
    } else {
      let row = await payment.update();
      payment.id = row.insertId;
      res.send({ done: "Pagamento atualizado com sucesso!", payment });
    };
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
  };
};

paymentController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para acessar!" });
  };

  let params = { keys: [], values: [] };
  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("outcome_origin_payment.id", req.body.id, strict_params);
  lib.Query.fillParam("outcome_origin_payment.origin_id", req.body.origin_id, strict_params);

  let order_params = [["outcome_origin_payment.id", "ASC"]];

  try {
    let payments = await OutcomeOriginPayment.filter({ params, strict_params, order_params });
    res.send({ payments });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

paymentController.findById = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  try {
    const payment = (await OutcomeOriginPayment.findById(req.params.id))[0];
    res.send({ payment });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
  };
};

paymentController.delete = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  try {
    await OutcomeOriginPayment.delete(req.params.id);
    res.send({ done: 'Pagamento excluído com sucesso!' });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
  };
};

module.exports = paymentController;