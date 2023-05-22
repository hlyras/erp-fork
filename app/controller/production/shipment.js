const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Production = require('../../model/production/main');
Production.product = require('../../model/production/product');
Production.shipment = require('../../model/production/shipment');

const shipmentController = {};

shipmentController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ["adm", "pro-man"])) {
    return res.redirect('/');
  };

  try {
    res.render('production/shipment/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

shipmentController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', "pro-man"])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  let shipment = new Production.shipment();
  shipment.datetime = lib.date.timestamp.generate();
  shipment.travel_datetime = req.body.travel_datetime;
  shipment.size = req.body.size;
  shipment.volume = req.body.volume;
  shipment.user_id = req.user.id;

  try {
    let response = await shipment.create();
    if (response.err) { return res.send({ msg: response.err }); }

    req.body.productions.forEach(async p => {
      let shipment_production = new Production.shipment.production();
      shipment_production.shipment_id = response.insertId;
      shipment_production.production_id = p.id;

      let shipment_production_response = await shipment_production.save();
      if (shipment_production_response.err) { return res.send({ msg: shipment_production_response.err }); }

      let production = new Production();
      production.id = p.id;
      production.shipment_datetime = req.body.travel_datetime;
      production.status = "Ag. transporte";

      let production_response = await production.update();
      if (production_response.err) { return res.send({ msg: production_response.err }); }
    });

    res.send({ done: "O.S. cadastrada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

shipmentController.findById = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  try {
    let shipment = (await Production.shipment.findById(req.params.id))[0];

    let production_props = ["production.*", "outcome_origin.name seamstress_name"];
    let production_inners = [
      ["cms_wt_erp.production", "shipment_production.production_id", "production.id"],
      ["cms_wt_erp.financial_outcome_origin outcome_origin", "outcome_origin.id", "production.seamstress_id"]
    ];

    let production_strict_params = { keys: [], values: [] };
    lib.Query.fillParam("shipment_production.shipment_id", shipment.id, production_strict_params);

    shipment.productions = await Production.shipment.production.filter(production_props, production_inners, [], production_strict_params, []);

    res.send({ shipment });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
  };
};

shipmentController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass', 'log-pac'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const strict_params = { keys: [], values: [] };
  lib.Query.fillParam("production_shipment.id", req.body.id, strict_params);
  lib.Query.fillParam("production_shipment.status", req.body.status, strict_params);

  try {
    let shipments = await Production.shipment.filter([], [], [], strict_params, []);
    res.send({ shipments });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
  };
};

shipmentController.collect = {};

shipmentController.collect.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ["adm", 'pro-man', 'pro-ass'])) {
    return res.redirect('/');
  };

  try {
    res.render('production/shipment-collect/index', { user: req.user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

shipmentController.collect.confirm = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const shipment = new Production.shipment();
  shipment.id = req.params.id;
  shipment.collect_datetime = lib.date.timestamp.generate();
  shipment.collect_user_id = req.user.id;
  shipment.status = "Enviado";

  try {
    let shipment_response = await shipment.update();
    if (shipment_response.err) { return res.send({ msg: shipment_response.err }); }

    let production_strict_params = { keys: [], values: [] };
    lib.Query.fillParam("shipment_production.shipment_id", shipment.id, production_strict_params);

    shipment.productions = await Production.shipment.production.filter([], [], [], production_strict_params, []);

    shipment.productions.forEach(async p => {
      let production = new Production();
      production.id = p.production_id;
      production.shipment_datetime = lib.date.timestamp.generate();
      production.status = "Em produção";
      production.service_order = req.params.id;
      let production_response = await production.update();
      if (production_response.err) { return res.send({ msg: production_response.err }); }
    });

    res.send({ done: "O.S. coletada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

module.exports = shipmentController;