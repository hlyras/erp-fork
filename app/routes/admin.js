const router = require("express").Router();
const lib = require('../../config/lib');

const adminController = require('../controller/admin');
const userController = require('../controller/user');
const productController = require('../controller/product');

router.get("/", lib.routeToHttps, adminController.index);

router.get("/product", lib.routeToHttps, adminController.product);

router.get("/user", adminController.user);

module.exports = router;