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
router.delete('/remove', productController.remove);

router.post('/addimage', productController.image.add);
router.delete('/removeimage', productController.image.remove);

router.post('/feedstock/add', productController.feedstock.add);
router.delete('/feedstock/remove', productController.feedstock.remove);
router.get('/feedstock/list/id/:id', productController.feedstock.list);

router.post('/categorySave', productController.categorySave);
router.get('/categoryList', productController.categoryList);

router.post('/colorSave', productController.colorSave);
router.get('/colorList', productController.colorList);

router.get('/production', productController.production.index);
router.get('/production/manage', productController.production.manage);
router.get('/production/simulation', productController.production.simulation);
router.post('/production/simulate', productController.production.simulate);
router.post('/production/save', productController.production.save);
router.put('/production/confirm', productController.production.confirm);
router.put('/production/cancel', productController.production.cancel);
router.post('/production/filter', productController.production.filter);
router.get('/production/id/:id', productController.production.findById);

module.exports = router;