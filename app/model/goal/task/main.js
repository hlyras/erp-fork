const db = require('../../../../config/connection');
const lib = require("jarmlib");

class GoalTask {
  constructor() {
    this.id;
    this.datetime;
    this.goal_id;
    this.description;
    this.user_id;
    this.date;
    this.adm_user_id;
    this.status;
  };

  create() {
    if (!this.datetime) { return { err: "Não foi possível registrar o momento do cadastro." } };
    if (!this.goal_id) { return { err: "É necessário informar o objetivo da tarefa" } };
    if (!this.user_id) { return { err: "É necessário registrar um colaborador para executar a tarefa." } };
    if (!this.date) { return { err: "É necessário informar a data para finalizar a tarefa" } };
    if (!this.description) { return { err: "É necessário informar a descrição da tarefa" } };
    if (!this.adm_user_id) { return { err: "É necessário cadastrar o responsável pela tarefa" } };
    if (!this.status) { return { err: "É necessário registrar o status inicial" } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.goal_task');

    return db(query, values);
  };

  update() {
    if (!this.id) { return { err: "O id da tarefa é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.goal_task', 'id');

    return db(query, values);
  };

  static getById(id) {
    let query = `SELECT * FROM cms_wt_erp.goal_task WHERE id = ?;`;
    return db(query, [id]);
  };

  static getByName(name) {
    let query = `SELECT * FROM cms_wt_erp.goal_task WHERE name like ?;`;
    return db(query, [`%${name}%`]);
  };

  static getByCode(code) {
    let query = `SELECT * FROM cms_wt_erp.goal_task WHERE code = ?;`;
    return db(query, [code]);
  };

  static filter(options) {
    let { query, values } = new lib.Query().select().props(options.props).table("cms_wt_erp.goal_task")
      .inners(options.inners)
      .lefts(options.lefts)
      .params(options.params)
      .strictParams(options.strict_params)
      .inParams(options.in_params)
      .order(options.order_params)
      .build();
    return db(query, values);
  };
};

module.exports = GoalTask;