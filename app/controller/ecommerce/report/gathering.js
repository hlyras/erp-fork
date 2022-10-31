const lib = require("jarmlib");

const User = require('../../../model/user');
const userController = require('./../../user');

const Sale = require('../../../model/ecommerce/sale');

const gatheringController = {};

gatheringController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass', 'adm-man', 'log-pac'])) {
    return res.redirect('/');
  };

  let users = await User.list();
  res.render('ecommerce/report/gathering/index', { user: req.user, users: users });
};

gatheringController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'adm-aud', 'pro-man', 'log-pac', 'pro-ass', 'log-pac'])) {
    return res.send({ unauthorized: "Você não tem permissão para acessar!" });
  };

  let period = { key: "date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
  let strict_params = { keys: [], values: [] }

  lib.Query.fillParam("cms_wt_erp.ecommerce_sale.origin", req.body.sale.origin, strict_params);
  lib.Query.fillParam("cms_wt_erp.ecommerce_sale.status", req.body.sale.status, strict_params);
  lib.Query.fillParam("cms_wt_erp.ecommerce_sale.user_id", req.body.sale.user_id, strict_params);

  let order_params = [["ecommerce_sale.date", "DESC"]];

  try {
    let sale_gatherings = await Sale.filter([], [], period, [], strict_params, order_params, 0);
    res.send({ sale_gatherings });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

module.exports = gatheringController;