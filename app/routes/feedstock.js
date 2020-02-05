const router = require("express").Router();

const feedstockController = require('../controller/feedstock');

//API ROUTES
router.get('/index', feedstockController.index);
router.get('/admin', feedstockController.admin);

router.post('/save', feedstockController.save);
router.get('/id/:id', feedstockController.findById);
router.get('/filter', feedstockController.filter);
router.delete('/remove', feedstockController.remove);

router.get('/storage', feedstockController.storage);
router.post('/storage/create', feedstockController.createStorage);
// router.get('/storage/list', feedstockController.listStorage);
router.get('/storage/filter', feedstockController.storageFilter);

module.exports = router;