const router = require("express").Router();
const lib = require('../../config/lib');

const adminController = require('../controller/admin');
const userController = require('../controller/user');
const productController = require('../controller/product');

router.get("/", lib.routeToHttps, adminController.index);

router.get("/product", lib.routeToHttps, adminController.product);

router.get("/sale", lib.routeToHttps, adminController.sale.index);
router.post("/sale/filter", lib.routeToHttps, adminController.sale.filter);
router.get("/sale/report/product", lib.routeToHttps, adminController.sale.report.product);
router.get("/sale/report/package", lib.routeToHttps, adminController.sale.report.package);

router.get("/ecommerce_sale", lib.routeToHttps, adminController.ecommerce_sale.index);
router.post("/ecommerce_sale/filter", lib.routeToHttps, adminController.ecommerce_sale.filter);
// router.get("/sale/report/product", lib.routeToHttps, adminController.sale.report.product);
// router.get("/sale/report/package", lib.routeToHttps, adminController.sale.report.package);

router.get("/user", adminController.user);

module.exports = router;