const db = require('../../../../../config/connection');
const lib = require("jarmlib");

const OutcomeOriginPayment = function () {
  this.id;
  this.origin_id;
  this.method;
  this.pix_receiver;
  this.pix_key;
  this.transfer_receiver;
  this.transfer_register;
  this.transfer_bank;
  this.transfer_agency;
  this.transfer_account;
  this.transfer_account_type;
  this.user_id;

  this.create = () => {
    if (!this.origin_id) { return { err: "É necessário informar a origem." }; }
    if (!this.method) { return { err: "É necessário informar o método de pagamento." }; }
    if (!this.user_id) { return { err: "É necessário registrar seu usuário." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.financial_outcome_origin_payment');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da origem é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.financial_outcome_origin_payment', 'id');

    return db(query, values);
  };
};

OutcomeOriginPayment.filter = ({ params, strict_params, order_params }) => {
  let { query, values } = new lib.Query().select().table("cms_wt_erp.financial_outcome_origin_payment outcome_origin_payment")
    .params(params).strictParams(strict_params).order(order_params).build();
  return db(query, values);
};

OutcomeOriginPayment.findById = (payment_id) => {
  let query = `SELECT * FROM cms_wt_erp.financial_outcome_origin_payment WHERE id = ?;`;
  return db(query, [payment_id]);
};

OutcomeOriginPayment.delete = async id => {
  let query = `DELETE FROM cms_wt_erp.financial_outcome_origin_payment WHERE id = ?;`;
  return db(query, [id]);
};

OutcomeOriginPayment.deleteByOriginId = async origin_id => {
  let query = `DELETE FROM cms_wt_erp.financial_outcome_origin_payment WHERE origin_id = ?;`;
  return db(query, [origin_id]);
};

module.exports = OutcomeOriginPayment;