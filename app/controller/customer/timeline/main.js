const userController = require('./../../user/main');
const CustomerTimeline = require('../../../model/customer/timeline');
const Rank = require('../../../model/customer/rank');
const Sale = require('../../../model/sale/main');

const lib = require("jarmlib");
const { response } = require('express');

const timelineController = {};

timelineController.index = async (req, res) => {
  // if (!await userController.verifyAccess(req, res, ['adm'])) {
  //   return res.redirect('/');
  // };

  res.render('customer/timeline/index', { user: req.user });
};

timelineController.create = async (req, res) => {
  // if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
  //   return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  // };

  //cliente x está sem atendimento
  //cliente x está sendo atendido por user x

  const timeline = new CustomerTimeline();
  timeline.datetime = lib.date.timestamp.generate();
  timeline.customer_id = req.body.customer_id;
  timeline.category = "Contato";
  timeline.content = req.body.content;
  timeline.user_id = req.user.id;
  timeline.status = "Feito";
  timeline.meeting_datetime = req.body.meeting_datetime;

  if (timeline.meeting_datetime) {
    timeline.category = "Agendamento";
    timeline.status = "Pendente";
  }

  try {
    let create_response = await timeline.create();
    if (create_response.err) { return res.send({ msg: create_response.err }); }
    res.send({ done: "Contato cadastrado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o contato, favor contate o suporte!" });
  };
};

timelineController.update = async (req, res) => {
  // if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
  //   return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  // };

  const timeline = new CustomerTimeline();
  timeline.id = req.body.id;
  timeline.status = req.body.status;

  try {
    let update_response = await timeline.update();
    if (update_response.err) { return res.send({ msg: update_response.err }); }
    res.send({ done: "Atividade atualizada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o contato, favor contate o suporte!" });
  };
};

timelineController.filter = async (req, res) => {
  // if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass', 'com-pro'])) {
  //   return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  // };

  let props = [
    "timeline.*",
    "customer.name customer_name",
    "customer.phone customer_phone",
    "customer.cellphone customer_cellphone",
    "user.name user_name"
  ];

  let inners = [
    ["cms_wt_erp.customer", "customer.id", "timeline.customer_id"],
    ["cms_wt_erp.user", "user.id", "timeline.user_id"]
  ];

  let period = { key: req.body.date_prop || "datetime", start: req.body.period_start, end: req.body.period_end };
  let params = { keys: [], values: [] };
  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("timeline.customer_id", req.body.customer_id, strict_params);
  lib.Query.fillParam("timeline.status", req.body.status, strict_params);
  req.body.user && lib.Query.fillParam("timeline.user_id", req.user.id, strict_params);

  let order_params = req.body.order_prop || [["timeline.datetime", "DESC"], ["timeline.id", "DESC"]];

  try {
    const timelines = await CustomerTimeline.filter({ props, inners, period, params, strict_params, order_params });
    res.send({ timelines });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o contato, favor contate o suporte!" });
  };
};

module.exports = timelineController;