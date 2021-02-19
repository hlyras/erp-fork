const router = require("express").Router();

const saleController = require('../controller/sale');

//API ROUTES
router.get('/', saleController.index);
router.get('/manage', saleController.manage);

router.get('/id/:id', saleController.findById);

router.post('/save', saleController.save);
router.post('/filter', saleController.filter);

module.exports = router;