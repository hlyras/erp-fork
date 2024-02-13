const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Purchase = function () {
  this.id;
  this.date;
  this.status;
  this.supplier_id;
  this.payment_method;
  this.total_value;
  this.user_id;
  this.confirmation_user_id;
  this.confirmation_date;
  this.receiver_user_id;
  this.receiver_date;

  this.create = () => {
    if (!this.date) { return { err: "A data do pedido é inválida." } };
    if (!this.status) { return { err: "É necessário incluir a unidade de medida." } };
    if (!this.supplier_id) { return { err: "É necessário informar o fornecedor." } };
    if (!this.user_id) { return { err: "É necessário informar o principal fornecedor." } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.feedstock_purchase');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da compra é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.feedstock_purchase', 'id');

    return db(query, values);
  };
};

Purchase.filter = (options) => {
  let { query, values } = new lib.Query().select().props(options.props).table("cms_wt_erp.feedstock_purchase purchase")
    .inners(options.inners)
    .lefts(options.lefts)
    .period(options.period)
    .params(options.params)
    .strictParams(options.strict_params)
    .inParams(options.in_params)
    .order(options.order_params)
    .limit(options.limit)
    .build();
  return db(query, values);
};

Purchase.delete = (purchase_id) => {
  let query = `DELETE FROM cms_wt_erp.feedstock_purchase WHERE id = ?;`;
  return db(query, [purchase_id]);
};

module.exports = Purchase;