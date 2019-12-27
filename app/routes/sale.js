const router = require("express").Router();

const saleController = require('../controller/sale');
const homeController = require('../controller/home');

//API ROUTES
router.get('/', saleController.index);

module.exports = router;