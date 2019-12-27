const router = require("express").Router();

const customerController = require('../controller/customer');

//API ROUTES
router.get('/', customerController.index);

module.exports = router;