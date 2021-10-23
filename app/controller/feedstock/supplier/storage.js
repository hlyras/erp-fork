const User = require('../../../model/user');
const userController = require('./../../user');

const lib = require("jarmlib");

const Feedstock = require('../../../model/feedstock/main');
Feedstock.supplier = require('../../../model/feedstock/supplier');
// const Product = require('../../../model/product/main');
// Product.color = require('../../../model/product/color');

const storageController = {};

storageController.open = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm', 'pro-man','man'])){
		return res.redirect('/');
	};

	//Supplier
	let supplier_strict_params = { keys: [], values: [] };
	lib.Query.fillParam("supplier.id", req.params.id, supplier_strict_params);

	//Storage
	let storage_props = [	"supplier_storage.*",
		"feedstock.code",
		"feedstock.name",
		"feedstock.unit",
		"feedstock.uom",
		"color.name color_name"
	];
	let storage_inners = [
		["cms_wt_erp.feedstock feedstock", "feedstock.id", "supplier_storage.feedstock_id"],
		["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"]
	];
	let storage_strict_params = { keys: [], values: [] };
	lib.Query.fillParam("supplier_storage.supplier_id", req.params.id, storage_strict_params);
	let storage_order_params = [ ["feedstock.code","ASC"] ];

	try {
		let supplier = await Feedstock.supplier.filter([],[],[], supplier_strict_params, []);
		supplier[0].storage = await Feedstock.supplier.storage.filter(storage_props, storage_inners, [], storage_strict_params, storage_order_params);
		
		res.send({ supplier });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

storageController.add = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm', 'pro-man','man'])){
		return res.redirect('/');
	};

	let insert = {
		supplier_id: req.body.supplier_id,
		feedstock_id: req.body.feedstock_id,
		price: req.body.price
	};

	let storage_strict_params = { keys: [], values: [] };
	lib.Query.fillParam("supplier_storage.supplier_id", insert.supplier_id, storage_strict_params);
	lib.Query.fillParam("supplier_storage.feedstock_id", insert.feedstock_id, storage_strict_params);

	try {
		let feedstocks = await Feedstock.supplier.storage.filter([], [], [], storage_strict_params, []);
		if(feedstocks.length) { console.log(feedstocks); return res.send({ msg: "Esta matéria-prima já está inserida no catálogo!\n \n Atualize o preço ao invés de incluir novamente!" }); }

		await Feedstock.supplier.storage.add(insert);
		res.send({ done: "Matéria-prima adicionada com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

storageController.update = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm', 'pro-man','man'])){
		return res.redirect('/');
	};

	let feedstock = {
		id: req.body.id,
		price: req.body.price
	};

	try {
		await Feedstock.supplier.storage.update(feedstock);
		res.send({ done: "Matéria-prima atualizada com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};

storageController.remove = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Feedstock.supplier.storage.remove(req.params.id);
		res.send({ done: 'Matéria-prima removida com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

storageController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm', 'pro-man', 'man'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let props = [
		"supplier_storage.*",
		"feedstock.code",
		"feedstock.name",
		"feedstock.unit",
		"feedstock.uom",
		"color.name color_name"
	];
	let inners = [ 
		["cms_wt_erp.feedstock feedstock","feedstock.id","supplier_storage.feedstock_id"],
		["cms_wt_erp.product_color color", "color.id", "feedstock.color_id"]
	];

	let params = { keys: [], values: [] };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("supplier_storage.supplier_id", req.body.supplier_id, strict_params);
	lib.Query.fillParam("feedstock.code", req.body.code, strict_params);
	lib.Query.fillParam("feedstock.name", req.body.name, params);
	lib.Query.fillParam("feedstock.color_id", req.body.color_id, strict_params);

	let order_params = [ ["feedstock.code","ASC"] ];

	try {
		let feedstocks = await Feedstock.supplier.storage.filter(props, inners, params, strict_params, order_params);
		res.send({ feedstocks });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
	};
};


module.exports = storageController;