const router = require("express").Router();

const customerController = require('../controller/customer');

//API ROUTES
router.get('/', customerController.index);
router.post('/save', customerController.save);
router.get('/filter', customerController.filter);

module.exports = router;