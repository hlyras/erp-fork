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

router.get('/sale/after-sale', saleController.after_sale.index);
router.post('/sale/after-sale/save', saleController.after_sale.save);
router.post('/sale/after-sale/filter', saleController.after_sale.filter);

router.get('/sale/after-sale/flow', saleController.after_sale.flow.index);
router.post('/sale/after-sale/flow/add', saleController.after_sale.flow.add);
router.post('/sale/after-sale/flow/filter', saleController.after_sale.flow.filter);
router.post('/sale/after-sale/flow/update', saleController.after_sale.flow.update);

module.exports = router;