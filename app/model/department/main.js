const db = require('../../../config/connection');
const lib = require("jarmlib");

class Department {
  constructor() {
    this.id;
    this.name;
    this.code;
  }

  save() {
    if (!this.name) { return { err: "É necessário incluir o nome do departamento" } };
    if (!this.code) { return { err: "É necessário incluir a sigla do departamento" } };

    if (this.cellphone.length > 13) { return { err: "Celular inválido." }; };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.customer_mail');

    return db(query, values);
  }

  static getById(id) {
    let query = `SELECT * FROM cms_wt_erp.department WHERE id = ?;`;
    return db(query, [id]);
  };

  static getByName(name) {
    let query = `SELECT * FROM cms_wt_erp.department WHERE name like ?;`;
    return db(query, [`%${name}%`]);
  };

  static getByCode(code) {
    let query = `SELECT * FROM cms_wt_erp.department WHERE code = ?;`;
    return db(query, [code]);
  };

  static filter(props, inners, params, strict_params, order_params) {
    let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.department department")
      .inners(inners).params(params).strictParams(strict_params).order(order_params).build();
    return db(query, values);
  }
};

module.exports = Department;