const router = require("express").Router();
const lib = require('jarmlib');

const departmentController = require('../controller/department');

// router.get('/', lib.route.toHttps, departmentController.list);
router.get('/id/:id', lib.route.toHttps, departmentController.findById);

router.get('/index', lib.route.toHttps, departmentController.index);
router.get('/manage', lib.route.toHttps, departmentController.manage);

//Department routes
router.post('/save', lib.route.toHttps, departmentController.save);
router.get('/list', lib.route.toHttps, departmentController.list);
router.delete('/remove', lib.route.toHttps, departmentController.remove);

//Department roles routes
router.get('/role/id/:id', lib.route.toHttps, departmentController.role.findById);

router.post('/role/save', lib.route.toHttps, departmentController.role.save);
router.get('/role/list', lib.route.toHttps, departmentController.role.list);
router.delete('/role/remove', lib.route.toHttps, departmentController.role.remove);

module.exports = router;