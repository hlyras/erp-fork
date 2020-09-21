const router = require("express").Router();

const feedstockController = require('../controller/feedstock');

//API ROUTES
router.get('/manage', feedstockController.manage);

router.post('/save', feedstockController.save);
router.get('/id/:id', feedstockController.findById);
router.get('/filter', feedstockController.filter);
router.delete('/delete', feedstockController.delete);

router.get('/request', feedstockController.request.index);
router.post('/request/save', feedstockController.request.save);
router.post('/request/filter', feedstockController.request.filter);
router.get('/request/id/:id', feedstockController.request.findById);
router.put('/request/confirm', feedstockController.request.confirm);

router.get('/regress', feedstockController.regress.index);
router.post('/regress/save', feedstockController.regress.save);
router.post('/regress/filter', feedstockController.regress.filter);
router.get('/regress/id/:id', feedstockController.regress.findById);
router.put('/regress/confirm', feedstockController.regress.confirm);

router.get('/supplier', feedstockController.supplier.index);
router.post('/supplier/create', feedstockController.supplier.save);
router.get('/supplier/filter', feedstockController.supplier.filter);
router.get('/supplier/id/:id', feedstockController.supplier.findById);
router.post('/supplier/storage/add', feedstockController.supplier.feedstock.add);
router.get('/supplier/storage/list/id/:id', feedstockController.supplier.storage.list);
router.get('/supplier/storage/remove/id/:id', feedstockController.supplier.feedstock.remove);

router.get('/purchase', feedstockController.purchase.index);
router.get('/purchase/manage', feedstockController.purchase.manage);
router.post('/purchase/save', feedstockController.purchase.save);
router.put('/purchase/confirm', feedstockController.purchase.confirm);
router.get('/purchase/id/:id', feedstockController.purchase.findById);
router.post('/purchase/filter', feedstockController.purchase.filter);

router.get('/storage', feedstockController.storage.index);
router.get('/storage/manage', feedstockController.storage.manage);
router.post('/storage/create', feedstockController.storage.create);
router.get('/storage/list', feedstockController.storage.list);
router.put('/storage/manage/amount/set', feedstockController.storage.feedstock.amount.set);
router.get('/storage/filter', feedstockController.storage.feedstock.filter);

module.exports = router;