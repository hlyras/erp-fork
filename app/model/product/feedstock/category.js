const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Category = function () {
  this.id;
  this.product_id;
  this.name;

  this.create = () => {
    if (!this.name) { return { err: "É necessário incluir o nome da categoria" } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.product_feedstock_category');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da categoria é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.product_feedstock_category', 'id');

    return db(query, values);
  };
};

Category.findById = async (id) => {
  let query = `SELECT * FROM cms_wt_erp.product_feedstock_category WHERE id='${id}';`;
  return db(query);
};

Category.findByCode = async (code) => {
  let query = `SELECT * FROM cms_wt_erp.product_feedstock_category WHERE code='${code}';`;
  return db(query);
};

Category.filter = ({ props, inners, params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.product_feedstock_category product_feedstock_category")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

Category.delete = async (id) => {
  let query = `DELETE FROM cms_wt_erp.product_feedstock_category WHERE id='${id}';`;
  return db(query);
};

Category.deleteByProductId = async (product_id) => {
  let query = `DELETE FROM cms_wt_erp.product_feedstock_category WHERE product_id='${product_id}';`;
  return db(query);
};

module.exports = Category;