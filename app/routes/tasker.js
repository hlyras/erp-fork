const router = require("express").Router();
const lib = require("jarmlib");

const taskerController = require("../controller/tasker/main");

router.get("/", lib.route.toHttps, taskerController.index);
router.get("/manage", lib.route.toHttps, taskerController.manage);

module.exports = router;