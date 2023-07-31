const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Feedstock = require('../../../model/feedstock/main');
Feedstock.purchase = require('../../../model/feedstock/purchase');

const purchaseFeedstockController = {};

purchaseFeedstockController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let props = [
		"purchase_feedstock.*",
		"feedstock.*",
		"color.name color_name"
	];

	let inners = [
		["cms_wt_erp.feedstock feedstock", "feedstock.id", "purchase_feedstock.feedstock_id"],
		["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"]
	];

	let period = { key: "date", start: req.body.period_start, end: req.body.period_end };
	let params = { keys: [], values: [] };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("purchase_feedstock.id", req.body.id, strict_params);
	lib.Query.fillParam("purchase_feedstock.purchase_id", req.body.purchase_id, strict_params);
	lib.Query.fillParam("purchase_feedstock.feedstock_id", req.body.feedstock_id, strict_params);
	lib.Query.fillParam("purchase_feedstock.supplier_id", req.body.supplier_id, strict_params);
	lib.Query.fillParam("feedstock.name", req.body.feedstock_name, params);
	lib.Query.fillParam("feedstock.color", req.body.feedstock_color, params);

	let order_params = [["feedstock.code", "ASC"]];

	try {
		let feedstocks = await Feedstock.purchase.feedstock.filter(props, inners, period, params, strict_params, order_params);
		res.send({ feedstocks });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

module.exports = purchaseFeedstockController;