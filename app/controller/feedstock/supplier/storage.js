const User = require('../../../model/user');
const userController = require('./../../user/main');

const lib = require("jarmlib");

const FeedstockSupplier = require('../../../model/feedstock/supplier/main');
const FeedstockSupplierStorage = require('../../../model/feedstock/supplier/storage');

const storageController = {};

storageController.open = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.redirect('/');
	};

	const supplier_options = {
		strict_params: { keys: [], values: [] }
	};
	lib.Query.fillParam("supplier.id", req.params.id, supplier_options.strict_params);

	const storage_options = {
		props: ["supplier_storage.*",
			"feedstock.code",
			"feedstock.name",
			"feedstock.unit",
			"feedstock.uom",
			"color.name color_name"
		],
		inners: [
			["cms_wt_erp.feedstock feedstock", "feedstock.id", "supplier_storage.feedstock_id"],
			["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"]
		],
		strict_params: { keys: [], values: [] },
		order_params: [["feedstock.code", "ASC"]]
	};
	lib.Query.fillParam("supplier_storage.supplier_id", req.params.id, storage_options.strict_params);

	try {
		let supplier = await FeedstockSupplier.filter(supplier_options);
		supplier[0].storage = await FeedstockSupplierStorage.filter(storage_options);

		res.send({ supplier });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

storageController.create = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])) {
		return res.redirect('/');
	};

	let storage = new FeedstockSupplierStorage();
	storage.supplier_id = req.body.supplier_id;
	storage.feedstock_id = req.body.feedstock_id;
	storage.price = req.body.price;

	let strict_params = { keys: [], values: [] };
	lib.Query.fillParam("supplier_storage.supplier_id", storage.supplier_id, strict_params);
	lib.Query.fillParam("supplier_storage.feedstock_id", storage.feedstock_id, strict_params);

	try {
		let feedstocks = await FeedstockSupplierStorage.filter({ strict_params });
		if (feedstocks.length) { return res.send({ msg: "Esta matéria-prima já está inserida no catálogo!\n \n Atualize o preço ao invés de incluir novamente!" }); }

		let create_response = await storage.create();
		if (create_response.err) { return res.send({ msg: create_response }); }

		res.send({ done: "Matéria-prima adicionada com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

storageController.filter = async (req, res) => {
	let props = [
		"supplier_storage.*",
		"feedstock.code",
		"feedstock.name",
		"feedstock.unit",
		"feedstock.uom",
		"color.name color_name",
		"supplier.name supplier_name",
		"supplier.brand supplier_brand",
		"supplier.trademark supplier_trademark"
	];
	let inners = [
		["cms_wt_erp.feedstock feedstock", "feedstock.id", "supplier_storage.feedstock_id"],
		["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"],
		["cms_wt_erp.feedstock_supplier supplier", "supplier.id", "supplier_storage.supplier_id"]
	];

	let params = { keys: [], values: [] };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("supplier_storage.id", req.body.id, strict_params);
	lib.Query.fillParam("supplier_storage.supplier_id", req.body.supplier_id, strict_params);
	lib.Query.fillParam("feedstock.code", req.body.code, strict_params);
	lib.Query.fillParam("feedstock.name", req.body.name, params);
	lib.Query.fillParam("feedstock.color_id", req.body.color_id, strict_params);
	lib.Query.fillParam("supplier_storage.feedstock_id", req.body.feedstock_id, strict_params);

	let order_params = [["feedstock.code", "ASC"]];

	try {
		let storages = await FeedstockSupplierStorage.filter({ props, inners, params, strict_params, order_params });

		res.send({ storages });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

storageController.update = async (req, res) => {
	const storage = new FeedstockSupplierStorage();
	storage.id = req.body.id;
	storage.price = req.body.price;

	try {
		let storage_response = await storage.update();
		if (storage_response.err) { return res.send({ msg: storage_response.err }); }

		res.send({ done: "Matéria-prima atualizada com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

storageController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'pro-man'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await FeedstockSupplierStorage.delete(req.params.id);
		res.send({ done: 'Matéria-prima removida com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

module.exports = storageController;