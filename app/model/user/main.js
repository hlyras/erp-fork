const db = require('../../../config/connection');
const lib = require("jarmlib");

const User = function () {
  this.id;
  this.name;
  this.username;
  this.phone;
  this.password;
  this.birth;
  this.department;
  this.role;
  this.access = '000-000' //no access;
  this.pass = null;

  this.create = () => {
    if (!this.name) { return { err: "É necessário informar o nome do colaborador." } };
    if (!this.username) { return { err: "É necessário informar um usuário para o colaborador." } };
    if (!this.password) { return { err: "Senha inválida." } };
    if (!this.access) { return { err: "É necessário informar o nível de acesso do colaborador." } };
    if (!this.pass) { return { err: "É necessário informar um 'Passe' de 4 dígitos para o colaborador." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.save(obj, 'cms_wt_erp.user');

    return db(query);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da produção é inválido." }; }

    let obj = lib.convertTo.object(this);
    let query = lib.Query.update(obj, 'cms_wt_erp.user', 'id');

    return db(query);
  };
};

User.findById = async (id) => {
  let query = `SELECT * FROM cms_wt_erp.user WHERE id='${id}';`;
  return db(query);
};

User.findByUsername = async (username) => {
  let query = `SELECT * FROM cms_wt_erp.user WHERE username='${username}';`;
  return db(query);
};

User.filter = (props, inners, period, params, strict_params, order_params, limit) => {
  let query = new lib.Query().select().props(props).table("cms_wt_erp.user user")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
  return db(query);
};

User.findByPass = async (pass) => {
  let query = `SELECT * FROM cms_wt_erp.user WHERE pass='${pass}';`;
  return db(query);
};

module.exports = User;