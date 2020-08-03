const router = require("express").Router();

const departmentController = require('../controller/department');

// router.get('/', departmentController.list);
// router.get('/id/:id', departmentController.list);

router.get('/index', departmentController.index);
router.get('/manage', departmentController.manage);

router.post('/save', departmentController.save);

router.post('/role/save', departmentController.role.save);

module.exports = router;