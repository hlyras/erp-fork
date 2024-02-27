const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Catalog = function () {
  this.id;
  this.name;
  this.path;

  this.create = () => {
    if (!this.name) { return { err: "É necessário incluir o nome do catálogo" } };
    if (!this.path || this.path[0] != "/") { return { err: "a URL do catálogo é inválida ou não começa com o caractere '/'" } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.product_price_category');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do catálogo é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.product_price_category', 'id');

    return db(query, values);
  };
};

Catalog.findById = async (id) => {
  let query = `SELECT * FROM cms_wt_erp.product_price_category WHERE id='${id}';`;
  return db(query);
};

Catalog.findByCode = async (code) => {
  let query = `SELECT * FROM cms_wt_erp.product_price_category WHERE code='${code}';`;
  return db(query);
};

Catalog.filter = ({ props, inners, params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.product_price_category catalog")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

Catalog.delete = async (id) => {
  let query = `DELETE FROM cms_wt_erp.product_price_category WHERE id='${id}';`;
  return db(query);
};

module.exports = Catalog;