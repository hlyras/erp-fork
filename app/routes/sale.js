const router = require("express").Router();

const saleController = require('../controller/sale');

//API ROUTES
router.get('/', saleController.index);
router.get('/manage', saleController.manage);
router.get('/triage', saleController.triage);
router.get('/admin', saleController.admin);

router.get('/id/:id', saleController.findById);
router.get('/confirm-payment/id/:id', saleController.confirmPayment);
router.get('/confirm-packment/id/:id', saleController.confirmPackment);

router.post('/save', saleController.save);
router.post('/filter', saleController.filter);

module.exports = router;