const router = require("express").Router();
const lib = require('jarmlib');

const productionController = require('../controller/production/main');
productionController.preparation = require('../controller/production/preparation');
productionController.shipment = require('../controller/production/shipment');
productionController.product = require('../controller/production/product');
productionController.receipt = require('../controller/production/receipt/main');
productionController.receipt.count = require('../controller/production/receipt/count');
productionController.receipt.conference = require('../controller/production/receipt/conference');
productionController.receipt.product = require('../controller/production/receipt/product');

router.get('/', lib.route.toHttps, productionController.index);
router.get('/manage', lib.route.toHttps, productionController.manage);

router.post('/create', lib.route.toHttps, productionController.create);
router.post('/confirm', lib.route.toHttps, productionController.confirm);
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

router.get('/receipt', lib.route.toHttps, productionController.receipt.index);
router.get('/receipt/manage', lib.route.toHttps, productionController.receipt.manage);
router.get('/receipt/count', lib.route.toHttps, productionController.receipt.count.index);
router.post('/receipt/count/confirm', lib.route.toHttps, productionController.receipt.count.confirm);
router.get('/receipt/conference', lib.route.toHttps, productionController.receipt.conference.index);
router.post('/receipt/conference/approved', lib.route.toHttps, productionController.receipt.conference.approved);
router.post('/receipt/conference/reproved', lib.route.toHttps, productionController.receipt.conference.reproved);
router.post('/receipt/conference/filigran_reproved', lib.route.toHttps, productionController.receipt.conference.filigran_reproved);
router.get('/receipt/storage', lib.route.toHttps, productionController.receipt.storage);
router.get('/receipt/collect', lib.route.toHttps, productionController.receipt.collect);
router.get('/receipt/id/:id', lib.route.toHttps, productionController.receipt.findById);
router.post('/receipt/create', lib.route.toHttps, productionController.receipt.create);
router.post('/receipt/filter', lib.route.toHttps, productionController.receipt.filter);

router.post('/receipt/product/create', lib.route.toHttps, productionController.receipt.product.create);

module.exports = router;