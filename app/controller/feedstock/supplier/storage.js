const User = require('../../../model/user');
const userController = require('./../../user');

const lib = require("jarmlib");

const Feedstock = require('../../../model/feedstock/main');
Feedstock.supplier = require('../../../model/feedstock/supplier');
// const Product = require('../../../model/product/main');
// Product.color = require('../../../model/product/color');

const storageController = {
	open: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.redirect('/');
		};

		//Supplier
		let supplier_strict_params = { keys: [], values: [] };
		lib.Query.fillParam("supplier.id", req.params.id, supplier_strict_params);

		//Storage
		let storage_props = ["supplier_storage.*", "feedstock.*", "color.name color_name"];
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
	}
};

module.exports = storageController;