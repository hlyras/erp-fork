const db = require('../../../../config/connection');
const lib = require("jarmlib");

class GoalTaskTimeline {
  constructor() {
    this.id;
    this.task_id;
    this.datetime;
    this.description;
    this.user_id;
  };

  create() {
    if (!this.task_id) { return { err: "Não foi possível identificar a tarefa." } };
    if (!this.datetime) { return { err: "É necessário registrar o horário da ação." } };
    if (!this.description) { return { err: "É necessário informar a descrição do objetivo." } };
    if (!this.user_id) { return { err: "É necessário registrar o usuário." } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.goal_task_timeline');

    return db(query, values);
  };

  update() {
    if (!this.id) { return { err: "O id do modelo é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.goal_task_timeline', 'id');

    return db(query, values);
  };

  static getById(id) {
    let query = `SELECT * FROM cms_wt_erp.goal_task_timeline WHERE id = ?;`;
    return db(query, [id]);
  };

  static getByName(name) {
    let query = `SELECT * FROM cms_wt_erp.goal_task_timeline WHERE name like ?;`;
    return db(query, [`%${name}%`]);
  };

  static getByCode(code) {
    let query = `SELECT * FROM cms_wt_erp.goal_task_timeline WHERE code = ?;`;
    return db(query, [code]);
  };

  static filter(options) {
    let { query, values } = new lib.Query().select().props(options.props).table("cms_wt_erp.goal_task_timeline task_timeline")
      .inners(options.inners)
      .lefts(options.lefts)
      .params(options.params)
      .strictParams(options.strict_params)
      .inParams(options.strict_params)
      .order(options.order_params)
      .build();
    return db(query, values);
  };
};

module.exports = GoalTaskTimeline;