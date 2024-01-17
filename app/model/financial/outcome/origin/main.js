const db = require('../../../../../config/connection');
const lib = require("jarmlib");

const OutcomeOrigin = function () {
  this.id;
  this.category_id;
  this.name;

  this.create = () => {
    if (!this.category_id) { return { err: "É necessário informar a categoria." }; }
    if (!this.name) { return { err: "É necessário informar o nome da origem." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.financial_outcome_origin');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da origem é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.financial_outcome_origin', 'id');

    return db(query, values);
  };
};

OutcomeOrigin.findById = (origin_id) => {
  let query = `SELECT * FROM cms_wt_erp.financial_outcome_origin WHERE id = ? ORDER BY name ASC;`;
  return db(query, [origin_id]);
};

OutcomeOrigin.findByCategoryId = (category_id) => {
  let query = `SELECT * FROM cms_wt_erp.financial_outcome_origin WHERE category_id = ? ORDER BY name ASC;`;
  return db(query, [category_id]);
};

OutcomeOrigin.findByPass = async (pass) => {
  let query = `SELECT * FROM cms_wt_erp.financial_outcome_origin WHERE pass = ?;`;
  return db(query, [pass]);
};

OutcomeOrigin.list = () => {
  let query = `SELECT * FROM cms_wt_erp.financial_outcome_origin ORDER BY name ASC;`;
  return db(query);
};

OutcomeOrigin.filter = ({ props, inners, lefts, params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.financial_outcome_origin outcome_origin")
    .inners(inners).lefts(lefts).params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

OutcomeOrigin.delete = async id => {
  let query = `DELETE FROM cms_wt_erp.financial_outcome_origin WHERE id = ?;`;
  return db(query, [id]);
};

OutcomeOrigin.deleteByCategoryId = async id => {
  let query = `DELETE FROM cms_wt_erp.financial_outcome_origin WHERE category_id = ?;`;
  return db(query, [id]);
};

module.exports = OutcomeOrigin;