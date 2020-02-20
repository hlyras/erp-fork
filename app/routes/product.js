const router = require("express").Router();

const productController = require('../controller/product');

//API ROUTES
router.get('/index', productController.index);
router.get('/admin', productController.admin);

router.get('/', productController.list);
router.get('/id/:id', productController.findById);
router.get('/code/:code', productController.findByCode);
router.get('/name/:name', productController.findByName);
router.get('/filter', productController.filter);
router.options('/filter', productController.options);
router.delete('/remove', productController.remove);

// APPLICATION ROUTES
router.post('/save', productController.save);
router.post('/addimage', productController.addImage);
router.delete('/removeimage', productController.removeImage);

router.post('/feedstock/add', productController.feedstockAdd);
router.delete('/feedstock/remove', productController.feedstockRemove);
router.get('/feedstock/list/id/:id', productController.feedstockList);

router.post('/categorySave', productController.categorySave);
router.get('/categoryList', productController.categoryList);

router.post('/colorSave', productController.colorSave);
router.get('/colorList', productController.colorList);

router.get('/production', productController.production);

module.exports = router;