const router = require("express").Router();
const lib = require('../../config/lib');

const departmentController = require('../controller/department');

// router.get('/', lib.routeToHttps, departmentController.list);
router.get('/id/:id', lib.routeToHttps, departmentController.findById);

router.get('/index', lib.routeToHttps, departmentController.index);
router.get('/manage', lib.routeToHttps, departmentController.manage);

//Department routes
router.post('/save', lib.routeToHttps, departmentController.save);
router.get('/list', lib.routeToHttps, departmentController.list);
router.delete('/remove', lib.routeToHttps, departmentController.remove);

//Department roles routes
router.get('/role/id/:id', lib.routeToHttps, departmentController.role.findById);

router.post('/role/save', lib.routeToHttps, departmentController.role.save);
router.get('/role/list', lib.routeToHttps, departmentController.role.list);
router.delete('/role/remove', lib.routeToHttps, departmentController.role.remove);

module.exports = router;