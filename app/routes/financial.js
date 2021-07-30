const router = require("express").Router();
const lib = require('../../config/lib');

const financialController = require('../controller/financial/main');

const incomeController = require('../controller/financial/income/main');
const incomeCategoryController = require('../controller/financial/income/category');
const incomeOriginController = require('../controller/financial/income/origin');

const outcomeController = require('../controller/financial/outcome/main');
const outcomeCategoryController = require('../controller/financial/outcome/category');
const outcomeOriginController = require('../controller/financial/outcome/origin');

const expenseController = require('../controller/financial/expense/main');

//API ROUTES
router.get('/index', lib.routeToHttps, financialController.index);

router.post('/balance', lib.routeToHttps, financialController.balance);
// ------------------
// income routes
// ------------------

router.get('/income', lib.routeToHttps, incomeController.index);
router.post('/income/save', lib.routeToHttps, incomeController.save);
router.get('/income/filter', lib.routeToHttps, incomeController.filter);
router.get('/income/id/:id', lib.routeToHttps, incomeController.findById);
router.delete('/income/delete/id/:id', lib.routeToHttps, incomeController.delete);

router.post('/income/category/save', lib.routeToHttps, incomeCategoryController.save);
router.get('/income/category/id/:id', lib.routeToHttps, incomeCategoryController.findById);
router.get('/income/category/filter', lib.routeToHttps, incomeCategoryController.filter);
router.delete('/income/category/id/:id', lib.routeToHttps, incomeCategoryController.delete);

router.post('/income/origin/save', lib.routeToHttps, incomeOriginController.save);
router.get('/income/origin/id/:id', lib.routeToHttps, incomeOriginController.findById);
router.get('/income/origin/category_id/:id', lib.routeToHttps, incomeOriginController.findByCategoryId);
router.get('/income/origin/filter', lib.routeToHttps, incomeOriginController.filter);
router.delete('/income/origin/id/:id', lib.routeToHttps, incomeOriginController.delete);

// // ------------------
// // outcome routes
// // ------------------

router.get('/outcome', lib.routeToHttps, outcomeController.index);

router.get('/outcome', lib.routeToHttps, outcomeController.index);
router.post('/outcome/save', lib.routeToHttps, outcomeController.save);
router.get('/outcome/id/:id', lib.routeToHttps, outcomeController.findById);
router.post('/outcome/filter', lib.routeToHttps, outcomeController.filter);
router.delete('/outcome/delete/id/:id', lib.routeToHttps, outcomeController.delete);

router.post('/outcome/category/save', lib.routeToHttps, outcomeCategoryController.save);
router.get('/outcome/category/id/:id', lib.routeToHttps, outcomeCategoryController.findById);
router.get('/outcome/category/filter', lib.routeToHttps, outcomeCategoryController.filter);
router.delete('/outcome/category/id/:id', lib.routeToHttps, outcomeCategoryController.delete);

router.post('/outcome/origin/save', lib.routeToHttps, outcomeOriginController.save);
router.get('/outcome/origin/id/:id', lib.routeToHttps, outcomeOriginController.findById);
router.get('/outcome/origin/category_id/:id', lib.routeToHttps, outcomeOriginController.findByCategoryId);
router.get('/outcome/origin/filter', lib.routeToHttps, outcomeOriginController.filter);
router.delete('/outcome/origin/id/:id', lib.routeToHttps, outcomeOriginController.delete);

router.post('/outcome/origin/payment/save', lib.routeToHttps, outcomeOriginController.payment.save);
router.get('/outcome/origin/payment/filter', lib.routeToHttps, outcomeOriginController.payment.filter);
router.get('/outcome/origin/payment/id/:id', lib.routeToHttps, outcomeOriginController.payment.findById);
router.delete('/outcome/origin/payment/id/:id', lib.routeToHttps, outcomeOriginController.payment.delete);

router.get('/expense', lib.routeToHttps, expenseController.index);
router.get('/expense/manage', lib.routeToHttps, expenseController.manage);
router.get('/expense/payment', lib.routeToHttps, expenseController.payment);
router.post('/expense/save', lib.routeToHttps, expenseController.save);
router.get('/expense/id/:id', lib.routeToHttps, expenseController.findById);
router.post('/expense/filter', lib.routeToHttps, expenseController.filter);
router.put('/expense/confirm', lib.routeToHttps, expenseController.confirm);
router.put('/expense/pay', lib.routeToHttps, expenseController.pay);
router.put('/expense/cancel/id/:id', lib.routeToHttps, expenseController.cancel);

module.exports = router;