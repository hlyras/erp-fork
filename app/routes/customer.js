const router = require("express").Router();
const lib = require('jarmlib');

const customerController = require('../controller/customer/main');
customerController.mail = require('../controller/customer/mail');
const addressController = require('../controller/customer/address');
const leadController = require('../controller/customer/lead/main');
leadController.mail = require('../controller/customer/lead/mail');
const prospectController = require('../controller/customer/prospect/main');
prospectController.mail = require('../controller/customer/prospect/mail');

//API ROUTES
router.get('/', lib.route.toHttps, customerController.index);
router.post('/save', lib.route.toHttps, customerController.save);
router.post('/filter', lib.route.toHttps, customerController.filter);
router.get('/id/:id', lib.route.toHttps, customerController.findById);
router.get('/show/id/:id', lib.route.toHttps, customerController.show);
router.delete('/delete', lib.route.toHttps, customerController.delete);

router.post('/address/save', lib.route.toHttps, addressController.save);
router.get('/address/id/:id', lib.route.toHttps, addressController.findById);
router.get('/address/list/customer_id/:customer_id', lib.route.toHttps, addressController.list);
router.delete('/address/delete', lib.route.toHttps, addressController.delete);

router.post('/mail/send', lib.route.toHttps, customerController.mail.send);

router.get('/lead', lib.route.toHttps, leadController.index);
router.get('/lead/manage', lib.route.toHttps, leadController.manage);
router.post('/lead/filter', lib.route.toHttps, leadController.filter);
router.post('/lead/mail/send', lib.route.toHttps, leadController.mail.send);

router.get('/prospect', lib.route.toHttps, prospectController.index);
router.post('/prospect/save', lib.route.toHttps, prospectController.save);
router.post('/prospect/filter', lib.route.toHttps, prospectController.filter);

router.post('/prospect/confirm-contact-1', lib.route.toHttps, prospectController.confirmContact1);
router.post('/prospect/confirm-contact-2', lib.route.toHttps, prospectController.confirmContact2);
router.post('/prospect/confirm-contact-3', lib.route.toHttps, prospectController.confirmContact3);


// router.get('/mailer/remove-sign/:id/:register', lib.route.toHttps, mailController.removeSign);
// router.get('/mailer/signout/:id/:register', lib.route.toHttps, mailController.signOut);

module.exports = router;