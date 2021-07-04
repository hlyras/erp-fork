const router = require("express").Router();
const lib = require('../../config/lib');

const financialController = require('../controller/financial');
const expenseController = require('../controller/expense');

//API ROUTES
router.get('/index', lib.routeToHttps, financialController.index);

// ------------------
// income routes
// ------------------

router.post('/balance', lib.routeToHttps, financialController.balance);

router.get('/income', lib.routeToHttps, financialController.income);
router.post('/income/save', lib.routeToHttps, financialController.incomeSave);
router.get('/income/id/:id', lib.routeToHttps, financialController.incomeFindById);
router.post('/income/filter', lib.routeToHttps, financialController.incomeFilter);
router.post('/incomecategory/save', lib.routeToHttps, financialController.incomeCategorySave);
router.get('/incomecategory/filter', lib.routeToHttps, financialController.incomeCategoryFilter);
router.get('/incomecategory/list', lib.routeToHttps, financialController.incomeCategoryList);
router.post('/incomeorigin/save', lib.routeToHttps, financialController.incomeOriginSave);
router.get('/incomeorigin/filterbycategory', lib.routeToHttps, financialController.incomeOriginFilterByCategory);
router.get('/incomeorigin/filter', lib.routeToHttps, financialController.incomeOriginFilter);
// router.get('/incomecategory/list', lib.routeToHttps, financialController.incomeCategoryList);
router.delete('/incomecategory/remove', lib.routeToHttps, financialController.incomeCategoryRemove);
router.delete('/incomeorigin/remove', lib.routeToHttps, financialController.incomeOriginRemove);

// ------------------
// outcome routes
// ------------------

router.get('/outcome', lib.routeToHttps, financialController.outcome);
router.post('/outcome/save', lib.routeToHttps, financialController.outcomeSave);
router.get('/outcome/id/:id', lib.routeToHttps, financialController.outcomeFindById);
router.post('/outcome/filter', lib.routeToHttps, financialController.outcomeFilter);
router.delete('/outcome/delete', lib.routeToHttps, financialController.outcomeDelete);

router.post('/outcomecategory/save', lib.routeToHttps, financialController.outcomeCategorySave);
router.get('/outcomecategory/filter', lib.routeToHttps, financialController.outcomeCategoryFilter);
router.get('/outcomecategory/list', lib.routeToHttps, financialController.outcomeCategoryList);
router.post('/outcomeorigin/save', lib.routeToHttps, financialController.outcomeOriginSave);
router.get('/outcomeorigin/filterbycategory', lib.routeToHttps, financialController.outcomeOriginFilterByCategory);
router.get('/outcomeorigin/filter', lib.routeToHttps, financialController.outcomeOriginFilter);
// router.get('/outcomecategory/list', lib.routeToHttps, financialController.outcomeCategoryList);
router.delete('/outcomecategory/remove', lib.routeToHttps, financialController.outcomeCategoryRemove);
router.delete('/outcomeorigin/remove', lib.routeToHttps, financialController.outcomeOriginRemove);

router.get('/expense', lib.routeToHttps, expenseController.index);

module.exports = router;