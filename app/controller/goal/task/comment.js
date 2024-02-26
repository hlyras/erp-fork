const userController = require('./../../user/main');
const GoalTaskComment = require('../../../model/goal/task/comment');

const lib = require("jarmlib");

const taskCommentController = {};

taskCommentController.create = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', "com-ass", 'com-sel', 'adm-aud'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  const task_comment = new GoalTaskComment();
  task_comment.task_id = req.body.task_id;
  task_comment.datetime = lib.date.timestamp.generate();
  task_comment.description = req.body.description;
  task_comment.user_id = req.user.id;

  try {
    let create_response = await task_comment.create();
    if (create_response.err) { return res.send({ msg: create_response.err }); }

    res.send({ done: "Comentário cadastrado." });
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao cadastrar o e-mail, favor contate o suporte!" });
  };
};

taskCommentController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'fin-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para acessar!" });
  };

  let props = [
    "task_comment.*",
    "user.name user_name",
  ];

  let inners = [
    ["cms_wt_erp.user", "task_comment.user_id", "user.id"],
  ];

  let lefts = [];

  let period = { key: "task_comment.date", start: req.body.period_start, end: req.body.period_end };
  let strict_params = { keys: [], values: [] }

  lib.Query.fillParam("task_comment.id", req.body.id, strict_params);
  lib.Query.fillParam("task_comment.task_id", req.body.task_id, strict_params);
  lib.Query.fillParam("task_comment.user_id", req.body.user_id, strict_params);

  let order_params = [["task_comment.datetime", "DESC"]];

  try {
    const task_comments = await GoalTaskComment.filter({ props, inners, lefts, period, strict_params, order_params });
    res.send({ task_comments });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

module.exports = taskCommentController;