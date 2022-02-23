const router = require("express").Router();
const lib = require('jarmlib');

const departmentController = require('../controller/department/main');

// Department routes
router.get('/', lib.route.toHttps, departmentController.index);
router.post('/save', lib.route.toHttps, departmentController.save);
router.post('/filter', lib.route.toHttps, departmentController.filter);

module.exports = router;