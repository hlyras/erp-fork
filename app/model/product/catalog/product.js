const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Product = function () {
  this.id;
  this.category_id;
  this.product_id;
  this.price;

  this.add = () => {
    if (!this.category_id) { return { err: "É necessário informar o catálogo." } };
    if (!this.product_id) { return { err: "É necessário incluir o produto." } };
    if (!this.price || isNaN(this.price)) { return { err: "É necessário informar o preço do produto." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.save(obj, 'cms_wt_erp.product_price');

    return db(query);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do produto é inválido." }; }
    if (!this.price || isNaN(this.price)) { return { err: "É necessário informar o preço do produto." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.update(obj, 'cms_wt_erp.product_price', 'id');

    return db(query);
  };
};

Product.findById = async (id) => {
  let query = `SELECT * FROM cms_wt_erp.product_price WHERE id='${id}';`;
  return db(query);
};

Product.filter = (props, inners, params, strict_params, order_params) => {
  let query = new lib.Query().select().props(props).table("cms_wt_erp.product_price catalog_product")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
  return db(query);
};

Product.remove = async (id) => {
  let query = `DELETE FROM cms_wt_erp.product_price WHERE id='${id}';`;
  return db(query);
};

module.exports = Product;