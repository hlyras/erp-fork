const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Feedstock = function () {
  this.id;
  this.purchase_id;
  this.feedstock_id;
  this.price;
  this.amount;

  this.create = () => {
    if (!this.purchase_id) { return { err: "A compra é inválida." } };
    if (!this.feedstock_id) { return { err: "É necessário informar a matéria-prima." } };
    if (!this.price) { return { err: "É necessário informar o preço." } };
    if (!this.amount) { return { err: "É necessário informar a quantidade." } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.feedstock_purchase_feedstock');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da compra é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.feedstock_purchase_feedstock', 'id');

    return db(query, values);
  };
};

Feedstock.filter = (options) => {
  let { query, values } = new lib.Query().select().props(options.props).table("cms_wt_erp.feedstock_purchase_feedstock purchase_feedstock")
    .inners(options.inners)
    .lefts(options.lefts)
    .period(options.period)
    .params(options.params)
    .strictParams(options.strict_params)
    .order(options.order_params)
    .build();
  return db(query, values);
};

Feedstock.delete = async (id) => {
  let query = `DELETE FROM cms_wt_erp.feedstock_purchase_feedstock WHERE id = ?;`;
  return db(query, [id]);
};

Feedstock.deleteByPurchaseId = async (purchase_id) => {
  let query = `DELETE FROM cms_wt_erp.feedstock_purchase_feedstock WHERE purchase_id = ?;`;
  return db(query, [purchase_id]);
};

module.exports = Feedstock;