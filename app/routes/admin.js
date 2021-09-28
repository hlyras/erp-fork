const router = require("express").Router();
const lib = require('jarmlib');

const adminController = require('../controller/admin');
const userController = require('../controller/user');

router.get("/", lib.route.toHttps, adminController.index);

router.get("/user", adminController.user);

module.exports = router;