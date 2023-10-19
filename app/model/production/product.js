const db = require('../../../config/connection');
const lib = require("jarmlib");

const Product = function () {
  this.id;
  this.production_id;
  this.product_id;
  this.amount;
  this.status = "Ag. produção"; // 'Em produção', 'Finalizado'

  this.insert = () => {
    if (!this.production_id) { return { err: "É necessário registrar de qual produção pertence o produto." } };
    if (!this.product_id) { return { err: "É necessário registrar o produto." } };
    if (!this.amount) { return { err: "É necessário a quantidade de produtos." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.save(obj, 'cms_wt_erp.production_product');

    return db(query);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do produto é inválido." }; }
    if (!this.production_id) { return { err: "É necessário registrar de qual produção pertence o produto." } };
    if (!this.product_id) { return { err: "É necessário registrar o produto." } };
    if (!this.amount) { return { err: "É necessário a quantidade de produtos." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.update(obj, 'cms_wt_erp.production_product', 'id');

    return db(query);
  };
};

Product.filter = (props, inners, period, params, strict_params, order_params) => {
  let query = new lib.Query().select().props(props).table("cms_wt_erp.production_product")
    .inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).build().query;
  return db(query);
};

Product.remove = async (id) => {
  let query = `DELETE FROM cms_wt_erp.production_product WHERE id='${id}';`;
  return db(query);
};

Product.defect = function () {
  this.id;
  this.datetime;
  this.product_id;
  this.approved_datetime;
  this.approved_amount;
  this.approved_user_id;
  this.reproved_datetime;
  this.reproved_amount;
  this.reproved_user_id;
  this.user_id;

  this.insert = () => {
    if (!this.product_id) { return { err: "É necessário registrar o produto." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.save(obj, 'cms_wt_erp.production_product_defect');

    return db(query);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do produto é inválido." }; }

    let obj = lib.convertTo.object(this);
    let query = lib.Query.update(obj, 'cms_wt_erp.production_product_defect', 'id');

    return db(query);
  };
};

Product.filigran_defect = function () {
  this.id;
  this.datetime;
  this.product_id;
  this.approved_datetime;
  this.approved_amount;
  this.approved_user_id;
  this.reproved_datetime;
  this.reproved_amount;
  this.reproved_user_id;
  this.user_id;

  this.insert = () => {
    if (!this.product_id) { return { err: "É necessário registrar o produto." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.save(obj, 'cms_wt_erp.production_product_filigran_defect');

    return db(query);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do produto é inválido." }; }

    let obj = lib.convertTo.object(this);
    let query = lib.Query.update(obj, 'cms_wt_erp.production_product_filigran_defect', 'id');

    return db(query);
  };
};

module.exports = Product;