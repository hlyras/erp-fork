const router = require("express").Router();
const lib = require('jarmlib');

const seamController = require('../controller/seam');

//API ROUTES
router.get('/', lib.route.toHttps, seamController.index);

router.get('/internal', lib.route.toHttps, seamController.internal.index);
router.get('/external', lib.route.toHttps, seamController.external.index);

module.exports = router;