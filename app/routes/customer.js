const router = require("express").Router();

const customerController = require('../controller/customer');

//API ROUTES
router.get('/', customerController.index);
router.post('/save', customerController.save);
router.get('/filter', customerController.filter);
router.get('/id/:id', customerController.findById);
router.get('/show/id/:id', customerController.show);
router.delete('/delete', customerController.delete);

router.post('/adress/save', customerController.adress.save);
router.get('/adress/id/:id', customerController.adress.findById);
router.delete('/adress/delete', customerController.adress.delete);

module.exports = router;