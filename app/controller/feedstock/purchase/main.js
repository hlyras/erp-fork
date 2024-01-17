const userController = require('./../../user/main');

const lib = require("jarmlib");

const FeedstockSupplier = require('../../../model/feedstock/supplier/main');
const FeedstockPurchase = require('../../../model/feedstock/purchase/main');
const FeedstockPurchaseFeedstock = require('../../../model/feedstock/purchase/feedstock');
const { response } = require('express');

const purchaseController = {};

purchaseController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	try {
		let suppliers = await FeedstockSupplier.filter({});
		res.render('feedstock/purchase/index', { user: req.user, suppliers });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

purchaseController.manage = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	try {
		let suppliers = await FeedstockSupplier.filter({});
		res.render('feedstock/purchase/manage/index', { user: req.user, suppliers });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

purchaseController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	let purchase = new FeedstockPurchase();
	purchase.id = req.body.id;
	purchase.date = lib.date.timestamp.generate();
	purchase.status = req.body.status;
	purchase.supplier_id = req.body.supplier_id;
	purchase.payment_method = req.body.payment_method;
	purchase.value = parseFloat(req.body.value);
	purchase.shipment_value = parseFloat(req.body.shipment_value);
	purchase.discount_value = parseFloat(req.body.discount_value);
	purchase.total_value = parseFloat(req.body.total_value);
	purchase.user_id = req.user.id;
	purchase.feedstocks = JSON.parse(req.body.feedstocks);

	if (!purchase.status) { return res.send({ msg: "Por favor preencha o status da compra." }) }
	if (!purchase.payment_method) { return res.send({ msg: "Por favor preencha o método de pagamento da compra." }); }
	if (isNaN(parseFloat(purchase.value))) { return res.send({ msg: "O Valor das matérias-primas é inválido." }); }
	if (isNaN(parseFloat(purchase.shipment_value))) { return res.send({ msg: "Valor do frete é inválido." }); }
	if (isNaN(parseFloat(purchase.discount_value))) { return res.send({ msg: "Valor do desconto é inválido." }); }
	if (isNaN(parseFloat(purchase.total_value))) { return res.send({ msg: "Valor da venda é inválido." }); }

	try {
		if (!purchase.id) {
			let create_response = await purchase.create();
			if (create_response.err) { return res.send({ msg: response.err }); }

			purchase.feedstocks.forEach(async feedstock => {
				let purchase_feedstock = new FeedstockPurchaseFeedstock();
				purchase_feedstock.purchase_id = saved_purchase.insertId;
				purchase_feedstock.feedstock_id = feedstock.feedstock_id;
				purchase_feedstock.price = feedstock.price;
				purchase_feedstock.amount = feedstock.amount;
				await purchase_feedstock.create();
			});

			res.send({ done: 'Compra cadastrada sucesso!' });
		} else {
			purchase.feedstock_actions = { add: [], update: [], remove: [] };

			let strict_params = { keys: [], values: [] };
			lib.Query.fillParam("purchase_feedstock.purchase_id", purchase.id, strict_params);
			let purchase_feedstocks = await FeedstockPurchaseFeedstock.filter({ strict_params });

			purchase.feedstocks = purchase_feedstocks.reduce((feedstocks, feedstock) => {
				for (let i in feedstocks) { if (feedstocks[i].feedstock_id == feedstock.feedstock_id) { return feedstocks; } };
				purchase.feedstock_actions.remove.push(feedstock);
				return feedstocks;
			}, purchase.feedstocks);

			purchase_feedstocks = purchase.feedstocks.reduce((feedstocks, feedstock) => {
				for (let i in feedstocks) { if (feedstocks[i].feedstock_id == feedstock.feedstock_id) { purchase.feedstock_actions.update.push(feedstock); return feedstocks; }; };
				purchase.feedstock_actions.add.push(feedstock);
				return feedstocks;
			}, purchase_feedstocks);

			//add feedstocks
			for (let i in purchase.feedstock_actions.add) {
				let purchase_feedstock = new FeedstockPurchaseFeedstock();
				purchase_feedstock.purchase_id = purchase.id;
				purchase_feedstock.feedstock_id = purchase.feedstock_actions.add[i].feedstock_id;
				purchase_feedstock.price = purchase.feedstock_actions.add[i].price;
				purchase_feedstock.amount = purchase.feedstock_actions.add[i].amount;
				await purchase_feedstock.create();
			};

			//update feedstocks
			for (let i in purchase.feedstock_actions.update) {
				let purchase_feedstock = new FeedstockPurchaseFeedstock();
				purchase_feedstock.purchase_id = purchase.id;
				purchase_feedstock.feedstock_id = purchase.feedstock_actions.update[i].feedstock_id;
				purchase_feedstock.price = purchase.feedstock_actions.update[i].price;
				purchase_feedstock.amount = purchase.feedstock_actions.update[i].amount;
				await purchase_feedstock.update();
			};

			//remove feedstocks
			for (let i in purchase.feedstock_actions.remove) {
				await FeedstockPurchaseFeedstock.remove(purchase.feedstock_actions.remove[i]);
			};

			await purchase.update();
			res.send({ done: 'Compra atualizada com sucesso!' });
		}
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima, favor contatar o suporte" });
	};
};

purchaseController.update = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const purchase = new FeedstockPurchase();
	purchase.id = req.body.id;
	purchase.value = req.body.value;
	purchase.total_value = req.body.total_value;
	purchase.shipment_value = req.body.shipment_value;
	purchase.discount_value = req.body.discount_value;
	purchase.addition_value = req.body.addition_value;
	purchase.status = req.body.status;
	purchase.payment_method = req.body.payment_method;

	try {
		const response = await purchase.update();
		if (response.err) { return res.send({ msg: response.err }); }

		res.send({ done: "Matéria-prima atualizada com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima." });
	}
};

