const User = require('../../model/user');
const userController = require('./../user/main');

const lib = require("jarmlib");

const Production = require('../../model/production/main');
Production.product = require('../../model/production/product');

const Product = require('../../model/product/main');
Product.feedstock = require('../../model/product/feedstock/main');

const Outcome = require('../../model/financial/outcome');

const preparationController = {};

preparationController.index = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ["adm", 'pro-man'])) {
    return res.redirect('/');
  };

  const internal_strict_params = { keys: [], values: [] };
  lib.Query.fillParam("outcome_origin.category_id", 1, internal_strict_params);
  lib.Query.fillParam("outcome_origin.role_id", 1, internal_strict_params);

  const external_strict_params = { keys: [], values: [] };
  lib.Query.fillParam("outcome_origin.category_id", 10, external_strict_params);

  try {
    let internal_seamstresses = await Outcome.origin.filter([], [], internal_strict_params, [['name', 'ASC']]);
    let external_seamstresses = await Outcome.origin.filter([], [], external_strict_params, [['name', 'ASC']]);
    res.render('production/preparation/index', { user: req.user, internal_seamstresses, external_seamstresses });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar requisição." });
  };
};

preparationController.print = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'pro-ass', 'log-pac'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  // Production
  let production_props = ["production.*", "outcome_origin.name seamstress_name"];
  let production_inners = [
    ["cms_wt_erp.financial_outcome_origin outcome_origin", "outcome_origin.id", "production.seamstress_id"]
  ];
  let production_strict_params = { keys: [], values: [] };
  lib.Query.fillParam("production.id", req.params.id, production_strict_params);

  // Production product
  let product_props = ["production_product.*", "product.code", "product.name", "product.color", "product.size"];
  let product_inners = [
    ["cms_wt_erp.product", "production_product.product_id", "product.id"]
  ];
  let product_strict_params = { keys: [], values: [] };
  lib.Query.fillParam("production_product.production_id", req.params.id, product_strict_params);

  try {
    const production = (await Production.filter(production_props, production_inners, [], [], production_strict_params, [], 0))[0];
    production.date = lib.date.timestamp.toDate(production.date).split(" ")[0];
    production.preparation_deadline = lib.date.timestamp.toDate(production.preparation_deadline).split(" ")[0];
    production.datetime = lib.date.timestamp.toDate(production.datetime).split(" ")[0];

    production.products = await Production.product.filter(product_props, product_inners, [], product_strict_params, []);

    for (let i in production.products) {
      let feedstock_props = [
        "product_feedstock.*",
        "feedstock.code", "feedstock.name", "product_color.name color", "feedstock.uom"
      ];

      let feedstock_inners = [
        ["cms_wt_erp.feedstock", "feedstock.id", "product_feedstock.feedstock_id"],
        ["cms_wt_erp.product_color", "product_color.id", "feedstock.color_id"]
      ];

      let feedstock_strict_params = { keys: [], values: [] };
      lib.Query.fillParam("product_feedstock.product_id", production.products[i].product_id, feedstock_strict_params);

      let feedstocks = await Product.feedstock.filter(feedstock_props, feedstock_inners, [], feedstock_strict_params, []);

      production.products[i].feedstocks = feedstocks.reduce((arr, feedstock) => {
        for (let j in arr) {
          if (feedstock.feedstock_id == arr[j].feedstock_id) {
            if (feedstock.uom == "cm") {
              arr[j].totalMeasure += (feedstock.measure * feedstock.amount) * production.products[i].amount;
            } else {
              arr[j].totalAmount += parseInt(feedstock.amount) * production.products[i].amount;
            }
            return arr;
          }
        };

        if (feedstock.uom == "cm") {
          feedstock.totalMeasure = (feedstock.measure * feedstock.amount) * production.products[i].amount;
        } else {
          feedstock.totalAmount = feedstock.amount * production.products[i].amount;
        }

        arr.push(feedstock);

        return arr;
      }, []);
    };

    res.render('production/preparation/print', { user: req.user, production });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
  };
};

preparationController.confirm = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
  };

  let production = new Production();
  production.id = req.body.id;
  production.preparation_user_id = req.user.id;
  production.preparation_datetime = lib.date.timestamp.generate();
  production.preparation_volume = req.body.preparation_volume;

  if (!production.preparation_volume || isNaN(production.preparation_volume)) { res.send({ msg: "É necessário informar os volumes." }); }

  try {
    let production_location = (await Production.findById(production.id))[0].location;

    if (production_location == "Interna") { production.status = "Ag. produção" }
    if (production_location == "Externa") { production.status = "Ag. envio" }

    let response = await production.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Preparação confirmada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
  };
};

module.exports = preparationController;