const router = require("express").Router();

const customerController = require('../controller/customer');

//API ROUTES
router.get('/', customerController.index);
router.post('/save', customerController.save);

module.exports = router;