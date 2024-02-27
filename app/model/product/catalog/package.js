const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Package = function () {
  this.id;
  this.category_id;
  this.package_id;
  this.price;

  this.add = () => {
    if (!this.category_id) { return { err: "É necessário informar o catálogo." } };
    if (!this.package_id) { return { err: "É necessário incluir o pacote." } };
    if (!this.price || isNaN(this.price)) { return { err: "É necessário informar o preço do pacote." } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.product_package_price');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do pacote é inválido." }; }
    if (!this.price || isNaN(this.price)) { return { err: "É necessário informar o preço do pacote." } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.product_package_price', 'id');

    return db(query, values);
  };
};

Package.findById = async (id) => {
  let query = `SELECT * FROM cms_wt_erp.product_package_price WHERE id='${id}';`;
  return db(query);
};

Package.filter = ({ props, inners, params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.product_package_price catalog_package")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

Package.remove = async (id) => {
  let query = `DELETE FROM cms_wt_erp.product_package_price WHERE id='${id}';`;
  return db(query);
};

module.exports = Package;