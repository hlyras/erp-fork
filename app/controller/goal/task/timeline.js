const userController = require('./../../user/main');
const GoalTaskTimeline = require('../../../model/goal/task/timeline');

const lib = require("jarmlib");

const taskTimelineController = {};

taskTimelineController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', "com-ass", 'com-sel', 'adm-aud'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const task_timeline = new GoalTaskTimeline();
  task_timeline.task_id = req.body.task_id;
  task_timeline.datetime = lib.date.timestamp.generate();
  task_timeline.description = req.body.description;
  task_timeline.user_id = req.user.id;

  try {
    let create_response = await task_timeline.create();
    if (create_response.err) { return res.send({ msg: create_response.err }); }

    res.send({ done: "Ação cadastrada." });
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o e-mail, favor contate o suporte!" });
  };
};

taskTimelineController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para acessar!" });
  };

  let props = [
    "task_timeline.*",
    "user.name user_name",
  ];

  let inners = [
    ["cms_wt_erp.user", "task_timeline.user_id", "user.id"],
  ];

  let lefts = [];

  let period = { key: "task_timeline.date", start: req.body.period_start, end: req.body.period_end };
  let strict_params = { keys: [], values: [] }

  lib.Query.fillParam("task_timeline.id", req.body.id, strict_params);
  lib.Query.fillParam("task_timeline.task_id", req.body.task_id, strict_params);
  lib.Query.fillParam("task_timeline.user_id", req.body.user_id, strict_params);

  let order_params = [["task_timeline.datetime", "DESC"]];

  try {
    const task_timelines = await GoalTaskTimeline.filter({ props, inners, lefts, period, strict_params, order_params });
    res.send({ task_timelines });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

module.exports = taskTimelineController;