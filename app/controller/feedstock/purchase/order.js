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

orderController.request = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.redirect('/');
  };

  try {
    let suppliers = await Feedstock.supplier.filter([], [], [], [], []);
    res.render('feedstock/purchase/order/request/index', { user: req.user, suppliers });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

orderController.manage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.redirect('/');
  };

  try {
    res.render('feedstock/purchase/order/manage/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

orderController.supplier = async (req, res) => {
  try {
    res.render('feedstock/purchase/order/supplier/index', { user: req.user });
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

orderController.confirm = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const purchase = new Feedstock.purchase();
  purchase.date = lib.date.timestamp.generate();
  purchase.status = "Ag. aprovação";
  purchase.supplier_id = req.body.supplier_id;
  purchase.user_id = req.user.id;
  purchase.value = 0;
  purchase.total_value = 0;

  let props = ["purchase_order.*", "supplier_feedstock.price"];

  let inners = [
    ["cms_wt_erp.feedstock", "feedstock.id", "purchase_order.feedstock_id"],
    ["cms_wt_erp.feedstock_supplier_storage supplier_feedstock",
      "supplier_feedstock.feedstock_id", "feedstock.id",
      "supplier_feedstock.supplier_id", "purchase_order.supplier_id"]
  ];

  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("purchase_order.supplier_id", req.body.supplier_id, strict_params);
  let order_params = [["feedstock.code", "ASC"]];

  try {
    let orders = await Feedstock.purchase.order.filter(props, inners, [], [], strict_params, order_params);
    if (!orders.length) { return res.send({ msg: "Não há nenhum pedido em aberto." }); }

    let purchase_save = await purchase.save();
    if (purchase_save.err) { return res.send({ msg: purchase_save.err }); }

    purchase.id = purchase_save.insertId;

    for (let i in orders) {
      let purchase_feedstock = new Feedstock.purchase.feedstock();
      purchase_feedstock.purchase_id = purchase.id;
      purchase_feedstock.feedstock_id = orders[i].feedstock_id;
      purchase_feedstock.price = orders[i].price;
      purchase_feedstock.amount = orders[i].amount;

      let purchase_feedstock_save = await purchase_feedstock.save();
      if (purchase_feedstock_save.err) { return res.send({ msg: purchase_feedstock_save.err }); }

      purchase.value += orders[i].price * orders[i].amount;
      purchase.total_value += orders[i].price * orders[i].amount;

      let purchase_order = new Feedstock.purchase.order();
      purchase_order.id = orders[i].id;
      purchase_order.status = "Confirmado";
      purchase_order.purchase_id = purchase.id;
      let purchase_order_update = await purchase_order.update();
      if (purchase_order_update.err) { return res.send({ msg: purchase_order_update.err }); }
    };

    let purchase_update = await purchase.update();
    if (purchase_update.err) { return res.send({ msg: purchase_update.err }); }

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
  let props = [
    "purchase_order.*",
    "feedstock.id feedstock_id", "feedstock.code", "feedstock.name", "feedstock.color_id", "feedstock.uom", "feedstock.unit",
    "color.name color_name",
    "supplier_feedstock.price"
  ];

  let inners = [
    ["cms_wt_erp.feedstock", "feedstock.id", "purchase_order.feedstock_id"],
    ["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"],
    ["cms_wt_erp.feedstock_supplier_storage supplier_feedstock",
      "supplier_feedstock.feedstock_id", "feedstock.id",
      "supplier_feedstock.supplier_id", "purchase_order.supplier_id"]
  ];

  let period = { key: "datetime", start: req.body.period_start, end: req.body.period_end };
  let params = { keys: [], values: [] };
  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("purchase_order.id", req.body.id, strict_params);
  lib.Query.fillParam("purchase_order.status", req.body.status, strict_params);
  lib.Query.fillParam("purchase_order.purchase_id", req.body.purchase_id, strict_params);
  lib.Query.fillParam("purchase_order.feedstock_id", req.body.feedstock_id, strict_params);
  lib.Query.fillParam("purchase_order.supplier_id", req.body.supplier_id, strict_params);
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