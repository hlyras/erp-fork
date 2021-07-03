const router = require("express").Router();
const lib = require('../../config/lib');

const productionController = require('../controller/production');

router.get('/', lib.routeToHttps, productionController.index);
router.get('/manage', lib.routeToHttps, productionController.manage);
router.get('/simulation', lib.routeToHttps, productionController.simulation);
router.post('/simulate', lib.routeToHttps, productionController.simulate);
router.post('/save', lib.routeToHttps, productionController.save);
router.put('/confirm', lib.routeToHttps, productionController.confirm);
router.put('/cancel', lib.routeToHttps, productionController.cancel);
router.post('/filter', lib.routeToHttps, productionController.filter);
router.get('/id/:id', lib.routeToHttps, productionController.findById);

module.exports = router;