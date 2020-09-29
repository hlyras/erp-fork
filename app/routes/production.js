const router = require("express").Router();

const productionController = require('../controller/production');

router.get('/', productionController.index);
router.get('/manage', productionController.manage);
router.get('/simulation', productionController.simulation);
router.post('/simulate', productionController.simulate);
router.post('/save', productionController.save);
router.put('/confirm', productionController.confirm);
router.put('/cancel', productionController.cancel);
router.post('/filter', productionController.filter);
router.get('/id/:id', productionController.findById);

module.exports = router;