const router = require("express").Router();
const lib = require('jarmlib');

const Goal = require('../controller/goal/main');

router.get("/", lib.route.toHttps, Goal.index);
router.get("/manage", lib.route.toHttps, Goal.manage);
router.post("/create", lib.route.toHttps, Goal.create);
router.post("/filter", lib.route.toHttps, Goal.filter);

module.exports = router;