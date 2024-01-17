const userController = require('./../user/main');
const OutcomeCategory = require('../../model/financial/outcome/category');
const IncomeCategory = require('../../model/financial/income/category');

const financialController = {};

financialController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.redirect('/');
  };

  try {
    const incomeCategories = await IncomeCategory.filter({});
    const outcomeCategories = await OutcomeCategory.filter({});

    res.render('admin/financial/manage/index', { user: req.user, incomeCategories, outcomeCategories });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro, favor contatar o suporte" });
  }
};

financialController.income = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.redirect('/');
  };

  const incomeCategories = await IncomeCategory.list();

  res.render('admin/financial/income/index', { user: req.user, incomeCategories });
};

financialController.outcome = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'fin-ass'])) {
    return res.redirect('/');
  };

  const outcomeCategories = await OutcomeCategory.filter({});

  res.render('admin/financial/outcome/index', { user: req.user, outcomeCategories });
};

module.exports = financialController;