const lib = require("jarmlib");

const userController = require('./../../user/main');

const FeedstockPurchaseFeedstock = require('../../../model/feedstock/purchase/feedstock');

const feedstockController = {};

feedstockController.update = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const purchase_feedstock = new FeedstockPurchaseFeedstock();
	purchase_feedstock.id = req.body.id;
	purchase_feedstock.price = req.body.price;
	purchase_feedstock.amount = req.body.amount;
	purchase_feedstock.receipt_datetime = lib.date.timestamp.generate();
	purchase_feedstock.receipt_amount = req.body.receipt_amount;
	purchase_feedstock.receipt_amount && (purchase_feedstock.receipt_user_id = req.user.id);

	try {
		const response = await purchase_feedstock.update();
		if (response.err) { return res.send({ msg: response.err }); }

		res.send({ done: "Matéria-prima atualizada com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima." });
	}
};

feedstockController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let props = [
		"purchase_feedstock.*",
		"feedstock.id feedstock_id", "feedstock.code", "feedstock.name", "feedstock.unit", "feedstock.uom", "feedstock.supplier_id",
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
		let feedstocks = await FeedstockPurchaseFeedstock.filter({ props, inners, period, params, strict_params, order_params });
		res.send({ feedstocks });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

module.exports = feedstockController;