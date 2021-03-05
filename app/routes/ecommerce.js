const router = require("express").Router();

const saleController = require('../controller/ecommerce/sale');

router.get('/sale', saleController.index);
router.get('/sale/gathering', saleController.gathering);
router.get('/sale/triage', saleController.triage);
router.get('/sale/manage', saleController.manage);

router.post('/sale/save', saleController.save);
router.get('/sale/id/:id', saleController.findById);
router.post('/sale/update', saleController.update);
router.post('/sale/changeStatus', saleController.changeStatus);
router.post('/sale/filter', saleController.filter);

router.post('/sale/service-order/save', saleController.service_order.save);

module.exports = router;