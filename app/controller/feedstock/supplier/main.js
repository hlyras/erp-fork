const User = require('../../../model/user');
const userController = require('./../../user');

const lib = require("jarmlib");

const Feedstock = require('../../../model/feedstock/main');
Feedstock.supplier = require('../../../model/feedstock/supplier');
// const Product = require('../../../model/product/main');
// Product.color = require('../../../model/product/color');

const supplierController = {
	manage: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.redirect('/');
		};

		res.render('feedstock/supplier/manage', { user: req.user });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.redirect('/');
		};

		let supplier = new Feedstock.supplier();

		supplier.id = req.body.id;
		supplier.cnpj = req.body.cnpj;
		supplier.trademark = req.body.trademark;
		supplier.brand = req.body.brand;
		supplier.name = req.body.name;
		supplier.phone = req.body.phone;

		try {
			if(!supplier.id){
				await supplier.save();
				res.send({ done: 'Fornecedor cadastrado com sucesso!' });
			} else {
				await supplier.update();
				res.send({ done: 'Fornecedor atualizado com sucesso!' });
			}
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar a matéria-prima, favor contatar o suporte" });
		};
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let props = [];
		let inners = [];

		let params = { keys: [], values: [] };		
		let strict_params = { keys: [], values: [] };

		lib.Query.fillParam("supplier.cnpj", req.body.supplier.cnpj, params);
		lib.Query.fillParam("supplier.trademark", req.body.supplier.trademark, params);
		lib.Query.fillParam("supplier.brand", req.body.supplier.brand, params);
		lib.Query.fillParam("supplier.name", req.body.supplier.name, params);

		let order_params = [ ["supplier.id","ASC"] ];

		try {
			let suppliers = await Feedstock.supplier.filter(props, inners, params, strict_params, order_params);
			res.send({ suppliers });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let props = []; let inners = [];
		let params = { keys: [], values: [] };		
		let strict_params = { keys: [], values: [] };

		lib.Query.fillParam("supplier.id", req.params.id, strict_params);

		let order_params = [ ["supplier.id","ASC"] ];

		try {
			let supplier = await Feedstock.supplier.filter(props, inners, params, strict_params, order_params);
			res.send({ supplier });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as matérias, favor contatar o suporte" });
		};
	}
};

module.exports = supplierController;