const router = require("express").Router();
const lib = require('jarmlib');

const documentationController = require('../controller/documentation/main');
const ecommerceDocumentationController = require('../controller/documentation/ecommerce');

router.get('/', lib.route.toHttps, documentationController.index);

router.get('/ecommerce/solution', lib.route.toHttps, ecommerceDocumentationController.solution);

module.exports = router;