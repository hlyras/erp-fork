const router = require("express").Router();
const lib = require('jarmlib');

const multer = require('../middleware/multer');

const productController = require('../controller/product/main');
productController.color = require('../controller/product/color');
productController.image = require('../controller/product/image');

productController.package = require('../controller/product/package/main');
productController.package.price = require('../controller/product/package/price');
productController.package.product = require('../controller/product/package/product');
productController.package.image = require('../controller/product/package/image');

productController.datasheet = require('../controller/product/datasheet/main');

productController.feedstock = require('../controller/product/feedstock/main');
productController.feedstock.category = require('../controller/product/feedstock/category');

productController.seam = require('../controller/product/seam/main');
productController.filigran = require('../controller/product/seam/filigran');

productController.conference = require('../controller/product/conference/main');

productController.catalog = require('../controller/product/catalog/main');
productController.catalog.product = require('../controller/product/catalog/product');
productController.catalog.package = require('../controller/product/catalog/package');

productController.storage = require('../controller/product/storage/main');

router.get('/manage', lib.route.toHttps, productController.manage);

router.post('/create', lib.route.toHttps, multer.any('files'), productController.create);
router.get('/id/:id', lib.route.toHttps, productController.findById);
router.post('/filter', lib.route.toHttps, productController.filter);
router.delete('/delete/:id', lib.route.toHttps, productController.delete);
router.get('/print', lib.route.toHttps, productController.print);

// router.post('/image/add', lib.route.toHttps, productController.image.add);
router.delete('/image/id/:id', lib.route.toHttps, productController.image.delete);

router.get('/datasheet', lib.route.toHttps, productController.datasheet.index);
router.get('/datasheet/cost', lib.route.toHttps, productController.datasheet.cost);
router.get('/feedstock/datasheet/:product_id', lib.route.toHttps, productController.datasheet.feedstock);
// router.get('/seam/datasheet', lib.route.toHttps, productController.datasheet.seam);
// router.get('/filigran/datasheet', lib.route.toHttps, productController.datasheet.filigran);

// router.get('/feedstock', lib.route.toHttps, productController.feedstock.index);
router.get('/feedstock/manage', lib.route.toHttps, productController.feedstock.manage);
router.post('/feedstock/add', lib.route.toHttps, productController.feedstock.add);
router.post('/feedstock/filter', lib.route.toHttps, productController.feedstock.filter);
router.get('/feedstock/id/:id', lib.route.toHttps, productController.feedstock.findById);
router.delete('/feedstock/remove/:id', lib.route.toHttps, productController.feedstock.remove);

router.post('/feedstock/category/create', lib.route.toHttps, productController.feedstock.category.create);
router.post('/feedstock/category/filter', lib.route.toHttps, productController.feedstock.category.filter);
router.get('/feedstock/category/id/:id', lib.route.toHttps, productController.feedstock.category.findById);
router.delete('/feedstock/category/delete/:id', lib.route.toHttps, productController.feedstock.category.delete);

router.get('/seam', lib.route.toHttps, productController.seam.index);
router.get('/seam/manage', lib.route.toHttps, productController.seam.manage);
router.post('/seam/create', lib.route.toHttps, productController.seam.create);
router.post('/seam/filter', lib.route.toHttps, productController.seam.filter);
router.get('/seam/id/:id', lib.route.toHttps, productController.seam.findById);
router.delete('/seam/delete/:id', lib.route.toHttps, productController.seam.delete);

router.get('/filigran', lib.route.toHttps, productController.filigran.index);
router.get('/filigran/manage', lib.route.toHttps, productController.filigran.manage);
router.post('/filigran/create', lib.route.toHttps, productController.filigran.create);
router.post('/filigran/filter', lib.route.toHttps, productController.filigran.filter);
router.get('/filigran/id/:id', lib.route.toHttps, productController.filigran.findById);
router.delete('/filigran/delete/:id', lib.route.toHttps, productController.filigran.delete);

router.get('/package', lib.route.toHttps, productController.package.manage);
router.post('/package/create', lib.route.toHttps, multer.any('files'), productController.package.create);
router.post('/package/filter', lib.route.toHttps, productController.package.filter);
router.get('/package/id/:id', lib.route.toHttps, productController.package.findById);
// router.delete('/package/id/:id', lib.route.toHttps, productController.package.delete);
router.post('/package/product/update', lib.route.toHttps, productController.package.product.update);

router.post('/price/find', lib.route.toHttps, productController.price.find);
router.post('/package/price/find', lib.route.toHttps, productController.package.price.find);

// router.post('/package/image/add', lib.route.toHttps, productController.package.image.add);
router.delete('/package/image/:id', lib.route.toHttps, productController.package.image.delete);

router.get('/conference', lib.route.toHttps, productController.conference.index);
router.get('/conference/id/:id', lib.route.toHttps, productController.conference.findById);
router.get('/conference/viewer', lib.route.toHttps, productController.conference.viewer);
router.get('/conference/manage', lib.route.toHttps, productController.conference.manage);
router.post('/conference/create', lib.route.toHttps, productController.conference.create);
router.post('/conference/filter', lib.route.toHttps, productController.conference.filter);
router.delete('/conference/delete/:id', lib.route.toHttps, productController.conference.delete);

router.post('/colorSave', lib.route.toHttps, productController.color.save);
router.get('/colorList', lib.route.toHttps, productController.color.list);

router.get('/catalog', lib.route.toHttps, productController.catalog.index);
router.get('/catalog/manage', lib.route.toHttps, productController.catalog.manage);
router.post('/catalog/create', lib.route.toHttps, productController.catalog.create);
router.post('/catalog/filter', lib.route.toHttps, productController.catalog.filter);
router.get('/catalog/id/:id', lib.route.toHttps, productController.catalog.findById);
router.post('/catalog/product/filter', lib.route.toHttps, productController.catalog.product.filter);

router.post('/catalog/product/add', lib.route.toHttps, productController.catalog.product.add);
router.post('/catalog/product/update', lib.route.toHttps, productController.catalog.product.update);
router.delete('/catalog/product/remove/:id', lib.route.toHttps, productController.catalog.product.remove);

router.post('/catalog/package/add', lib.route.toHttps, productController.catalog.package.add);
router.post('/catalog/package/update', lib.route.toHttps, productController.catalog.package.update);
router.delete('/catalog/package/remove/:id', lib.route.toHttps, productController.catalog.package.remove);

router.get('/storage', lib.route.toHttps, productController.storage.index);
router.get('/storage/manage', lib.route.toHttps, productController.storage.manage);

module.exports = router;