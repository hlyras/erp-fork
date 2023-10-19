const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Feedstock = require('../../../model/feedstock/main');
Feedstock.purchase = require('../../../model/feedstock/purchase');

const orderController = {};

orderController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.redirect('/');
  };

  try {
    let suppliers = await Feedstock.supplier.filter([], [], [], [], []);
    res.render('feedstock/purchase/order/index', { user: req.user, suppliers });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

orderController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const order_feedstock = new Feedstock.purchase.order();
  order_feedstock.datetime = lib.date.timestamp.generate();
  order_feedstock.status = "Ag. pedido"; //Cancelado, Pendente, Confirmado
  order_feedstock.feedstock_id = req.body.feedstock_id;
  order_feedstock.amount = req.body.amount;
  order_feedstock.user_id = req.user.id;

  if (!order_feedstock.feedstock_id) { return res.send({ msg: "É necessário selecionar a matéria-prima." }); }
  if (!order_feedstock.amount || order_feedstock.amount < 1) { return res.send({ msg: "Quantidade inválida" }); }

  try {
    let strict_params = { keys: [], values: [] };
    lib.Query.fillParam("purchase_order.feedstock_id", order_feedstock.feedstock_id, strict_params);
    lib.Query.fillParam("purchase_order.status", "Ag. pedido", strict_params);
    let verifyDuplicity = await Feedstock.purchase.order.filter([], [], [], [], strict_params, []);
    if (verifyDuplicity.length) { return res.send({ msg: "Este insumo já está cadastrado." }); }

    const response = await order_feedstock.create();
    if (response.err) { res.send({ msg: response.err }); }

    res.send({ done: "Matéria-prima solicitada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima." });
  }
};

orderController.update = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const order_feedstock = new Feedstock.purchase.order();
  order_feedstock.id = req.body.id;
  order_feedstock.status = req.body.status; //Cancelado, Pendente, Confirmado
  order_feedstock.amount = req.body.amount;
  order_feedstock.user_id = req.user.id;
  order_feedstock.supplier_id = req.body.supplier_id;
  order_feedstock.user_id = req.user.id;

  try {
    const response = await order_feedstock.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Matéria-prima solicitada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima." });
  }
};

orderController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  let props = [
    "purchase_order.*",
    "feedstock.id feedstock_id", "feedstock.code", "feedstock.name", "feedstock.name", "feedstock.color_id", "feedstock.uom", "feedstock.unit",
    "color.name color_name"
  ];

  let inners = [
    ["cms_wt_erp.feedstock", "feedstock.id", "purchase_order.feedstock_id"],
    ["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"]
  ];

  let period = { key: "datetime", start: req.body.period_start, end: req.body.period_end };
  let params = { keys: [], values: [] };
  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("purchase_order.id", req.body.id, strict_params);
  lib.Query.fillParam("purchase_order.status", req.body.status, strict_params);
  lib.Query.fillParam("purchase_order.purchase_id", req.body.purchase_id, strict_params);
  lib.Query.fillParam("purchase_order.feedstock_id", req.body.feedstock_id, strict_params);
  lib.Query.fillParam("feedstock.name", req.body.feedstock_name, params);
  lib.Query.fillParam("feedstock.color", req.body.feedstock_color, params);

  let order_params = [["feedstock.code", "ASC"]];

  try {
    let orders = await Feedstock.purchase.order.filter(props, inners, period, params, strict_params, order_params);

    res.send({ orders });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
  };
};

orderController.delete = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  try {
    await Feedstock.purchase.order.delete(req.params.id);

    res.send({ done: "Cancelado com sucesso." });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cancelar, favor entrar em contato com o suporte." });
  };
};

module.exports = orderController;