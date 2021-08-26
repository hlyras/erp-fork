const router = require("express").Router();
const lib = require('jarmlib');

const customerController = require('../controller/customer');

//API ROUTES
router.get('/', lib.route.toHttps, customerController.index);
router.post('/save', lib.route.toHttps, customerController.save);
router.get('/filter', lib.route.toHttps, customerController.filter);
router.get('/id/:id', lib.route.toHttps, customerController.findById);
router.get('/show/id/:id', lib.route.toHttps, customerController.show);
router.delete('/delete', lib.route.toHttps, customerController.delete);

router.post('/address/save', lib.route.toHttps, customerController.address.save);
router.get('/address/id/:id', lib.route.toHttps, customerController.address.findById);
router.get('/address/list/customer_id/:customer_id', lib.route.toHttps, customerController.address.list);
router.delete('/address/delete', lib.route.toHttps, customerController.address.delete);

module.exports = router;