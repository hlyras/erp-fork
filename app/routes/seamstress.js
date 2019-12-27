const router = require("express").Router();

const seamstressController = require('../controller/seamstress');

//API ROUTES
router.get('/index', seamstressController.index);

router.post('/save', seamstressController.save);
router.get('/list', seamstressController.list);
router.get('/filter', seamstressController.filter);
router.get('/id/:id', seamstressController.findById);
router.delete('/remove/:id', seamstressController.remove);

module.exports = router;