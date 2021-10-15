const router = require("express").Router();
const lib = require('jarmlib');

const feedstockController = require('../controller/feedstock/main');
const supplierController = require('../controller/feedstock/supplier/main');
const storageController = require('../controller/feedstock/supplier/storage');

//API ROUTES
router.get('/manage', lib.route.toHttps, feedstockController.manage);

router.post('/save', lib.route.toHttps, feedstockController.save);
router.get('/id/:id', lib.route.toHttps, feedstockController.findById);
router.post('/filter', lib.route.toHttps, feedstockController.filter);

// router.delete('/delete', lib.route.toHttps, feedstockController.delete);

// router.get('/request', lib.route.toHttps, feedstockController.request.index);
// router.post('/request/save', lib.route.toHttps, feedstockController.request.save);
// router.post('/request/filter', lib.route.toHttps, feedstockController.request.filter);
// router.get('/request/id/:id', lib.route.toHttps, feedstockController.request.findById);
// router.put('/request/confirm', lib.route.toHttps, feedstockController.request.confirm);
// 
// router.get('/regress', lib.route.toHttps, feedstockController.regress.index);
// router.post('/regress/save', lib.route.toHttps, feedstockController.regress.save);
// router.post('/regress/filter', lib.route.toHttps, feedstockController.regress.filter);
// router.get('/regress/id/:id', lib.route.toHttps, feedstockController.regress.findById);
// router.put('/regress/confirm', lib.route.toHttps, feedstockController.regress.confirm);

router.get('/supplier/manage', lib.route.toHttps, supplierController.manage);
router.post('/supplier/save', lib.route.toHttps, supplierController.save);
router.post('/supplier/filter', lib.route.toHttps, supplierController.filter);
router.get('/supplier/id/:id', lib.route.toHttps, supplierController.findById);
router.get('/supplier/storage/id/:id', lib.route.toHttps, storageController.open);
// router.post('/supplier/storage/add', lib.route.toHttps, feedstockController.supplier.feedstock.add);
// router.get('/supplier/storage/list/id/:id', lib.route.toHttps, feedstockController.supplier.storage.list);
// router.get('/supplier/storage/remove/id/:id', lib.route.toHttps, feedstockController.supplier.feedstock.remove);
// 
// router.get('/purchase', lib.route.toHttps, feedstockController.purchase.index);
// router.get('/purchase/manage', lib.route.toHttps, feedstockController.purchase.manage);
// router.post('/purchase/save', lib.route.toHttps, feedstockController.purchase.save);
// router.put('/purchase/confirm', lib.route.toHttps, feedstockController.purchase.confirm);
// router.get('/purchase/id/:id', lib.route.toHttps, feedstockController.purchase.findById);
// router.post('/purchase/filter', lib.route.toHttps, feedstockController.purchase.filter);
// 
// router.get('/storage', lib.route.toHttps, feedstockController.storage.index);
// router.get('/storage/manage', lib.route.toHttps, feedstockController.storage.manage);
// router.post('/storage/create', lib.route.toHttps, feedstockController.storage.create);
// router.get('/storage/list', lib.route.toHttps, feedstockController.storage.list);
// router.put('/storage/manage/amount/set', lib.route.toHttps, feedstockController.storage.feedstock.amount.set);
// router.get('/storage/filter', lib.route.toHttps, feedstockController.storage.feedstock.filter);

module.exports = router;