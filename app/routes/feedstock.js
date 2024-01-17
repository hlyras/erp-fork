const router = require("express").Router();
const lib = require('jarmlib');

const feedstockController = require('../controller/feedstock/main');
const supplierController = require('../controller/feedstock/supplier/main');
const supplierStorageController = require('../controller/feedstock/supplier/storage');
const Purchase = require('../controller/feedstock/purchase/main');
Purchase.feedstock = require('../controller/feedstock/purchase/feedstock');
Purchase.order = require('../controller/feedstock/purchase/order');

router.get('/manage', lib.route.toHttps, feedstockController.manage);

router.post('/create', lib.route.toHttps, feedstockController.create);
router.post('/filter', lib.route.toHttps, feedstockController.filter);
router.delete('/delete/:id', lib.route.toHttps, feedstockController.delete);

router.get('/supplier/manage', lib.route.toHttps, supplierController.manage);
router.post('/supplier/create', lib.route.toHttps, supplierController.create);
router.post('/supplier/filter', lib.route.toHttps, supplierController.filter);
router.delete('/supplier/delete/:id', lib.route.toHttps, supplierController.delete);

router.get('/supplier/storage/id/:id', lib.route.toHttps, supplierStorageController.open);
router.post('/supplier/storage/create', lib.route.toHttps, supplierStorageController.create);
router.post('/supplier/storage/update', lib.route.toHttps, supplierStorageController.update);
router.post('/supplier/storage/filter', lib.route.toHttps, supplierStorageController.filter);
router.delete('/supplier/storage/delete/:id', lib.route.toHttps, supplierStorageController.delete);

router.get('/purchase', lib.route.toHttps, Purchase.index);
router.get('/purchase/manage', lib.route.toHttps, Purchase.manage);
router.post('/purchase/create', lib.route.toHttps, Purchase.create);
router.put('/purchase/update', lib.route.toHttps, Purchase.update);
router.post('/purchase/filter', lib.route.toHttps, Purchase.filter);
router.delete('/purchase/delete/:id', lib.route.toHttps, Purchase.delete);
router.get('/purchase/checkout', lib.route.toHttps, Purchase.checkout.index);
router.post('/purchase/checkout', lib.route.toHttps, Purchase.checkout.confirm);

router.put('/purchase/feedstock/update', lib.route.toHttps, Purchase.feedstock.update);
router.post('/purchase/feedstock/filter', lib.route.toHttps, Purchase.feedstock.filter);

router.get('/purchase/order', lib.route.toHttps, Purchase.order.index);
router.post('/purchase/order/create', lib.route.toHttps, Purchase.order.create);
router.post('/purchase/order/update', lib.route.toHttps, Purchase.order.update);
router.post('/purchase/order/filter', lib.route.toHttps, Purchase.order.filter);
router.delete('/purchase/order/delete/:id', lib.route.toHttps, Purchase.order.delete);

router.get('/purchase/order', lib.route.toHttps, Purchase.order.index);
router.post('/purchase/order/confirm/', lib.route.toHttps, Purchase.order.confirm);
router.get('/purchase/order/request', lib.route.toHttps, Purchase.order.request);
router.get('/purchase/order/manage', lib.route.toHttps, Purchase.order.manage);
router.get('/purchase/order/supplier', lib.route.toHttps, Purchase.order.supplier);

module.exports = router;