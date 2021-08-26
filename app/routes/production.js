const router = require("express").Router();
const lib = require('jarmlib');

const productionController = require('../controller/production');

router.get('/', lib.route.toHttps, productionController.index);
router.get('/manage', lib.route.toHttps, productionController.manage);
router.get('/simulation', lib.route.toHttps, productionController.simulation);
router.post('/simulate', lib.route.toHttps, productionController.simulate);
router.post('/save', lib.route.toHttps, productionController.save);
router.put('/confirm', lib.route.toHttps, productionController.confirm);
router.put('/cancel', lib.route.toHttps, productionController.cancel);
router.post('/filter', lib.route.toHttps, productionController.filter);
router.get('/id/:id', lib.route.toHttps, productionController.findById);

module.exports = router;