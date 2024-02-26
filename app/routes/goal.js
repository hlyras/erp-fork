const router = require("express").Router();
const lib = require('jarmlib');

const Goal = require('../controller/goal/main');
const GoalTask = require('../controller/goal/task/main');
const GoalTaskTimeline = require('../controller/goal/task/timeline');
const GoalTaskComment = require('../controller/goal/task/comment');

router.get("/", lib.route.toHttps, Goal.index);
router.get("/manage", lib.route.toHttps, Goal.manage);
router.post("/create", lib.route.toHttps, Goal.create);
router.post("/filter", lib.route.toHttps, Goal.filter);

router.get("/task", lib.route.toHttps, GoalTask.index);
router.post("/task/create", lib.route.toHttps, GoalTask.create);
router.put("/task/update", lib.route.toHttps, GoalTask.update);
router.post("/task/filter", lib.route.toHttps, GoalTask.filter);

router.post("/task/timeline/create", lib.route.toHttps, GoalTaskTimeline.create);
router.post("/task/timeline/filter", lib.route.toHttps, GoalTaskTimeline.filter);

router.post("/task/comment/create", lib.route.toHttps, GoalTaskComment.create);
router.post("/task/comment/filter", lib.route.toHttps, GoalTaskComment.filter);

module.exports = router;