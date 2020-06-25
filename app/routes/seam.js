const router = require("express").Router();

const seamController = require('../controller/seam');

//API ROUTES
router.get('/index', seamController.index);

module.exports = router;