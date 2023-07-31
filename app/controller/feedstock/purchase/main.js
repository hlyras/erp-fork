const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const Feedstock = require('../../../model/feedstock/main');
Feedstock.supplier = require('../../../model/feedstock/supplier');
Feedstock.purchase = require('../../../model/feedstock/purchase');

const purchaseController = {};

purchaseController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	try {
		let suppliers = await Feedstock.supplier.filter([], [], [], [], []);
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
		let suppliers = await Feedstock.supplier.filter([], [], [], [], []);
		res.render('feedstock/purchase/manage', { user: req.user, suppliers });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

purchaseController.save = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.redirect('/');
	};

	let purchase = new Feedstock.purchase();
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
			let saved_purchase = await purchase.save();

			purchase.feedstocks.forEach(async feedstock => {
				let item = new Feedstock.purchase.feedstock();
				item.purchase_id = saved_purchase.insertId;
				item.feedstock_id = feedstock.feedstock_id;
				item.price = feedstock.price;
				item.amount = feedstock.amount;
				await item.add();
			});

			res.send({ done: 'Compra cadastrada sucesso!' });
		} else {
			purchase.feedstock_actions = { add: [], update: [], remove: [] };

			let strict_params = { keys: [], values: [] };
			lib.Query.fillParam("purchase_feedstock.purchase_id", purchase.id, strict_params);
			let purchase_feedstocks = await Feedstock.purchase.feedstock.filter([], [], [], [], strict_params, []);

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
				let item = new Feedstock.purchase.feedstock();
				item.purchase_id = purchase.id;
				item.feedstock_id = purchase.feedstock_actions.add[i].feedstock_id;
				item.price = purchase.feedstock_actions.add[i].price;
				item.amount = purchase.feedstock_actions.add[i].amount;
				await item.add();
			};

			//update feedstocks
			for (let i in purchase.feedstock_actions.update) {
				let item = new Feedstock.purchase.feedstock();
				item.purchase_id = purchase.id;
				item.feedstock_id = purchase.feedstock_actions.update[i].feedstock_id;
				item.price = purchase.feedstock_actions.update[i].price;
				item.amount = purchase.feedstock_actions.update[i].amount;
				await item.update();
			};

			//remove feedstocks
			for (let i in purchase.feedstock_actions.remove) {
				await Feedstock.purchase.feedstock.remove(purchase.feedstock_actions.remove[i]);
			};

			await purchase.update();
			res.send({ done: 'Compra atualizada com sucesso!' });
		}
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima, favor contatar o suporte" });
	};
};

purchaseController.filter = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};
	//139561143
	let props = [
		"purchase.*",
		"supplier.cnpj supplier_cnpj",
		"supplier.brand supplier_brand",
		"supplier.name supplier_name",
		"supplier.trademark supplier_trademark",
		"supplier.phone supplier_phone",
		"user.name user_name"
	];

	let inners = [
		["cms_wt_erp.feedstock_supplier supplier", "supplier.id", "purchase.supplier_id"],
		["cms_wt_erp.user user", "user.id", "purchase.user_id"]
	];

	let period = { key: "date", start: req.body.period_start, end: req.body.period_end };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("purchase.id", req.body.id, strict_params);
	lib.Query.fillParam("purchase.supplier_id", req.body.supplier_id, strict_params);

	let order_params = [["purchase.date", "DESC"]];

	try {
		let purchases = await Feedstock.purchase.filter(props, inners, period, [], strict_params, order_params);
		res.send({ purchases });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

purchaseController.updateStatus = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Feedstock.purchase.updateStatus(req.body.id, req.body.status);
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
		let purchase = await Feedstock.purchase.filter([], [], [], [], strict_params, []);

		if (purchase[0].status == "Em orçamento") {
			await Feedstock.purchase.delete(req.params.id);
			await Feedstock.purchase.feedstock.deleteByPurchaseId(req.params.id);
			res.send({ done: 'Compra excluída com sucesso!' });
		} else {
			res.send({ done: 'Não é possível excluir compras após serem confirmadas.' });
		}
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

module.exports = purchaseController;