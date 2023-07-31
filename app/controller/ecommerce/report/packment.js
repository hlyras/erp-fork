const lib = require("jarmlib");

const User = require('../../../model/user');
const userController = require('./../../user/main');

const Sale = require('../../../model/ecommerce/sale');

const packmentController = {};

packmentController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass', 'log-pac'])) {
    return res.redirect('/');
  };

  let users = await User.list();
  res.render('ecommerce/report/packment/index', { user: req.user, users: users });
};

packmentController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'adm-aud', 'pro-man', 'log-pac', 'pro-ass'])) {
    return res.send({ unauthorized: "Você não tem permissão para acessar!" });
  };

  let period = { key: "packing_datetime", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
  let params = { keys: [], values: [] }
  let strict_params = { keys: [], values: [] }

  let props = ["ecommerce_sale.id",
    "ecommerce_sale.packing_user_id",
    "ecommerce_sale.packing_user_name"
  ];

  let inners = [];

  lib.Query.fillParam("cms_wt_erp.ecommerce_sale.packing_user_id", req.body.sale.packment_user_id, strict_params);

  let order_params = [["ecommerce_sale.id", "DESC"]];
  let limit = 0;

  try {
    let sale_packments = await Sale.filter(props, inners, period, params, strict_params, order_params, limit);
    res.send({ sale_packments });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

module.exports = packmentController;