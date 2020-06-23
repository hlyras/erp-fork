const router = require("express").Router();

const seamController = require('../controller/seam');

//API ROUTES
router.get('/index', seamController.index);

router.get('/internal', seamController.internal.index);
router.get('/internal/seamstress/save', seamController.internal.seamstress.save);

router.get('/external', seamController.external.index);
router.get('/external/seamstress/save', seamController.external.seamstress.save);

module.exports = router;