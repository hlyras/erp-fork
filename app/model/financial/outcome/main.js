const db = require('../../../../config/connection');
const lib = require("jarmlib");

const Outcome = function () {
  this.id;
  this.datetime;
  this.category_id;
  this.origin_id;
  this.income_category_id;
  this.description;
  this.value;
  this.status;
  this.user_id;

  this.payment_method;

  this.approval_date;
  this.approval_user_id;

  this.payment_date;
  this.payment_user_id;

  this.billet_bank;
  this.billet_receiver;
  this.billet_code;

  this.pix_receiver;
  this.pix_key;

  this.check_bank;
  this.check_receiver;
  this.check_number;

  this.transfer_receiver;
  this.transfer_register;
  this.transfer_bank;
  this.transfer_agency;
  this.transfer_account;
  this.transfer_account_type;

  this.create = () => {
    if (!this.datetime) { return { err: "Não foi possível identificar o momento do cadastro." }; }
    if (!this.payment_date) { return { err: "É necessário selecionar a data de pagamento." }; }
    if (!this.category_id) { return { err: "É necessário selecionar a categoria." }; }
    if (!this.origin_id) { return { err: "É necessário selecionar a origem." }; }
    if (!this.status) { return { err: "É necessário informar um status válido." }; }
    if (!this.value || this.value < 0.01) { return { err: "É necessário selecionar o valor da entrada." }; }
    if (this.status != "Pago" && this.payment_date < lib.date.timestamp.generate()) { return { err: "Data de pagamento inválida" } }
    if (this.status == "Pago" && !this.income_category_id) { return { err: "É necessário selecionar a instituição pagadora." } }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.financial_outcome');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do produto é inválido." }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.financial_outcome', 'id');

    return db(query, values);
  };
};

Outcome.findById = (outcome_id) => {
  let query = `SELECT * FROM cms_wt_erp.financial_outcome WHERE id = ?;`;
  return db(query, [outcome_id]);
};

Outcome.filter = ({ props, inners, lefts, period, params, strict_params, order_params, limit }) => {
  let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.financial_outcome outcome")
    .inners(inners).lefts(lefts).period(period).params(params).strictParams(strict_params).order(order_params).limit(limit).build();
  return db(query, values);
};

Outcome.delete = async (outcome_id) => {
  let query = `DELETE FROM cms_wt_erp.financial_outcome WHERE id = ?;`;
  return db(query, [outcome_id]);
};

module.exports = Outcome;