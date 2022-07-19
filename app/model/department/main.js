const db = require('../../../config/connection');
const lib = require("jarmlib");

const Department = class Department {
  constructor() {
    this.id = 0;
    this.name = "";
    this.code = "";
  }

  filter () {

  }

  static filter (props, inners, params, strict_params, order_params) {

  }
};

const Department = function(){

  this.save = () => {
    if(!this.name) { return { err: "É necessário incluir o nome do departamento" } };
    if(!this.code) { return { err: "É necessário incluir o código do departamento" } };

    let query = "INSERT INTO cms_wt_erp.department (name, code) values ('"
      +this.name+"', '"
      +this.code+"')";
    return db(query);
  };
};

Department.filter = (props, inners, params, strict_params, order_params) => {
  let query = new Lib.Query().select().props(props).table("cms_wt_erp.department department")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
  return db(query);
};

module.exports = Department;