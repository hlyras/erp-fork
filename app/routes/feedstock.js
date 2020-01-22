const router = require("express").Router();

const feedstockController = require('../controller/feedstock');

//API ROUTES
router.get('/index', feedstockController.index);
router.post('/save', feedstockController.save);
router.get('/id/:id', feedstockController.findById);
router.get('/filter', feedstockController.filter);
router.delete('/remove', feedstockController.remove);

module.exports = router;