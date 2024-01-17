const db = require('../../../../config/connection');
const lib = require("jarmlib");

const OutcomeCategory = function () {
  this.id;
  this.name;

  this.create = () => {
    if (!this.name) { return { err: "É necessário informar o nome da categoria." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.financial_outcome_category');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da categoria é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.financial_outcome_category', 'id');

    return db(query, values);
  };
};

OutcomeCategory.findById = (category_id) => {
  let query = `SELECT * FROM cms_wt_erp.financial_outcome_category WHERE id = ? ORDER BY name ASC;`;
  return db(query, [category_id]);
};

OutcomeCategory.filter = ({ props, params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.financial_outcome_category outcome_category")
    .params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

OutcomeCategory.delete = async (id) => {
  let query = `DELETE FROM cms_wt_erp.financial_outcome_category WHERE id = ?;`;
  return db(query, [id]);
};

module.exports = OutcomeCategory;