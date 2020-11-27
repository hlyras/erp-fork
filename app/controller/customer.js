const userController = require('./user');
const Customer = require('../model/customer');

const customerController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('customer/index', { user: req.user });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		let customer = {
			id: req.body.id,
			name: req.body.name,
			trademark: req.body.trademark,
			brand: req.body.brand,
			cnpj: req.body.cnpj,
			email: req.body.email,
			phone: req.body.phone,
			cellphone: req.body.cellphone
		};

		try {
			if(!customer.id){
				let row = await Customer.save(customer);
				customer.id = row.insertId;
				res.send({ done: "Cliente cadastrado com sucesso!", customer });
			} else {

			};
		} catch (err) {
			console.log(err);
			if(err.code == "ER_DUP_ENTRY"){
				res.send({ msg: "Este CNPJ já está cadastrado." });
			} else {
				res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
			};
		};
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};

		let customer = {
			name: req.query.name,
			trademark: req.query.trademark,
			cnpj: req.query.cnpj
		};

		if(isNaN(customer.cnpj) || customer.cnpj < 0 || customer.cnpj > 99999999999999){
			customer.cnpj = "";
		};

		try {
			if(customer.cnpj){
				const customers = await Customer.findBy.cnpj(customer.cnpj);
				res.send({ customers });
			} else {
				const customers = await Customer.filter(customer);
				res.send({ customers });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
		};
	}
};

module.exports = customerController;