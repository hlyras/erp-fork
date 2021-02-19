const router = require("express").Router();

const saleController = require('../controller/ecommerce/sale');

router.get('/sale', saleController.index);

router.post('/sale/save', saleController.save);
router.get('/sale/manage', saleController.manage);

module.exports = router;