const router = require("express").Router();

const productController = require('../controller/product');

//API ROUTES
router.get('/index', productController.index);

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
router.post('/addfeedstock', productController.addFeedstock);
router.delete('/removefeedstock', productController.removeFeedstock);
router.post('/categorySave', productController.categorySave);
router.get('/categoryList', productController.categoryList);
router.post('/colorSave', productController.colorSave);
router.get('/colorList', productController.colorList);

module.exports = router;