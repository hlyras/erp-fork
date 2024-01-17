const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Order = function () {
  this.id;
  this.datetime;
  this.status;
  this.purchase_id;
  this.feedstock_id;
  this.amount;
  this.purchase_id;

  this.create = () => {
    if (!this.datetime) { return { err: "É necessário incluir o código da matéria-prima." } };
    if (!this.feedstock_id) { return { err: "É necessário incluir o código da matéria-prima." } };
    if (!this.amount) { return { err: "É necessário incluir o nome da matéria-prima." } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.feedstock_purchase_order');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do insumo é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.feedstock_purchase_order', 'id');

    return db(query, values);
  };
};

Order.filter = (options) => {
  let { query, values } = new lib.Query().select().props(options.props).table("cms_wt_erp.feedstock_purchase_order purchase_order")
    .inners(options.inners)
    .lefts(options.lefts)
    .period(options.period)
    .params(options.params)
    .strictParams(options.strict_params)
    .order(options.order_params)
    .build();
  return db(query, values);
};

Order.delete = async (id) => {
  let query = `DELETE FROM cms_wt_erp.feedstock_purchase_order WHERE id='${id}';`;
  return db(query);
};

module.exports = Order;