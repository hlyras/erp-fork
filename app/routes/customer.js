const router = require("express").Router();
const lib = require('jarmlib');

const customerController = require('../controller/customer/main');
customerController.mail = require('../controller/customer/mail');
customerController.activity = require('../controller/customer/report/activity');
customerController.report = require('../controller/customer/report/main');
customerController.report.sale = require('../controller/customer/report/sale');

const Timeline = require('../controller/customer/timeline/main');

const addressController = require('../controller/customer/address');
const leadController = require('../controller/customer/lead/main');
leadController.mail = require('../controller/customer/lead/mail');
const prospectController = require('../controller/customer/prospect/main');
prospectController.mail = require('../controller/customer/prospect/mail');

// Customers
router.get('/', lib.route.toHttps, customerController.index);
router.post('/save', lib.route.toHttps, customerController.save);
router.post('/filter', lib.route.toHttps, customerController.filter);
router.get('/id/:id', lib.route.toHttps, customerController.findById);
router.get('/show/id/:id', lib.route.toHttps, customerController.show);
router.delete('/delete', lib.route.toHttps, customerController.delete);
router.post('/mail/send', lib.route.toHttps, customerController.mail.send);

router.get('/timeline', lib.route.toHttps, Timeline.index);
router.post('/timeline/create', lib.route.toHttps, Timeline.create);
router.post('/timeline/filter', lib.route.toHttps, Timeline.filter);
router.post('/timeline/update', lib.route.toHttps, Timeline.update);

router.post('/address/save', lib.route.toHttps, addressController.save);
router.get('/address/id/:id', lib.route.toHttps, addressController.findById);
router.get('/address/list/customer_id/:customer_id', lib.route.toHttps, addressController.list);
router.delete('/address/delete', lib.route.toHttps, addressController.delete);

router.get('/report', lib.route.toHttps, customerController.report.index);
router.get('/report/sale', lib.route.toHttps, customerController.report.sale.index);

router.get('/activity', lib.route.toHttps, customerController.activity.index);
router.post('/activity/filter', lib.route.toHttps, customerController.activity.filter);

// router.get('/mailer/remove-sign/:id/:register', lib.route.toHttps, mailController.removeSign);
// router.get('/mailer/signout/:id/:register', lib.route.toHttps, mailController.signOut);

// router.get('/report/sale', lib.route.toHttps, customerController.report.sale.index);

// Leads
router.get('/lead', lib.route.toHttps, leadController.index);
router.get('/lead/manage', lib.route.toHttps, leadController.manage);
router.post('/lead/filter', lib.route.toHttps, leadController.filter);
router.post('/lead/update', lib.route.toHttps, leadController.update);
router.post('/lead/mail/send', lib.route.toHttps, leadController.mail.send);

// Prospects
router.get('/prospect', lib.route.toHttps, prospectController.index);
router.post('/prospect/save', lib.route.toHttps, prospectController.save);
router.patch('/prospect', lib.route.toHttps, prospectController.update);
router.post('/prospect/filter', lib.route.toHttps, prospectController.filter);
router.get('/prospect/id/:id', lib.route.toHttps, prospectController.findById);
router.post('/prospect/mail/send', lib.route.toHttps, prospectController.mail.send);

router.post('/prospect/log/create', lib.route.toHttps, prospectController.log.create);

// router.post('/prospect/confirm-contact-1', lib.route.toHttps, prospectController.confirmContact1);
// router.post('/prospect/confirm-contact-2', lib.route.toHttps, prospectController.confirmContact2);
// router.post('/prospect/confirm-contact-3', lib.route.toHttps, prospectController.confirmContact3);

module.exports = router;