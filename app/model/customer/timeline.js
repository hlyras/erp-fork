const db = require('../../../config/connection');
const lib = require("jarmlib");

const Timeline = function () {
  this.id;
  this.datetime;
  this.user_id;
  this.customer_id;
  this.category;
  this.content;
  this.meeting_datetime;
  this.status;

  this.create = () => {
    if (!this.datetime) { return { err: "Não foi possível registrar a data do cadastro" }; };
    if (!this.customer_id) { return { err: "É necessário informar o cliente" }; };
    if (!this.category) { return { err: "É necessário registrar a categoria da movimentação" }; };
    if (!this.content) { return { err: "É necessário informar o conteúdo do contato." }; };
    if (!this.user_id) { return { err: "Nenhum usuário foi identificado." }; };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.customer_timeline');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da atividade é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.customer_timeline', 'id');

    return db(query, values);
  };
};

Timeline.filter = (options) => {
  let { query, values } = new lib.Query().select()
    .props(options.props)
    .table("cms_wt_erp.customer_timeline timeline")
    .inners(options.inners)
    .lefts(options.lefts)
    .period(options.period)
    .params(options.params)
    .strictParams(options.strict_params)
    .order(options.order_params)
    .build();
  return db(query, values);
};

module.exports = Timeline;