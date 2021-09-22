const router = require("express").Router();
const lib = require('jarmlib');

const saleController = require('../controller/ecommerce/sale');

router.get('/sale', lib.route.toHttps, saleController.index);
router.get('/sale/gathering', lib.route.toHttps, saleController.gathering);
router.get('/sale/triage', lib.route.toHttps, saleController.triage);
router.get('/sale/manage', lib.route.toHttps, saleController.manage);


router.post('/sale/save', lib.route.toHttps, saleController.save);
router.get('/sale/id/:id', lib.route.toHttps, saleController.findById);
router.post('/sale/update', lib.route.toHttps, saleController.update);
router.post('/sale/changeStatus', lib.route.toHttps, saleController.changeStatus);
router.post('/sale/filter', lib.route.toHttps, saleController.filter);

router.post('/sale/service-order/save', lib.route.toHttps, saleController.service_order.save);

router.get('/sale/after-sale', lib.route.toHttps, saleController.after_sale.index);
router.post('/sale/after-sale/save', lib.route.toHttps, saleController.after_sale.save);
router.post('/sale/after-sale/filter', lib.route.toHttps, saleController.after_sale.filter);

router.get('/sale/after-sale/flow', lib.route.toHttps, saleController.after_sale.flow.index);
router.post('/sale/after-sale/flow/add', lib.route.toHttps, saleController.after_sale.flow.add);
router.post('/sale/after-sale/flow/filter', lib.route.toHttps, saleController.after_sale.flow.filter);
router.post('/sale/after-sale/flow/update', lib.route.toHttps, saleController.after_sale.flow.update);

router.get('/sale/report', lib.route.toHttps, saleController.report.index);
router.get('/sale/report/product', lib.route.toHttps, saleController.report.product.index);
router.post("/sale/report/product/filter", lib.route.toHttps, saleController.report.product.filter);
router.get("/sale/report/packment", lib.route.toHttps, saleController.report.packment.index);
router.post("/sale/report/packment/filter", lib.route.toHttps, saleController.report.packment.filter);

module.exports = router;