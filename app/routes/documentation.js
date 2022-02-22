const router = require("express").Router();
const lib = require('jarmlib');

const documentationController = require('../controller/documentation/main');
const adminDocumentationController = require('../controller/documentation/admin');
const commercialDocumentationController = require('../controller/documentation/commercial');
const ecommerceDocumentationController = require('../controller/documentation/ecommerce');

router.get('/', lib.route.toHttps, documentationController.index);

// admin
router.get('/admin/main', lib.route.toHttps, adminDocumentationController.main);

// commercial
router.get('/commercial/nf', lib.route.toHttps, commercialDocumentationController.nf);

// ecommerce
router.get('/ecommerce/asks', lib.route.toHttps, ecommerceDocumentationController.asks);
router.get('/ecommerce/gathering', lib.route.toHttps, ecommerceDocumentationController.gathering);
router.get('/ecommerce/solution', lib.route.toHttps, ecommerceDocumentationController.solution);

module.exports = router;