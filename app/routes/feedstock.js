const router = require("express").Router();
const lib = require('jarmlib');

const feedstockController = require('../controller/feedstock/main');
const supplierController = require('../controller/feedstock/supplier/main');
const supplierStorageController = require('../controller/feedstock/supplier/storage');
const purchaseController = require('../controller/feedstock/purchase/main');
const purchaseFeedstockController = require('../controller/feedstock/purchase/feedstock');

router.get('/manage', lib.route.toHttps, feedstockController.manage);

router.post('/save', lib.route.toHttps, feedstockController.save);
router.get('/id/:id', lib.route.toHttps, feedstockController.findById);
router.post('/filter', lib.route.toHttps, feedstockController.filter);
router.delete('/delete/id/:id', lib.route.toHttps, feedstockController.delete);

router.get('/report/id/:id', lib.route.toHttps, feedstockController.report);

router.get('/supplier/manage', lib.route.toHttps, supplierController.manage);
router.post('/supplier/save', lib.route.toHttps, supplierController.save);
router.post('/supplier/filter', lib.route.toHttps, supplierController.filter);
router.get('/supplier/id/:id', lib.route.toHttps, supplierController.findById);
router.delete('/supplier/delete/id/:id', lib.route.toHttps, supplierController.delete);

router.get('/supplier/storage/id/:id', lib.route.toHttps, supplierStorageController.open);
router.post('/supplier/storage/add', lib.route.toHttps, supplierStorageController.add);
router.post('/supplier/storage/update', lib.route.toHttps, supplierStorageController.update);
router.post('/supplier/storage/filter', lib.route.toHttps, supplierStorageController.filter);
router.delete('/supplier/storage/remove/id/:id', lib.route.toHttps, supplierStorageController.remove);

router.get('/purchase', lib.route.toHttps, purchaseController.index);
router.get('/purchase/manage', lib.route.toHttps, purchaseController.manage);
router.post('/purchase/save', lib.route.toHttps, purchaseController.save);
// router.put('/purchase/confirm', lib.route.toHttps, feedstockController.purchase.confirm);
// router.get('/purchase/id/:id', lib.route.toHttps, feedstockController.purchase.findById);
router.post('/purchase/filter', lib.route.toHttps, purchaseController.filter);

router.post('/purchase/feedstock/filter', lib.route.toHttps, purchaseFeedstockController.filter);

module.exports = router;