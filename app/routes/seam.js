const router = require("express").Router();
const lib = require('../../config/lib');

const seamController = require('../controller/seam');

//API ROUTES
router.get('/', lib.routeToHttps, seamController.index);

router.get('/internal', lib.routeToHttps, seamController.internal.index);
router.get('/external', lib.routeToHttps, seamController.external.index);

module.exports = router;