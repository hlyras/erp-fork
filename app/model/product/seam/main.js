const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Seam = function () {
  this.id;
  this.product_id;
  this.code;
  this.machine;
  this.name;
  this.time;

  this.create = () => {
    if (!this.product_id) { return { err: "É necessário incluir o id do produto." } };
    if (!this.code) { return { err: "É necessário incluir o código do processo." } };
    if (!this.machine) { return { err: "É necessário informar a máquina utilizada no processo." } };
    if (!this.name) { return { err: "É necessário nomear o processo." } };
    if (!this.time) { return { err: "É necessário o tempo do processo." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.save(obj, 'cms_wt_erp.product_seam');

    return db(query);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da matéria-prima é inválido." }; }

    let obj = lib.convertTo.object(this);
    let query = lib.Query.update(obj, 'cms_wt_erp.product_seam', 'id');

    return db(query);
  };
};

Seam.findById = async (id) => {
  let query = `SELECT * FROM cms_wt_erp.product_seam WHERE id='${id}';`;
  return db(query);
};

Seam.filter = (props, inners, params, strict_params, order_params) => {
  let query = new lib.Query().select().props(props).table("cms_wt_erp.product_seam product_seam")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
  return db(query);
};

Seam.delete = async (id) => {
  let query = `DELETE FROM cms_wt_erp.product_seam WHERE id='${id}';`;
  return db(query);
};

Seam.deleteByProductId = async (product_id) => {
  let query = `DELETE FROM cms_wt_erp.product_seam WHERE product_id='${product_id}';`;
  return db(query);
};

module.exports = Seam;