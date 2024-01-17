const db = require('../../../../config/connection');
const lib = require("jarmlib");

const IncomeOrigin = function () {
  this.id;
  this.category_id;
  this.name;

  this.create = () => {
    if (!this.category_id) { return { err: "O Id da categoria é inválido." }; };
    if (!this.name) { return { err: "É necessário informar o nome da categoria." }; };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.financial_income_origin');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da origem é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.financial_income_origin', 'id');

    return db(query, values);
  };
};

IncomeOrigin.filter = (props, inners, lefts, params, strict_params, order_params) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.financial_income_origin income_origin")
    .inners(inners).lefts(lefts).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

IncomeOrigin.findById = origin_id => {
  let query = `SELECT * FROM cms_wt_erp.financial_income_origin WHERE id = ?;`;
  return db(query, [origin_id]);
};

IncomeOrigin.list = () => {
  let query = "SELECT * FROM cms_wt_erp.financial_income_origin ORDER BY name ASC;";
  return db(query);
};

IncomeOrigin.delete = async id => {
  let query = `DELETE FROM cms_wt_erp.financial_income_origin WHERE id= ?;`;
  return db(query, id);
};

IncomeOrigin.deleteByCategoryId = async id => {
  let query = `DELETE FROM cms_wt_erp.financial_income_origin WHERE category_id= ?;`;
  return db(query, [id]);
};

module.exports = IncomeOrigin;