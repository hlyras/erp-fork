const router = require("express").Router();
const lib = require('jarmlib');

const Income = require('../controller/financial/income/main');
const IncomeCategory = require('../controller/financial/income/category');
const IncomeOrigin = require('../controller/financial/income/origin');

const Outcome = require('../controller/financial/outcome/main');
const OutcomeCategory = require('../controller/financial/outcome/category');
const OutcomeOrigin = require('../controller/financial/outcome/origin/main');
const OutcomeOriginPayment = require('../controller/financial/outcome/origin/payment');

router.get('/income', lib.route.toHttps, Income.index);
router.post('/income/create', lib.route.toHttps, Income.create);
router.post('/income/filter', lib.route.toHttps, Income.filter);
router.get('/income/id/:id', lib.route.toHttps, Income.findById);
router.delete('/income/delete/id/:id', lib.route.toHttps, Income.delete);

router.post('/income/category/create', lib.route.toHttps, IncomeCategory.create);
router.get('/income/category/id/:id', lib.route.toHttps, IncomeCategory.findById);
router.post('/income/category/filter', lib.route.toHttps, IncomeCategory.filter);
router.delete('/income/category/id/:id', lib.route.toHttps, IncomeCategory.delete);

router.post('/income/origin/create', lib.route.toHttps, IncomeOrigin.create);
router.get('/income/origin/id/:id', lib.route.toHttps, IncomeOrigin.findById);
router.post('/income/origin/filter', lib.route.toHttps, IncomeOrigin.filter);
router.delete('/income/origin/id/:id', lib.route.toHttps, IncomeOrigin.delete);

router.get('/outcome', lib.route.toHttps, Outcome.index);
router.post('/outcome/create', lib.route.toHttps, Outcome.create);
router.post('/outcome/filter', lib.route.toHttps, Outcome.filter);
router.delete('/outcome/delete/:id', lib.route.toHttps, Outcome.delete);

router.get('/outcome/payment', lib.route.toHttps, Outcome.payment.index);
router.put('/outcome/payment/approve/:id', lib.route.toHttps, Outcome.payment.approve);
router.post('/outcome/payment/confirm', lib.route.toHttps, Outcome.payment.confirm);

router.post('/outcome/category/create', lib.route.toHttps, OutcomeCategory.create);
router.get('/outcome/category/id/:id', lib.route.toHttps, OutcomeCategory.findById);
router.post('/outcome/category/filter', lib.route.toHttps, OutcomeCategory.filter);
router.delete('/outcome/category/id/:id', lib.route.toHttps, OutcomeCategory.delete);

router.post('/outcome/origin/create', lib.route.toHttps, OutcomeOrigin.create);
router.get('/outcome/origin/id/:id', lib.route.toHttps, OutcomeOrigin.findById);
router.post('/outcome/origin/filter', lib.route.toHttps, OutcomeOrigin.filter);
router.delete('/outcome/origin/id/:id', lib.route.toHttps, OutcomeOrigin.delete);

router.post('/outcome/origin/payment/create', lib.route.toHttps, OutcomeOriginPayment.create);
router.post('/outcome/origin/payment/filter', lib.route.toHttps, OutcomeOriginPayment.filter);
router.get('/outcome/origin/payment/id/:id', lib.route.toHttps, OutcomeOriginPayment.findById);
router.delete('/outcome/origin/payment/id/:id', lib.route.toHttps, OutcomeOriginPayment.delete);

module.exports = router;