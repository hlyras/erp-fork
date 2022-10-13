const router = require("express").Router();
const lib = require('jarmlib');

const productionController = require('../controller/production/main');
productionController.preparation = require('../controller/production/preparation');

router.get('/', lib.route.toHttps, productionController.index);
router.get('/manage', lib.route.toHttps, productionController.manage);

router.post('/create', lib.route.toHttps, productionController.create);
router.post('/filter', lib.route.toHttps, productionController.filter);
router.get('/id/:id', lib.route.toHttps, productionController.findById);

router.get('/preparation', lib.route.toHttps, productionController.preparation.index);
router.get('/preparation/print/:id', lib.route.toHttps, productionController.preparation.print);

module.exports = router;