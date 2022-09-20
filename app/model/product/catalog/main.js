const db = require('../../../../config/connection');
const lib = require("jarmlib");

// product_price_category = product_catalog
// product_price = product_catalog_price

const Catalog = function () {
  this.id;
  this.name;
  this.path;

  this.create = () => {
    if (!this.name) { return { err: "É necessário incluir o nome do catálogo" } };
    if (!this.path) { return { err: "É necessário incluir o diretório do catálogo" } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.save(obj, 'cms_wt_erp.product_price_category');

    return db(query);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do catálogo é inválido." }; }

    let obj = lib.convertTo.object(this);
    let query = lib.Query.update(obj, 'cms_wt_erp.product_price_category', 'id');

    return db(query);
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

Catalog.filter = (props, inners, params, strict_params, order_params) => {
  let query = new lib.Query().select().props(props).table("cms_wt_erp.product_price_category catalog")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
  return db(query);
};

Catalog.delete = async (id) => {
  let query = `DELETE FROM cms_wt_erp.product_price_category WHERE id='${id}';`;
  return db(query);
};

module.exports = Catalog;