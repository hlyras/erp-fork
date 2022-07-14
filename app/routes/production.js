const router = require("express").Router();
const lib = require('jarmlib');

const productionController = require('../controller/production/main');

router.get('/', lib.route.toHttps, productionController.index);
router.get('/manage', lib.route.toHttps, productionController.manage);

module.exports = router;