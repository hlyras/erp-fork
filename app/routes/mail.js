const router = require("express").Router();
const lib = require('jarmlib');

const mailController = require('../controller/mail/main');

router.get('/', lib.route.toHttps, mailController.index);
router.get('/manage', lib.route.toHttps, mailController.manage);
router.get('/emitter', lib.route.toHttps, mailController.emitter);

router.post('/create', lib.route.toHttps, mailController.create);
router.get('/:id', lib.route.toHttps, mailController.findById);
router.post('/filter', lib.route.toHttps, mailController.filter);
router.delete('/delete/:id', lib.route.toHttps, mailController.delete);

module.exports = router;