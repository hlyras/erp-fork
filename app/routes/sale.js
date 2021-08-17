const router = require("express").Router();
const lib = require('../../config/lib');

const saleController = require('../controller/sale');

//API ROUTES
router.get('/', lib.routeToHttps, saleController.index);
router.get('/manage', lib.routeToHttps, saleController.manage);
router.get('/triage', lib.routeToHttps, saleController.triage);
router.get('/financial', lib.routeToHttps, saleController.financial);

router.get('/id/:id', lib.routeToHttps, saleController.findById);
router.get('/confirm-payment/id/:id', lib.routeToHttps, saleController.confirmPayment);
router.get('/cancel/id/:id', lib.routeToHttps, saleController.cancel);
router.get('/confirm-packment/id/:id', lib.routeToHttps, saleController.confirmPackment);
router.post('/confirm-nf', lib.routeToHttps, saleController.confirmNF);
router.get('/confirm-shipment/id/:id', lib.routeToHttps, saleController.confirmShipment);

router.post('/save', lib.routeToHttps, saleController.save);
router.post('/filter', lib.routeToHttps, saleController.filter);

router.get('/report', lib.routeToHttps, saleController.report.index);
router.get('/report/product', lib.routeToHttps, saleController.report.product.index);
router.post("/report/product/filter", lib.routeToHttps, saleController.report.product.filter);
router.get('/report/packment', lib.routeToHttps, saleController.report.packment.index);
router.post("/report/packment/filter", lib.routeToHttps, saleController.report.packment.filter);

module.exports = router;