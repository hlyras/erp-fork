const router = require("express").Router();
const lib = require('jarmlib');

const ecommerceController = require('../controller/ecommerce/main');
ecommerceController.sale = require('../controller/ecommerce/sale');

const reportController = {};
reportController.product = require('../controller/ecommerce/report/product');
reportController.gathering = require('../controller/ecommerce/report/gathering');
reportController.packment = require('../controller/ecommerce/report/packment');

router.get('/triage', lib.route.toHttps, ecommerceController.triage);
router.get('/triage/packment', lib.route.toHttps, ecommerceController.packment);
router.get('/triage/removal', lib.route.toHttps, ecommerceController.removal);

router.get('/sale', lib.route.toHttps, ecommerceController.index);
router.get('/sale/gathering', lib.route.toHttps, ecommerceController.gathering);
router.get('/sale/manage', lib.route.toHttps, ecommerceController.manage);
router.post('/sale/save', lib.route.toHttps, ecommerceController.sale.save);
router.get('/sale/id/:id', lib.route.toHttps, ecommerceController.sale.findById);
router.get('/sale/tracker/:tracker', lib.route.toHttps, ecommerceController.sale.findByTracker);
router.post('/sale/update', lib.route.toHttps, ecommerceController.sale.update);
router.post('/sale/changeStatus', lib.route.toHttps, ecommerceController.sale.changeStatus);
router.post('/sale/filter', lib.route.toHttps, ecommerceController.sale.filter);

router.get('/report', lib.route.toHttps, ecommerceController.report);
router.get('/report/product', lib.route.toHttps, reportController.product.index);
router.post('/report/product/filter', lib.route.toHttps, reportController.product.filter);

router.get("/report/gathering", lib.route.toHttps, reportController.gathering.index);
router.post("/report/gathering/filter", lib.route.toHttps, reportController.gathering.filter);

router.get("/report/packment", lib.route.toHttps, reportController.packment.index);
router.post("/report/packment/filter", lib.route.toHttps, reportController.packment.filter);

// router.post('/sale/service-order/save', lib.route.toHttps, saleController.service_order.save);

// router.get('/sale/after-sale', lib.route.toHttps, saleController.after_sale.index);
// router.post('/sale/after-sale/save', lib.route.toHttps, saleController.after_sale.save);
// router.post('/sale/after-sale/filter', lib.route.toHttps, saleController.after_sale.filter);

// router.get('/sale/after-sale/flow', lib.route.toHttps, saleController.after_sale.flow.index);
// router.post('/sale/after-sale/flow/add', lib.route.toHttps, saleController.after_sale.flow.add);
// router.post('/sale/after-sale/flow/filter', lib.route.toHttps, saleController.after_sale.flow.filter);
// router.post('/sale/after-sale/flow/update', lib.route.toHttps, saleController.after_sale.flow.update);

// router.post("/sale/report/product/filter", lib.route.toHttps, saleController.report.product.filter);
// router.get("/sale/report/packment", lib.route.toHttps, saleController.report.packment.index);
// router.post("/sale/report/packment/filter", lib.route.toHttps, saleController.report.packment.filter);
// router.get("/sale/report/gathering", lib.route.toHttps, saleController.report.gathering.index);
// router.post("/sale/report/gathering/filter", lib.route.toHttps, saleController.report.gathering.filter);

module.exports = router;