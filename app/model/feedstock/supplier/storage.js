const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Storage = function () {
  this.id;
  this.supplier_id;
  this.feedstock_id;
  this.price;

  this.create = () => {
    if (!this.supplier_id) { return { err: "É necessário informar o fornecedor." }; }
    if (!this.feedstock_id) { return { err: "É necessário informar a matéria-prima." }; }
    if (!this.price) { return { err: "É necessário informar o preço." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.feedstock_supplier_storage');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da matéria-prima é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.feedstock_supplier_storage', 'id');

    return db(query, values);
  };
};

Storage.filter = (options) => {
  let { query, values } = new lib.Query().select().props(options.props).table("cms_wt_erp.feedstock_supplier_storage supplier_storage")
    .inners(options.inners)
    .lefts(options.lefts)
    .params(options.params)
    .strictParams(options.strict_params)
    .order(options.order_params)
    .build();
  return db(query, values);
};

Storage.delete = (id) => {
  let query = `DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE id = ?;`;
  return db(query, [id]);
};

Storage.deleteByFeedstockId = (feedstock_id) => {
  let query = `DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE feedstock_id = ?;`;
  return db(query, [feedstock_id]);
};

Storage.deleteBySupplierId = (supplier_id) => {
  let query = `DELETE FROM cms_wt_erp.feedstock_supplier_storage WHERE supplier_id = ?;`;
  return db(query, [supplier_id]);
};

module.exports = Storage;