const router = require("express").Router();

const seamController = require('../controller/seam');

//API ROUTES
router.get('/', seamController.index);

router.get('/internal', seamController.internal.index);
router.get('/external', seamController.external.index);

module.exports = router;