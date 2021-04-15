const router = require("express").Router();

const productController = require('../controller/product');

router.get('/index', productController.index);
router.get('/manage', productController.manage);

router.get('/', productController.list);
router.post('/save', productController.save);
router.get('/id/:id', productController.findById);
router.get('/code/:code', productController.findByCode);
router.get('/name/:name', productController.findByName);
router.get('/filter', productController.filter);
router.delete('/delete', productController.delete);

router.get('/show/:product_code', productController.show);

router.get('/datasheet/:product_code', productController.datasheet);

router.post('/image/add', productController.image.add);
router.delete('/image/remove', productController.image.remove);

router.post('/feedstock/add', productController.feedstock.add);
router.get('/feedstock/id/:id', productController.feedstock.findById);
router.delete('/feedstock/remove', productController.feedstock.remove);
router.get('/feedstock/list/product_id/:product_id', productController.feedstock.list);
router.post('/feedstock/category/save', productController.feedstock.category.save);
router.get('/feedstock/category/list/product_id/:product_id', productController.feedstock.category.list);

router.get('/price', productController.price.index);
router.post('/price/find', productController.price.find);
router.post('/price/update', productController.price.update);
router.post('/price/category/save', productController.price.category.save);
router.get('/price/category/filter', productController.price.category.filter);
router.get('/price/category/id/:id', productController.price.category.findById);
router.delete('/price/category/delete', productController.price.category.delete);

router.get('/package', productController.package.index);
router.post('/package/save', productController.package.save);
router.get('/package/filter', productController.package.filter);
router.get('/package/id/:id', productController.package.findById);
router.delete('/package/delete', productController.package.delete);
router.post('/package/product/update', productController.package.product.update);

router.post('/package/price/find', productController.package.price.find);
router.post('/package/price/update', productController.package.price.update);

router.post('/package/image/add', productController.package.image.add);
router.delete('/package/image/remove', productController.package.image.remove);

router.get('/molle', productController.molle);
router.get('/webgl', productController.webgl);

router.post('/categorySave', productController.categorySave);
router.get('/categoryList', productController.categoryList);

router.post('/colorSave', productController.colorSave);
router.get('/colorList', productController.colorList);

module.exports = router;