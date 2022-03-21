const router = require("express").Router();
const lib = require('jarmlib');

const customerController = require('../controller/customer/main');
const addressController = require('../controller/customer/address');
const prospectController = require('../controller/customer/prospect');
const mailerController = require('../controller/customer/mailer');

//API ROUTES
router.get('/', lib.route.toHttps, customerController.index);
router.post('/save', lib.route.toHttps, customerController.save);
router.get('/filter', lib.route.toHttps, customerController.filter);
router.get('/id/:id', lib.route.toHttps, customerController.findById);
router.get('/show/id/:id', lib.route.toHttps, customerController.show);
router.delete('/delete', lib.route.toHttps, customerController.delete);

router.post('/address/save', lib.route.toHttps, addressController.save);
router.get('/address/id/:id', lib.route.toHttps, addressController.findById);
router.get('/address/list/customer_id/:customer_id', lib.route.toHttps, addressController.list);
router.delete('/address/delete', lib.route.toHttps, addressController.delete);

router.get('/prospect', lib.route.toHttps, prospectController.index);
router.post('/prospect/save', lib.route.toHttps, prospectController.save);
router.post('/prospect/filter', lib.route.toHttps, prospectController.filter);
router.post('/prospect/confirm-contact-1', lib.route.toHttps, prospectController.confirmContact1);
router.post('/prospect/confirm-contact-2', lib.route.toHttps, prospectController.confirmContact2);
router.post('/prospect/confirm-contact-3', lib.route.toHttps, prospectController.confirmContact3);
router.get('/prospect/send-mail/:id', lib.route.toHttps, prospectController.sendMail);

router.get('/prospect/meeting', lib.route.toHttps, prospectController.meeting.index);
router.post('/prospect/meeting/filter', lib.route.toHttps, prospectController.meeting.filter);

router.get('/mailer', lib.route.toHttps, mailerController.index);
router.get('/mailer/send', lib.route.toHttps, mailerController.send);
router.get('/mailer/remove-sign/:id/:register', lib.route.toHttps, mailerController.removeSign);
router.get('/mailer/signout/:id/:register', lib.route.toHttps, mailerController.signOut);

module.exports = router;