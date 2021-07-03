const router = require("express").Router();
const lib = require('../../config/lib');

const customerController = require('../controller/customer');

//API ROUTES
router.get('/', lib.routeToHttps, customerController.index);
router.post('/save', lib.routeToHttps, customerController.save);
router.get('/filter', lib.routeToHttps, customerController.filter);
router.get('/id/:id', lib.routeToHttps, customerController.findById);
router.get('/show/id/:id', lib.routeToHttps, customerController.show);
router.delete('/delete', lib.routeToHttps, customerController.delete);

router.post('/address/save', lib.routeToHttps, customerController.address.save);
router.get('/address/id/:id', lib.routeToHttps, customerController.address.findById);
router.get('/address/list/customer_id/:customer_id', lib.routeToHttps, customerController.address.list);
router.delete('/address/delete', lib.routeToHttps, customerController.address.delete);

module.exports = router;