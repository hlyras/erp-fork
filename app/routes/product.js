const router = require("express").Router();
const lib = require('../../config/lib');

const productController = require('../controller/product');

router.get('/index', lib.routeToHttps, productController.index);
router.get('/manage', lib.routeToHttps, productController.manage);

router.get('/', lib.routeToHttps, productController.list);
router.post('/save', lib.routeToHttps, productController.save);
router.get('/id/:id', lib.routeToHttps, productController.findById);
router.get('/code/:code', lib.routeToHttps, productController.findByCode);
router.get('/name/:name', lib.routeToHttps, productController.findByName);
router.get('/filter', lib.routeToHttps, productController.filter);
router.delete('/delete', lib.routeToHttps, productController.delete);

router.get('/show/:product_code', lib.routeToHttps, productController.show);

router.get('/datasheet/:product_code', lib.routeToHttps, productController.datasheet);

router.post('/image/add', lib.routeToHttps, productController.image.add);
router.delete('/image/remove', lib.routeToHttps, productController.image.remove);

router.post('/feedstock/add', lib.routeToHttps, productController.feedstock.add);
router.get('/feedstock/id/:id', lib.routeToHttps, productController.feedstock.findById);
router.delete('/feedstock/remove', lib.routeToHttps, productController.feedstock.remove);
router.get('/feedstock/list/product_id/:product_id', lib.routeToHttps, productController.feedstock.list);
router.post('/feedstock/category/save', lib.routeToHttps, productController.feedstock.category.save);
router.get('/feedstock/category/list/product_id/:product_id', lib.routeToHttps, productController.feedstock.category.list);

router.get('/price', lib.routeToHttps, productController.price.index);
router.post('/price/filter', lib.routeToHttps, productController.price.filter);
router.post('/price/find', lib.routeToHttps, productController.price.find);
router.post('/price/update', lib.routeToHttps, productController.price.update);
router.post('/price/category/save', lib.routeToHttps, productController.price.category.save);
router.get('/price/category/filter', lib.routeToHttps, productController.price.category.filter);
router.get('/price/category/id/:id', lib.routeToHttps, productController.price.category.findById);
router.delete('/price/category/delete', lib.routeToHttps, productController.price.category.delete);

router.get('/package', lib.routeToHttps, productController.package.index);
router.post('/package/save', lib.routeToHttps, productController.package.save);
router.get('/package/filter', lib.routeToHttps, productController.package.filter);
router.get('/package/id/:id', lib.routeToHttps, productController.package.findById);
router.delete('/package/delete', lib.routeToHttps, productController.package.delete);
router.post('/package/product/update', lib.routeToHttps, productController.package.product.update);

router.post('/package/price/find', lib.routeToHttps, productController.package.price.find);
// router.post('/package/price/filter', lib.routeToHttps, productController.package.price.filter);
router.post('/package/price/update', lib.routeToHttps, productController.package.price.update);

router.post('/package/image/add', lib.routeToHttps, productController.package.image.add);
router.delete('/package/image/remove', lib.routeToHttps, productController.package.image.remove);

router.get('/molle', lib.routeToHttps, productController.molle);
router.get('/webgl', lib.routeToHttps, productController.webgl);

router.post('/categorySave', lib.routeToHttps, productController.categorySave);
router.get('/categoryList', lib.routeToHttps, productController.categoryList);

router.post('/colorSave', lib.routeToHttps, productController.colorSave);
router.get('/colorList', lib.routeToHttps, productController.colorList);

module.exports = router;