purchaseController.confirm = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};


};

purchaseController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let props = [
		"purchase.*",
		"supplier.cnpj supplier_cnpj",
		"supplier.brand supplier_brand",
		"supplier.name supplier_name",
		"supplier.trademark supplier_trademark",
		"supplier.phone supplier_phone",
		"supplier.origin_id",
		"outcome_origin.category_id origin_category_id",
		"user.name user_name",
		"confirmation_user.name confirmation_user_name"
	];

	let inners = [
		["cms_wt_erp.feedstock_supplier supplier", "supplier.id", "purchase.supplier_id"],
		["cms_wt_erp.user", "user.id", "purchase.user_id"],
		["cms_wt_erp.financial_outcome_origin outcome_origin", "outcome_origin.id", "supplier.origin_id"]
	];

	let lefts = [
		["cms_wt_erp.user confirmation_user", "confirmation_user.id", "purchase.user_id"]
	];

	let period = { key: "date", start: req.body.period_start, end: req.body.period_end };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("purchase.id", req.body.id, strict_params);
	lib.Query.fillParam("purchase.supplier_id", req.body.supplier_id, strict_params);
	lib.Query.fillParam("purchase.status", req.body.status, strict_params);

	let order_params = [["purchase.date", "DESC"]];

	try {
		let purchases = await FeedstockPurchase.filter({ props, inners, lefts, period, strict_params, order_params });
		res.send({ purchases });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

purchaseController.update = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	const purchase = new FeedstockPurchase();
	purchase.id = req.body.id;
	purchase.status = req.body.status;

	try {
		let update_response = await purchase.update();
		if (update_response.err) { return res.send({ msg: update_response.err }); }

		res.send({ done: 'Compra atualizada com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

purchaseController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		let strict_params = { keys: [], values: [] };
		lib.Query.fillParam("purchase.id", req.params.id, strict_params);
		let purchase = await FeedstockPurchase.filter({ strict_params });

		if (purchase[0].status == "Em orçamento") {
			await FeedstockPurchase.delete(req.params.id);
			await FeedstockPurchaseFeedstock.deleteByPurchaseId(req.params.id);
			res.send({ done: 'Compra excluída com sucesso!' });
		} else {
			res.send({ done: 'Não é possível excluir compras após serem confirmadas.' });
		}
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

purchaseController.checkout = {};

purchaseController.checkout.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	try {
		let suppliers = await FeedstockSupplier.filter({});
		res.render('feedstock/purchase/checkout/index', { user: req.user, suppliers });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

purchaseController.checkout.confirm = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	console.log('req.body', req.body);

	let purchase = new FeedstockPurchase();
	purchase.id = req.body.purchase_id;
	purchase.payment_method = req.body.payment_method;
	purchase.status = "Ag. recebimento";
	purchase.confirmation_date = lib.date.timestamp.generate();
	purchase.confirmation_user_id = req.user.id;
	purchase.expenses = req.body.expenses;

	if (!purchase.payment_method) { return res.send({ msg: "É necessário informar o método de pagamento." }); }

	try {
		let update_response = await purchase.update();
		if (update_response.err) { return res.send({ msg: update_response.err }); }

		if (!purchase.expenses) { return res.send({ done: "Pedido confirmado!" }); }

		for (let i in purchase.expenses) {
			console.log(`purchase.expenses[${i}]`, purchase.expenses[i]);
		};

		res.send({ done: "Pedido atualizado!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima." });
	}
};

module.exports = purchaseController;