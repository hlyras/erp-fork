const router = require("express").Router();
const lib = require('../../config/lib');

const feedstockController = require('../controller/feedstock');

//API ROUTES
router.get('/manage', lib.routeToHttps, feedstockController.manage);

router.post('/save', lib.routeToHttps, feedstockController.save);
router.get('/id/:id', lib.routeToHttps, feedstockController.findById);
router.get('/filter', lib.routeToHttps, feedstockController.filter);
router.delete('/delete', lib.routeToHttps, feedstockController.delete);

router.get('/request', lib.routeToHttps, feedstockController.request.index);
router.post('/request/save', lib.routeToHttps, feedstockController.request.save);
router.post('/request/filter', lib.routeToHttps, feedstockController.request.filter);
router.get('/request/id/:id', lib.routeToHttps, feedstockController.request.findById);
router.put('/request/confirm', lib.routeToHttps, feedstockController.request.confirm);

router.get('/regress', lib.routeToHttps, feedstockController.regress.index);
router.post('/regress/save', lib.routeToHttps, feedstockController.regress.save);
router.post('/regress/filter', lib.routeToHttps, feedstockController.regress.filter);
router.get('/regress/id/:id', lib.routeToHttps, feedstockController.regress.findById);
router.put('/regress/confirm', lib.routeToHttps, feedstockController.regress.confirm);

router.get('/supplier', lib.routeToHttps, feedstockController.supplier.index);
router.post('/supplier/create', lib.routeToHttps, feedstockController.supplier.save);
router.get('/supplier/filter', lib.routeToHttps, feedstockController.supplier.filter);
router.get('/supplier/id/:id', lib.routeToHttps, feedstockController.supplier.findById);
router.post('/supplier/storage/add', lib.routeToHttps, feedstockController.supplier.feedstock.add);
router.get('/supplier/storage/list/id/:id', lib.routeToHttps, feedstockController.supplier.storage.list);
router.get('/supplier/storage/remove/id/:id', lib.routeToHttps, feedstockController.supplier.feedstock.remove);

router.get('/purchase', lib.routeToHttps, feedstockController.purchase.index);
router.get('/purchase/manage', lib.routeToHttps, feedstockController.purchase.manage);
router.post('/purchase/save', lib.routeToHttps, feedstockController.purchase.save);
router.put('/purchase/confirm', lib.routeToHttps, feedstockController.purchase.confirm);
router.get('/purchase/id/:id', lib.routeToHttps, feedstockController.purchase.findById);
router.post('/purchase/filter', lib.routeToHttps, feedstockController.purchase.filter);

router.get('/storage', lib.routeToHttps, feedstockController.storage.index);
router.get('/storage/manage', lib.routeToHttps, feedstockController.storage.manage);
router.post('/storage/create', lib.routeToHttps, feedstockController.storage.create);
router.get('/storage/list', lib.routeToHttps, feedstockController.storage.list);
router.put('/storage/manage/amount/set', lib.routeToHttps, feedstockController.storage.feedstock.amount.set);
router.get('/storage/filter', lib.routeToHttps, feedstockController.storage.feedstock.filter);

module.exports = router;