const router = require("express").Router();

const saleController = require('../controller/sale');
const homeController = require('../controller/home');

//API ROUTES
router.get('/', saleController.index);
router.get('/dashboard', saleController.dashboard);

router.post('/save', saleController.save);
router.post('/filter', saleController.filter);

module.exports = router;