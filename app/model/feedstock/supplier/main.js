const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Supplier = function () {
  this.id;
  this.cnpj;
  this.origin_id;
  this.trademark;
  this.brand;
  this.name;
  this.phone;

  this.create = () => {
    if (!this.origin_id) { return { err: "É necessário atrelar uma origem a esse fornecedor." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.feedstock_supplier');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da compra é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.feedstock_supplier', 'id');

    return db(query, values);
  };
};

Supplier.filter = ({ props, inners, params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.feedstock_supplier supplier")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

Supplier.delete = (supplier_id) => {
  let query = `DELETE FROM cms_wt_erp.feedstock_supplier WHERE id = ?;`;
  return db(query, [supplier_id]);
};

module.exports = Supplier;