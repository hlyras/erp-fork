const router = require("express").Router();
const lib = require('jarmlib');

const documentationController = require('../controller/documentation/main');
const ecommerceDocumentationController = require('../controller/documentation/ecommerce');
const adminDocumentationController = require('../controller/documentation/admin');

router.get('/', lib.route.toHttps, documentationController.index);

// ecommerce
router.get('/ecommerce/solution', lib.route.toHttps, ecommerceDocumentationController.solution);

// admin
router.get('/admin/main', lib.route.toHttps, adminDocumentationController.main);

module.exports = router;