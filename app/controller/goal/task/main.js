const userController = require('./../../user/main');
const GoalTask = require('../../../model/goal/task/main');

const lib = require("jarmlib");

const goalTaskController = {};

goalTaskController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'com-sel', 'com-ass'])) {
    return res.redirect('/');
  };

  res.render('goal/task/index', { user: req.user });
};

goalTaskController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', "com-ass", 'com-sel', 'adm-aud'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const goal_task = new GoalTask();
  goal_task.datetime = lib.date.timestamp.generate();
  goal_task.goal_id = req.body.goal_id;
  goal_task.description = req.body.description;
  goal_task.date = req.body.date;
  goal_task.user_id = req.body.user_id;
  goal_task.adm_user_id = req.user.id;
  goal_task.status = "Pendente";

  try {
    let create_response = await goal_task.create();
    if (create_response.err) { return res.send({ msg: create_response.err }); }

    res.send({ done: "Tarefa cadastrada." });
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o e-mail, favor contate o suporte!" });
  };
};

goalTaskController.update = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', "com-ass", 'com-sel', 'adm-aud'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const goal_task = new GoalTask();
  goal_task.id = req.body.id;
  goal_task.conf_user_id = req.user.id;
  goal_task.status = req.body.status;

  if (goal_task.status != "Ag. conferência" && req.user.access != "adm") {
    return res.send({ msg: "Você não tem permissão para atualizar a tarefa para esse status." });
  }

  try {
    let update_response = await goal_task.update();
    if (update_response.err) { return res.send({ msg: update_response.err }); }

    res.send({ done: "Tarefa atualizada." });
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o e-mail, favor contate o suporte!" });
  };
};

goalTaskController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para acessar!" });
  };

  let props = [
    "goal_task.*",
    "user.name user_name",
    "adm_user.name adm_user_name"
  ];

  let inners = [
    ["cms_wt_erp.user", "goal_task.user_id", "user.id"],
    ["cms_wt_erp.user adm_user", "goal_task.adm_user_id", "adm_user.id"]
  ];

  let lefts = [];

  let period = { key: "goal_task.date", start: req.body.period_start, end: req.body.period_end };
  let strict_params = { keys: [], values: [] }

  lib.Query.fillParam("goal_task.id", req.body.id, strict_params);
  lib.Query.fillParam("goal_task.goal_id", req.body.goal_id, strict_params);
  lib.Query.fillParam("goal_task.user_id", req.body.user_id, strict_params);
  lib.Query.fillParam("goal_task.status", req.body.status, strict_params);

  let order_params = [["goal_task.date", "DESC"]];

  try {
    const goal_tasks = await GoalTask.filter({ props, inners, lefts, period, strict_params, order_params });
    res.send({ goal_tasks });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

module.exports = goalTaskController;