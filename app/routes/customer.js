const router = require("express").Router();

const customerController = require('../controller/customer');

//API ROUTES
router.get('/', customerController.index);
router.post('/save', customerController.save);
router.get('/filter', customerController.filter);
router.get('/id/:id', customerController.findById);
router.get('/show/id/:id', customerController.show);
router.delete('/delete', customerController.delete);

router.post('/address/save', customerController.address.save);
router.get('/address/id/:id', customerController.address.findById);
router.get('/address/list/customer_id/:customer_id', customerController.address.list);
router.delete('/address/delete', customerController.address.delete);

module.exports = router;