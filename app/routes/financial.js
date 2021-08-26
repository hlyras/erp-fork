const router = require("express").Router();
const lib = require('jarmlib');

const financialController = require('../controller/financial/main');

const incomeController = require('../controller/financial/income/main');
const incomeCategoryController = require('../controller/financial/income/category');
const incomeOriginController = require('../controller/financial/income/origin');

const outcomeController = require('../controller/financial/outcome/main');
const outcomeCategoryController = require('../controller/financial/outcome/category');
const outcomeOriginController = require('../controller/financial/outcome/origin');

const expenseController = require('../controller/financial/expense/main');

//API ROUTES
router.get('/index', lib.route.toHttps, financialController.index);

router.post('/balance', lib.route.toHttps, financialController.balance);
// ------------------
// income routes
// ------------------

router.get('/income', lib.route.toHttps, incomeController.index);
router.post('/income/save', lib.route.toHttps, incomeController.save);
router.get('/income/filter', lib.route.toHttps, incomeController.filter);
router.get('/income/id/:id', lib.route.toHttps, incomeController.findById);
router.delete('/income/delete/id/:id', lib.route.toHttps, incomeController.delete);

router.post('/income/category/save', lib.route.toHttps, incomeCategoryController.save);
router.get('/income/category/id/:id', lib.route.toHttps, incomeCategoryController.findById);
router.get('/income/category/filter', lib.route.toHttps, incomeCategoryController.filter);
router.delete('/income/category/id/:id', lib.route.toHttps, incomeCategoryController.delete);

router.post('/income/origin/save', lib.route.toHttps, incomeOriginController.save);
router.get('/income/origin/id/:id', lib.route.toHttps, incomeOriginController.findById);
router.get('/income/origin/category_id/:id', lib.route.toHttps, incomeOriginController.findByCategoryId);
router.get('/income/origin/filter', lib.route.toHttps, incomeOriginController.filter);
router.delete('/income/origin/id/:id', lib.route.toHttps, incomeOriginController.delete);

// // ------------------
// // outcome routes
// // ------------------

router.get('/outcome', lib.route.toHttps, outcomeController.index);

router.get('/outcome', lib.route.toHttps, outcomeController.index);
router.post('/outcome/save', lib.route.toHttps, outcomeController.save);
router.get('/outcome/id/:id', lib.route.toHttps, outcomeController.findById);
router.post('/outcome/filter', lib.route.toHttps, outcomeController.filter);
router.delete('/outcome/delete/id/:id', lib.route.toHttps, outcomeController.delete);

router.post('/outcome/category/save', lib.route.toHttps, outcomeCategoryController.save);
router.get('/outcome/category/id/:id', lib.route.toHttps, outcomeCategoryController.findById);
router.get('/outcome/category/filter', lib.route.toHttps, outcomeCategoryController.filter);
router.delete('/outcome/category/id/:id', lib.route.toHttps, outcomeCategoryController.delete);

router.post('/outcome/origin/save', lib.route.toHttps, outcomeOriginController.save);
router.get('/outcome/origin/id/:id', lib.route.toHttps, outcomeOriginController.findById);
router.get('/outcome/origin/category_id/:id', lib.route.toHttps, outcomeOriginController.findByCategoryId);
router.get('/outcome/origin/filter', lib.route.toHttps, outcomeOriginController.filter);
router.delete('/outcome/origin/id/:id', lib.route.toHttps, outcomeOriginController.delete);

router.post('/outcome/origin/payment/save', lib.route.toHttps, outcomeOriginController.payment.save);
router.get('/outcome/origin/payment/filter', lib.route.toHttps, outcomeOriginController.payment.filter);
router.get('/outcome/origin/payment/id/:id', lib.route.toHttps, outcomeOriginController.payment.findById);
router.delete('/outcome/origin/payment/id/:id', lib.route.toHttps, outcomeOriginController.payment.delete);

router.get('/expense', lib.route.toHttps, expenseController.index);
router.get('/expense/manage', lib.route.toHttps, expenseController.manage);
router.get('/expense/payment', lib.route.toHttps, expenseController.payment);
router.post('/expense/save', lib.route.toHttps, expenseController.save);
router.get('/expense/id/:id', lib.route.toHttps, expenseController.findById);
router.post('/expense/filter', lib.route.toHttps, expenseController.filter);
router.put('/expense/confirm', lib.route.toHttps, expenseController.confirm);
router.put('/expense/pay', lib.route.toHttps, expenseController.pay);
router.put('/expense/cancel/id/:id', lib.route.toHttps, expenseController.cancel);

module.exports = router;