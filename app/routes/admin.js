const router = require("express").Router();

const adminController = require('../controller/admin');
const userController = require('../controller/user');
const productController = require('../controller/product');

router.get("/", adminController.index);

router.get("/product", adminController.product);

router.get("/user", adminController.user);
router.get('/user/department', adminController.userDepartment);

module.exports = router;