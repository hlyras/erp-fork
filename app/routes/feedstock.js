const router = require("express").Router();

const feedstockController = require('../controller/feedstock');

//API ROUTES
router.get('/index', feedstockController.index);
router.get('/admin', feedstockController.admin);

router.post('/save', feedstockController.save);
router.get('/id/:id', feedstockController.findById);
router.get('/filter', feedstockController.filter);
router.delete('/remove', feedstockController.remove);


router.get('/supplier', feedstockController.supplier);
router.post('/supplier/create', feedstockController.supplierCreate);
router.get('/supplier/filter', feedstockController.supplierFilter);
router.get('/supplier/:id', feedstockController.supplierFindById);

router.get('/purchase', feedstockController.purchase);

router.get('/storage', feedstockController.storage);
router.post('/storage/create', feedstockController.storageCreate);
// router.get('/storage/list', feedstockController.storageList);
router.get('/storage/filter', feedstockController.storageFilter);

module.exports = router;