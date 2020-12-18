const router = require("express").Router();

const saleController = require('../controller/sale');
const homeController = require('../controller/home');

//API ROUTES
router.get('/', saleController.index);
router.post('/save', saleController.save);

module.exports = router;