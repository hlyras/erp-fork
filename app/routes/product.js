const router = require("express").Router();
const lib = require('jarmlib');

const productController = require('../controller/product');

router.get('/index', lib.route.toHttps, productController.index);
router.get('/manage', lib.route.toHttps, productController.manage);

router.get('/', lib.route.toHttps, productController.list);
router.post('/save', lib.route.toHttps, productController.save);
router.get('/id/:id', lib.route.toHttps, productController.findById);
router.get('/code/:code', lib.route.toHttps, productController.findByCode);
router.get('/name/:name', lib.route.toHttps, productController.findByName);
router.get('/filter', lib.route.toHttps, productController.filter);
router.delete('/delete', lib.route.toHttps, productController.delete);

router.get('/show/:product_code', lib.route.toHttps, productController.show);

router.get('/datasheet/:product_code', lib.route.toHttps, productController.datasheet);

router.post('/image/add', lib.route.toHttps, productController.image.add);
router.delete('/image/remove', lib.route.toHttps, productController.image.remove);

router.post('/feedstock/add', lib.route.toHttps, productController.feedstock.add);
router.get('/feedstock/id/:id', lib.route.toHttps, productController.feedstock.findById);
router.delete('/feedstock/remove', lib.route.toHttps, productController.feedstock.remove);
router.get('/feedstock/list/product_id/:product_id', lib.route.toHttps, productController.feedstock.list);
router.post('/feedstock/category/save', lib.route.toHttps, productController.feedstock.category.save);
router.get('/feedstock/category/list/product_id/:product_id', lib.route.toHttps, productController.feedstock.category.list);

router.get('/price', lib.route.toHttps, productController.price.index);
router.post('/price/filter', lib.route.toHttps, productController.price.filter);
router.post('/price/find', lib.route.toHttps, productController.price.find);
router.post('/price/update', lib.route.toHttps, productController.price.update);
router.post('/price/category/save', lib.route.toHttps, productController.price.category.save);
router.get('/price/category/filter', lib.route.toHttps, productController.price.category.filter);
router.get('/price/category/id/:id', lib.route.toHttps, productController.price.category.findById);
router.delete('/price/category/delete', lib.route.toHttps, productController.price.category.delete);

router.get('/package', lib.route.toHttps, productController.package.index);
router.post('/package/save', lib.route.toHttps, productController.package.save);
router.get('/package/filter', lib.route.toHttps, productController.package.filter);
router.get('/package/id/:id', lib.route.toHttps, productController.package.findById);
router.delete('/package/delete', lib.route.toHttps, productController.package.delete);
router.post('/package/product/update', lib.route.toHttps, productController.package.product.update);

router.post('/package/price/find', lib.route.toHttps, productController.package.price.find);
// router.post('/package/price/filter', lib.route.toHttps, productController.package.price.filter);
router.post('/package/price/update', lib.route.toHttps, productController.package.price.update);

router.post('/package/image/add', lib.route.toHttps, productController.package.image.add);
router.delete('/package/image/remove', lib.route.toHttps, productController.package.image.remove);

router.get('/molle', lib.route.toHttps, productController.molle);
router.get('/webgl', lib.route.toHttps, productController.webgl);

router.post('/categorySave', lib.route.toHttps, productController.categorySave);
router.get('/categoryList', lib.route.toHttps, productController.categoryList);

router.post('/colorSave', lib.route.toHttps, productController.colorSave);
router.get('/colorList', lib.route.toHttps, productController.colorList);

module.exports = router;