const router = require("express").Router();
const lib = require('jarmlib');

const adminController = require('../controller/admin');
const userController = require('../controller/user');
const productController = require('../controller/product');

router.get("/", lib.route.toHttps, adminController.index);

router.get("/product", lib.route.toHttps, adminController.product);

router.get("/user", adminController.user);

module.exports = router;