const router = require("express").Router();
const lib = require('jarmlib');

const productionController = require('../controller/production/main');

router.get('/', lib.route.toHttps, productionController.index);
router.get('/manage', lib.route.toHttps, productionController.manage);

router.post('/create', lib.route.toHttps, productionController.create);
router.post('/filter', lib.route.toHttps, productionController.filter);

module.exports = router;