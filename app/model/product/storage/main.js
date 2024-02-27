const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Storage = function () {
  this.id;
  this.product_id;
  this.amount;

  this.add = () => {
    if (!this.product_id) { return { err: "É necessário incluir o produto." } };
    if (!this.amount || isNaN(this.price)) { return { err: "É necessário informar o preço do produto." } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.product_storage');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do produto é inválido." }; }
    if (!this.amount || isNaN(this.amount)) { return { err: "É necessário informar o preço do produto." } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.product_storage', 'id');

    return db(query, values);
  };
};

Storage.findById = async (id) => {
  let query = `SELECT * FROM cms_wt_erp.product_storage WHERE id='${id}';`;
  return db(query);
};

Storage.filter = ({ props, inners, params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.product_storage catalog_product")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

Storage.remove = async (id) => {
  let query = `DELETE FROM cms_wt_erp.product_storage WHERE id='${id}';`;
  return db(query);
};

module.exports = Storage;