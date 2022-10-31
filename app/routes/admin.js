const router = require("express").Router();
const lib = require('jarmlib');

const adminController = require('../controller/admin');

router.get("/", lib.route.toHttps, adminController.index);
router.get("/user", lib.route.toHttps, adminController.user);

module.exports = router;