const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Income = function () {
  this.id;
  this.datetime;
  this.date;
  this.category_id;
  this.origin_id;
  this.value;
  this.description;
  this.user_id;

  this.create = () => {
    if (!this.date) { return { err: "É necessário selecionar a data." }; };
    if (!this.category_id) { return { err: "É necessário selecionar a categoria." }; };
    if (!this.origin_id) { return { err: "É necessário selecionar a origem." }; };
    if (!this.value) { return { err: "É necessário selecionar o valor da entrada." }; };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.financial_income');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do produto é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.financial_income', 'id');

    return db(query, values);
  };
};

Income.findById = (income_id) => {
  let query = `SELECT * FROM cms_wt_erp.financial_income WHERE id = ?;`;
  return db(query, [income_id]);
};

Income.filter = (props, inners, lefts, period, params, strict_params, order_params) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.financial_income income")
    .inners(inners).lefts(lefts).period(period).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

Income.list = () => {
  let query = "SELECT * FROM cms_wt_erp.financial_income;";
  return db(query);
};

Income.delete = async (income_id) => {
  let query = "DELETE FROM cms_wt_erp.financial_income WHERE id='" + income_id + "';";
  return db(query);
};

module.exports = Income;