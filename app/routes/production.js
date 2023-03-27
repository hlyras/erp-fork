const router = require("express").Router();
const lib = require('jarmlib');

const productionController = require('../controller/production/main');
productionController.preparation = require('../controller/production/preparation');
productionController.shipment = require('../controller/production/shipment');
productionController.product = require('../controller/production/product');

router.get('/', lib.route.toHttps, productionController.index);
router.get('/manage', lib.route.toHttps, productionController.manage);

router.post('/create', lib.route.toHttps, productionController.create);
router.post('/filter', lib.route.toHttps, productionController.filter);
router.get('/id/:id', lib.route.toHttps, productionController.findById);

router.get('/preparation', lib.route.toHttps, productionController.preparation.index);
router.get('/preparation/print/:id', lib.route.toHttps, productionController.preparation.print);
router.post('/preparation/confirm', lib.route.toHttps, productionController.preparation.confirm);

router.get('/shipment', lib.route.toHttps, productionController.shipment.index);
router.post('/shipment/create', lib.route.toHttps, productionController.shipment.create);
router.get('/shipment/id/:id', lib.route.toHttps, productionController.shipment.findById);
router.post('/shipment/filter', lib.route.toHttps, productionController.shipment.filter);
router.get('/shipment/collect', lib.route.toHttps, productionController.shipment.collect.index);
router.get('/shipment/collect/confirm/:id', lib.route.toHttps, productionController.shipment.collect.confirm);

router.post('/product/filter', lib.route.toHttps, productionController.product.filter);

module.exports = router;