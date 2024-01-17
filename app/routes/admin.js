const router = require("express").Router();
const lib = require('jarmlib');

const Admin = require('../controller/admin');
const Production = require('../controller/admin/production/main');
const Financial = require('../controller/admin/financial');

router.get("/", lib.route.toHttps, Admin.index);

router.get("/user", lib.route.toHttps, Admin.user);
router.get("/production", lib.route.toHttps, Production.index);

router.get("/financial", lib.route.toHttps, Financial.index);
router.get("/financial/income", lib.route.toHttps, Financial.income);
router.get("/financial/outcome", lib.route.toHttps, Financial.outcome);

module.exports = router;