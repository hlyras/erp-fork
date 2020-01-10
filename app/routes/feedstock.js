const router = require("express").Router();

const feedstockController = require('../controller/feedstock');

//API ROUTES
router.get('/index', feedstockController.index);

module.exports = router;