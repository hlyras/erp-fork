const db = require('../../../config/connection');
const lib = require("jarmlib");

const Shipment = function () {
  this.id;
  this.datetime;
  this.travel_datetime;
  this.size;
  this.volume;
  this.collect_datetime;
  this.collect_user_id;

  this.create = () => {
    if (!this.datetime) { return { err: "Data de registro inválida." } };
    if (!this.travel_datetime) { return { err: "A Data da viagem é inválida." } };
    if (!this.size) { return { err: "A quantidade de produções é inválida" } };
    if (!this.volume) { return { err: "A quantidade de volumes é inválida" } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.production_shipment');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do envio é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.production_shipment', 'id');

    return db(query, values);
  };
};

Shipment.filter = ({ props, inners, params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.production_shipment")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

Shipment.findById = async (id) => {
  let query = `SELECT * FROM cms_wt_erp.production_shipment WHERE id='${id}';`;
  return db(query);
};

Shipment.production = function () {
  this.id;
  this.shipment_id;
  this.production_id;

  this.save = () => {
    if (!this.shipment_id) { return { err: "Data inválida." } };
    if (!this.production_id) { return { err: "A quantidade de produções é inválida" } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.production_shipment_production');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do envio é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.production_shipment_production', 'id');

    return db(query, values);
  };
};

Shipment.production.filter = ({ props, inners, params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.production_shipment_production shipment_production")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

module.exports = Shipment;