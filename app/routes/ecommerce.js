const router = require("express").Router();
const lib = require('../../config/lib');

const saleController = require('../controller/ecommerce/sale');

router.get('/sale', lib.routeToHttps, saleController.index);
router.get('/sale/gathering', lib.routeToHttps, saleController.gathering);
router.get('/sale/triage', lib.routeToHttps, saleController.triage);
router.get('/sale/manage', lib.routeToHttps, saleController.manage);


router.post('/sale/save', lib.routeToHttps, saleController.save);
router.get('/sale/id/:id', lib.routeToHttps, saleController.findById);
router.post('/sale/update', lib.routeToHttps, saleController.update);
router.post('/sale/changeStatus', lib.routeToHttps, saleController.changeStatus);
router.post('/sale/filter', lib.routeToHttps, saleController.filter);

router.post('/sale/service-order/save', lib.routeToHttps, saleController.service_order.save);

router.get('/sale/after-sale', lib.routeToHttps, saleController.after_sale.index);
router.post('/sale/after-sale/save', lib.routeToHttps, saleController.after_sale.save);
router.post('/sale/after-sale/filter', lib.routeToHttps, saleController.after_sale.filter);

router.get('/sale/after-sale/flow', lib.routeToHttps, saleController.after_sale.flow.index);
router.post('/sale/after-sale/flow/add', lib.routeToHttps, saleController.after_sale.flow.add);
router.post('/sale/after-sale/flow/filter', lib.routeToHttps, saleController.after_sale.flow.filter);
router.post('/sale/after-sale/flow/update', lib.routeToHttps, saleController.after_sale.flow.update);

module.exports = router;