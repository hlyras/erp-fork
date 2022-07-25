const db = require('../../../config/connection');
const lib = require("jarmlib");

class Department {
  constructor() {
    this.id = 0;
    this.name = "";
    this.code = "";
  }

  save () {
    if(!this.name) { return { err: "É necessário incluir o nome do departamento" } };
    if(!this.code) { return { err: "É necessário incluir a sigla do departamento" } };

    let query = "INSERT INTO cms_wt_erp.department (name, code) values ('"
      +this.name+"', '"
      +this.code+"')";
    return db(query);
  }

  static getById(id) {
    let query = `SELECT * FROM cms_wt_erp.department WHERE id="${id}";`;
    return db(query);
  };

  static getByName(name) {
    let query = `SELECT * FROM cms_wt_erp.department WHERE name like "%${name}%";`;
    return db(query);
  };

  static getByCode(code) {
    let query = `SELECT * FROM cms_wt_erp.department WHERE code="${code}";`;
    return db(query);
  };

  static filter (props, inners, params, strict_params, order_params) {
    let query = new lib.Query().select().props(props).table("cms_wt_erp.department department")
      .inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
    return db(query);
  }
};

module.exports = Department;