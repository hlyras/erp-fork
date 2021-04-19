const router = require("express").Router();

const saleController = require('../controller/sale');

//API ROUTES
router.get('/', saleController.index);
router.get('/manage', saleController.manage);
router.get('/triage', saleController.triage);
router.get('/financial', saleController.financial);

router.get('/id/:id', saleController.findById);
router.get('/confirm-payment/id/:id', saleController.confirmPayment);
router.get('/cancel/id/:id', saleController.cancel);
router.get('/confirm-packment/id/:id', saleController.confirmPackment);
router.post('/confirm-nf', saleController.confirmNF);
router.get('/confirm-shipment/id/:id', saleController.confirmShipment);

router.post('/save', saleController.save);
router.post('/filter', saleController.filter);

module.exports = router;