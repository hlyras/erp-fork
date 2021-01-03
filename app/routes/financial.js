const router = require("express").Router();

const financialController = require('../controller/financial');

//API ROUTES
router.get('/index', financialController.index);

// ------------------
// income routes
// ------------------

router.post('/balance', financialController.balance);

router.get('/income', financialController.income);
router.post('/income/save', financialController.incomeSave);
router.get('/income/id/:id', financialController.incomeFindById);
router.post('/income/filter', financialController.incomeFilter);
router.post('/incomecategory/save', financialController.incomeCategorySave);
router.get('/incomecategory/filter', financialController.incomeCategoryFilter);
router.get('/incomecategory/list', financialController.incomeCategoryList);
router.post('/incomeorigin/save', financialController.incomeOriginSave);
router.get('/incomeorigin/filterbycategory', financialController.incomeOriginFilterByCategory);
router.get('/incomeorigin/filter', financialController.incomeOriginFilter);
// router.get('/incomecategory/list', financialController.incomeCategoryList);
router.delete('/incomecategory/remove', financialController.incomeCategoryRemove);
router.delete('/incomeorigin/remove', financialController.incomeOriginRemove);

// ------------------
// outcome routes
// ------------------

router.get('/outcome', financialController.outcome);
router.post('/outcome/save', financialController.outcomeSave);
router.get('/outcome/id/:id', financialController.outcomeFindById);
router.post('/outcome/filter', financialController.outcomeFilter);
router.delete('/outcome/delete', financialController.outcomeDelete);

router.post('/outcomecategory/save', financialController.outcomeCategorySave);
router.get('/outcomecategory/filter', financialController.outcomeCategoryFilter);
router.get('/outcomecategory/list', financialController.outcomeCategoryList);
router.post('/outcomeorigin/save', financialController.outcomeOriginSave);
router.get('/outcomeorigin/filterbycategory', financialController.outcomeOriginFilterByCategory);
router.get('/outcomeorigin/filter', financialController.outcomeOriginFilter);
// router.get('/outcomecategory/list', financialController.outcomeCategoryList);
router.delete('/outcomecategory/remove', financialController.outcomeCategoryRemove);
router.delete('/outcomeorigin/remove', financialController.outcomeOriginRemove);

module.exports = router;