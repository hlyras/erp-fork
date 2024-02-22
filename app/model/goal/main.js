const db = require('../../../config/connection');
const lib = require("jarmlib");

class Goal {
  constructor() {
    this.id
    this.datetime
    this.department_id
    this.category
    this.name
    this.date
    this.user_id
  }

  create() {
    if (!this.department_id) { return { err: "É necessário incluir o nome do departamento" } };
    if (!this.category) { return { err: "É necessário incluir a sigla do departamento" } };
    if (!this.name) { return { err: "É necessário incluir a sigla do departamento" } };
    if (!this.date) { return { err: "É necessário incluir a sigla do departamento" } };
    if (!this.user_id) { return { err: "É necessário incluir a sigla do departamento" } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.goal');

    return db(query, values);
  }

  update() {
    if (!this.id) { return { err: "O id do modelo é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'cms_wt_erp.goal', 'id');

    return db(query, values);
  };

  static getById(id) {
    let query = `SELECT * FROM cms_wt_erp.goal WHERE id = ?;`;
    return db(query, [id]);
  };

  static getByName(name) {
    let query = `SELECT * FROM cms_wt_erp.goal WHERE name like ?;`;
    return db(query, [`%${name}%`]);
  };

  static getByCode(code) {
    let query = `SELECT * FROM cms_wt_erp.goal WHERE code = ?;`;
    return db(query, [code]);
  };

  static filter({ props, inners, params, strict_params, order_params }) {
    let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.goal")
      .inners(inners).params(params).strictParams(strict_params).order(order_params).build();
    return db(query, values);
  };
};

module.exports = Goal;