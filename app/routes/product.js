const router = require("express").Router();

const productController = require('../controller/product');

router.get('/index', productController.index);
router.get('/manage', productController.manage);

router.get('/', productController.list);
router.get('/id/:id', productController.findById);
router.get('/code/:code', productController.findByCode);
router.get('/name/:name', productController.findByName);
router.get('/filter', productController.filter);
router.delete('/remove', productController.remove);

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
router.get('/production/manage', productController.productionManage);
router.get('/production/simulation', productController.productionSimulation);
router.post('/production/simulate', productController.productionSimulate);
router.post('/production/save', productController.productionSave);
router.put('/production/confirm', productController.productionConfirm);
router.put('/production/cancel', productController.productionCancel);
router.post('/production/filter', productController.productionFilter);
router.get('/production/id/:id', productController.productionFindById);

module.exports = router;