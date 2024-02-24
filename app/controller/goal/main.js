const userController = require('./../user/main');
const Goal = require('../../model/goal/main');
const Department = require('../../model/department/main');

const lib = require("jarmlib");

const goalController = {};

goalController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass'])) {
    return res.redirect('/');
  };

  let departments = await Department.filter({});

  res.render('goal/index', { user: req.user, departments });
};

goalController.manage = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass'])) {
    return res.redirect('/');
  };

  let departments = await Department.filter({});

  res.render('goal/manage/index', { user: req.user, departments });
};

goalController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', "com-ass", 'com-sel', 'adm-aud'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const goal = new Goal();
  goal.department_id = req.body.department_id;
  goal.datetime = lib.date.timestamp.generate();
  goal.category = req.body.category;
  goal.description = req.body.description;
  goal.date = req.body.date;
  goal.user_id = req.user.id;

  try {
    let create_response = await goal.create();
    if (create_response.err) { return res.send({ msg: create_response.err }); }

    res.send({ done: "Objetivo cadastrado." });
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o e-mail, favor contate o suporte!" });
  };
};


goalController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para acessar!" });
  };

  let props = [
    "goal.*",
    "user.name user_name",
    "department.name department_name"
  ];

  let inners = [
    ["cms_wt_erp.user", "goal.user_id", "user.id"],
    ["cms_wt_erp.department", "goal.department_id", "department.id"]
  ];

  let lefts = [];

  let period = { key: "goal.date", start: req.body.period_start, end: req.body.period_end };
  let strict_params = { keys: [], values: [] }

  lib.Query.fillParam("goal.id", req.body.id, strict_params);
  lib.Query.fillParam("goal.category", req.body.category, strict_params);
  lib.Query.fillParam("goal.department_id", req.body.department_id, strict_params);
  lib.Query.fillParam("goal.status", req.body.status, strict_params);

  let order_params = [["goal.date", "DESC"]];

  try {
    const goals = await Goal.filter({ props, inners, lefts, period, strict_params, order_params });
    res.send({ goals });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

module.exports = goalController;