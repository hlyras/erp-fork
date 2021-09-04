const router = require("express").Router();
const lib = require('jarmlib');

const saleController = require('../controller/sale');

//API ROUTES
router.get('/', lib.route.toHttps, saleController.index);
router.get('/manage', lib.route.toHttps, saleController.manage);
router.get('/triage', lib.route.toHttps, saleController.triage);
router.get('/financial', lib.route.toHttps, saleController.financial);

router.get('/id/:id', lib.route.toHttps, saleController.findById);
router.get('/confirm-payment/id/:id', lib.route.toHttps, saleController.confirmPayment);
router.get('/cancel/id/:id', lib.route.toHttps, saleController.cancel);
router.get('/confirm-packment/id/:id', lib.route.toHttps, saleController.confirmPackment);
router.post('/confirm-nf', lib.route.toHttps, saleController.confirmNF);
router.get('/confirm-shipment/id/:id', lib.route.toHttps, saleController.confirmShipment);

router.post('/save', lib.route.toHttps, saleController.save);
router.post('/filter', lib.route.toHttps, saleController.filter);

router.get('/report', lib.route.toHttps, saleController.report.index);
router.get('/report/product', lib.route.toHttps, saleController.report.product.index);
router.post("/report/product/filter", lib.route.toHttps, saleController.report.product.filter);
router.get('/report/packment', lib.route.toHttps, saleController.report.packment.index);
router.post("/report/packment/filter", lib.route.toHttps, saleController.report.packment.filter);

router.get('/flow', lib.route.toHttps, saleController.flow.index);

module.exports = router;