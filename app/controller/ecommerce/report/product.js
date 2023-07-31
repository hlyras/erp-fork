const lib = require("jarmlib");

const User = require('../../../model/user');
const userController = require('./../../user/main');

const Sale = require('../../../model/ecommerce/sale');
const Product = require('../../../model/product/main');

const productController = {};

productController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass', 'sto-man'])) {
    return res.redirect('/');
  };
  let colors = await Product.color.list();
  let users = await User.list();
  res.render('ecommerce/report/product/index', { user: req.user, users: users, colors: colors });
};

productController.filter = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-ass', 'adm-aud', 'pro-man', 'log-pac', 'pro-ass', 'sto-man'])) {
    return res.send({ unauthorized: "Você não tem permissão para acessar!" });
  };

  let period = { key: "packing_datetime", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
  let params = { keys: [], values: [] }
  let strict_params = { keys: [], values: [] }

  let product_props = ["ecommerce_sale.id",
    "product.code",
    "product.name",
    "product.color",
    "product.size",
    "ecommerce_sale_product.product_id",
    "ecommerce_sale_product.amount"
  ];

  let package_product_props = ["ecommerce_sale.id",
    "product.code",
    "product.name",
    "product.color",
    "product.size",
    "ecommerce_sale_package_product.product_id",
    "ecommerce_sale_package_product.amount"
  ];

  let product_inners = [
    ["cms_wt_erp.ecommerce_sale_product ecommerce_sale_product", "cms_wt_erp.ecommerce_sale.id", "cms_wt_erp.ecommerce_sale_product.sale_id"],
    ["cms_wt_erp.product product", "cms_wt_erp.product.id", "cms_wt_erp.ecommerce_sale_product.product_id"]
  ];

  let package_product_inners = [
    ["cms_wt_erp.ecommerce_sale_package_product ecommerce_sale_package_product", "cms_wt_erp.ecommerce_sale.id", "cms_wt_erp.ecommerce_sale_package_product.sale_id"],
    ["cms_wt_erp.product product", "cms_wt_erp.product.id", "cms_wt_erp.ecommerce_sale_package_product.product_id"]
  ];

  lib.Query.fillParam("origin", req.body.sale.origin, params);
  lib.Query.fillParam("product.name", req.body.sale.product_name, params);
  lib.Query.fillParam("product.color", req.body.sale.product_color, params);
  lib.Query.fillParam("ecommerce_sale.status", req.body.sale.status, strict_params);

  let order_params = [["ecommerce_sale.id", "DESC"]];
  let limit = 0;

  try {
    let sale_products = await Sale.filter(product_props, product_inners, period, params, strict_params, order_params, limit);
    let sale_package_products = await Sale.filter(package_product_props, package_product_inners, period, params, strict_params, order_params, limit);
    res.send({ sale_products: sale_products, sale_package_products: sale_package_products });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

module.exports = productController;