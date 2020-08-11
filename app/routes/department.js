const router = require("express").Router();

const departmentController = require('../controller/department');

// router.get('/', departmentController.list);
router.get('/id/:id', departmentController.findById);

router.get('/index', departmentController.index);
router.get('/manage', departmentController.manage);

//Department routes
router.post('/save', departmentController.save);
router.get('/list', departmentController.list);
router.delete('/remove', departmentController.remove);

//Department roles routes
router.post('/role/save', departmentController.role.save);

module.exports = router;