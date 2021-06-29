const router = require("express").Router();

const adminController = require('../controller/admin');
const userController = require('../controller/user');
const productController = require('../controller/product');

router.get("/", adminController.index);

router.get("/product", adminController.product);

router.get("/sale", adminController.sale.index);
router.post("/sale/filter", adminController.sale.filter);
router.get("/sale/report/product", adminController.sale.report.product);
router.get("/sale/report/package", adminController.sale.report.package);

router.get("/ecommerce_sale", adminController.ecommerce_sale.index);
router.post("/ecommerce_sale/filter", adminController.ecommerce_sale.filter);
// router.get("/sale/report/product", adminController.sale.report.product);
// router.get("/sale/report/package", adminController.sale.report.package);

router.get("/user", adminController.user);

module.exports = router;