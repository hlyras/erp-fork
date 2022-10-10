const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Feedstock = function () {
  this.id;
  this.product_id;
  this.feedstock_id;
  this.amount;
  this.measure;
  this.category_id;
  this.obs;

  this.add = () => {
    if (!this.product_id) { return { err: "É necessário incluir o id do produto." } };
    if (!this.feedstock_id) { return { err: "É necessário incluir o id da matéria-prima." } };
    if (!this.amount) { return { err: "É necessário incluir a quantidade." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.save(obj, 'cms_wt_erp.product_feedstock');

    return db(query);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da matéria-prima é inválido." }; }

    let obj = lib.convertTo.object(this);
    let query = lib.Query.update(obj, 'cms_wt_erp.product_feedstock', 'id');

    return db(query);
  };
};

Feedstock.findById = async (id) => {
  let query = `SELECT * FROM cms_wt_erp.product_feedstock WHERE id='${id}';`;
  return db(query);
};

Feedstock.filter = (props, inners, params, strict_params, order_params) => {
  let query = new lib.Query().select().props(props).table("cms_wt_erp.product_feedstock")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
  return db(query);
};

Feedstock.remove = async (id) => {
  let query = `DELETE FROM cms_wt_erp.product_feedstock WHERE id='${id}';`;
  return db(query);
};

Feedstock.removeByProductId = async (product_id) => {
  let query = `DELETE FROM cms_wt_erp.product_feedstock WHERE product_id='${product_id}';`;
  return db(query);
};

Feedstock.removeByCategoryId = async (category_id) => {
  let query = `DELETE FROM cms_wt_erp.product_feedstock WHERE category_id='${category_id}';`;
  return db(query);
};

module.exports = Feedstock;