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

  let product_options = {
    props: ["ecommerce_sale.id",
      "product.code",
      "product.name",
      "product.color",
      "product.size",
      "ecommerce_sale_product.product_id",
      "ecommerce_sale_product.amount"
    ],
    inners: [
      ["cms_wt_erp.ecommerce_sale_product ecommerce_sale_product", "cms_wt_erp.ecommerce_sale.id", "cms_wt_erp.ecommerce_sale_product.sale_id"],
      ["cms_wt_erp.product product", "cms_wt_erp.product.id", "cms_wt_erp.ecommerce_sale_product.product_id"]
    ],
    period: { key: "packing_datetime", start: req.body.sale.periodStart, end: req.body.sale.periodEnd },
    params: { keys: [], values: [] },
    strict_params: { keys: [], values: [] }
  };

  let package_options = {
    props: ["ecommerce_sale.id",
      "product.code",
      "product.name",
      "product.color",
      "product.size",
      "ecommerce_sale_package_product.product_id",
      "ecommerce_sale_package_product.amount"
    ],
    inners: [
      ["cms_wt_erp.ecommerce_sale_package_product ecommerce_sale_package_product", "cms_wt_erp.ecommerce_sale.id", "cms_wt_erp.ecommerce_sale_package_product.sale_id"],
      ["cms_wt_erp.product product", "cms_wt_erp.product.id", "cms_wt_erp.ecommerce_sale_package_product.product_id"]
    ],
    period: { key: "packing_datetime", start: req.body.sale.periodStart, end: req.body.sale.periodEnd },
    params: { keys: [], values: [] },
    strict_params: { keys: [], values: [] }
  };

  lib.Query.fillParam("origin", req.body.sale.origin, product_options.params);
  lib.Query.fillParam("product.name", req.body.sale.product_name, product_options.params);
  lib.Query.fillParam("product.color", req.body.sale.product_color, product_options.params);
  lib.Query.fillParam("ecommerce_sale.status", req.body.sale.status, product_options.strict_params);

  lib.Query.fillParam("origin", req.body.sale.origin, package_options.params);
  lib.Query.fillParam("product.name", req.body.sale.product_name, package_options.params);
  lib.Query.fillParam("product.color", req.body.sale.product_color, package_options.params);
  lib.Query.fillParam("ecommerce_sale.status", req.body.sale.status, package_options.strict_params);

  try {
    let sale_products = await Sale.filter(product_options);
    let sale_package_products = await Sale.filter(package_options);
    res.send({ sale_products: sale_products, sale_package_products: sale_package_products });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

module.exports = productController;