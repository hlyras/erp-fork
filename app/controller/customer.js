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
			ie: req.body.ie,
			social_media: req.body.social_media,
			email: req.body.email,
			phone: req.body.phone,
			cellphone: req.body.cellphone
		};

		console.log(customer);

		if(!customer.name && !customer.trademark && !customer.brand){ return res.send({ msg: "É necessário identificar o cliente" }); };
		if(customer.trademark.length > 100){ return res.send({ msg: "Razão social inválida." }); };
		if(customer.brand.length > 100){ return res.send({ msg: "Nome Fantasia inválido." }); };
		if(!customer.cnpj || customer.cnpj.length < 11 || customer.cnpj.length > 14){ return res.send({ msg: "CNPJ inválido." }) };
		if(customer.ie.length > 100){ return res.send({ msg: "Inscrição Estadual inválida." }); };
		if(customer.email.length > 100){ return res.send({ msg: "E-mail inválido." }); };
		if(customer.phone.length > 13){ return res.send({ msg: "Telefone inválido." }); };
		if(customer.cellphone.length > 13){ return res.send({ msg: "Celular inválido." }); };

		try {
			if(!customer.id){
				let row = await Customer.save(customer);
				customer.id = row.insertId;
				res.send({ done: "Cliente cadastrado com sucesso!", customer });
			} else {
				let row = await Customer.update(customer);
				customer.id = row.insertId;
				res.send({ done: "Cliente atualizado com sucesso!", customer });
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
			cnpj: req.query.cnpj,
			ie: req.query.ie
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
	},
	findById: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			const customer = await Customer.findBy.id(req.params.id);
			res.send({ customer });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
		};
	},
	delete: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			await Customer.delete(req.query.id);
			res.send({ done: 'Cliente excluído com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
		};
	}
};

module.exports = customerController;