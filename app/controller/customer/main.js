const userController = require('./../user');
const Customer = require('../../model/customer/main');
const Rank = require('../../model/customer/rank');
const Sale = require('../../model/sale/main');

const lib = require("jarmlib");

const customerController = {};

customerController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man',"com-ass",'com-sel','adm-aud'])){
		return res.redirect('/');
	};
	res.render('customer/index', { user: req.user });
};

customerController.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man',"com-ass",'com-sel','adm-aud'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let customer = {
		id: req.body.id,
		person_type: req.body.person_type,
		name: req.body.name,
		cpf: req.body.cpf,
		trademark: req.body.trademark,
		brand: req.body.brand,
		cnpj: req.body.cnpj,
		ie: req.body.ie,
		social_media: req.body.social_media,
		email: req.body.email,
		phone: req.body.phone,
		cellphone: req.body.cellphone,
		password: "$2a$10$6sLFnGfJE05trUMtF1Cpm.f.h6lwOg6cSW3E0D0IrDXjEi7F1yV06"
	};
	
	if(customer.person_type != "legal-entity" && customer.person_type != "natural-person"){ return res.send({ msg: "A pessoa do cliente é inválida, favor recarregar a página, caso o problema persista favor contatar o suporte." }); };
	if(!customer.name && !customer.trademark && !customer.brand){ return res.send({ msg: "É necessário identificar o cliente" }); };
	if(customer.person_type == "natural-person"){ if(!customer.cpf || customer.cpf.length != 11 || isNaN(customer.cpf)){ return res.send({ msg: "CPF inválido." }) }; };
	if(customer.trademark.length > 100){ return res.send({ msg: "Razão social inválida." }); };
	if(customer.brand.length > 100){ return res.send({ msg: "Nome Fantasia inválido." }); };
	if(customer.person_type == "legal-entity"){ if(!customer.cnpj || customer.cnpj.length < 14 || isNaN(customer.cnpj)){ return res.send({ msg: "CNPJ inválido." }) }; };
	if(customer.ie.length > 20){ return res.send({ msg: "Inscrição Estadual inválida." }); };
	if(customer.email.length > 100){ return res.send({ msg: "E-mail inválido." }); };
	if(customer.phone.length > 13){ return res.send({ msg: "Telefone inválido." }); };
	if(customer.cellphone.length > 13){ return res.send({ msg: "Celular inválido." }); };

	try {
		if(!customer.id){
			if(customer.cpf){ 
				let cpf = await Customer.findBy.cpf(customer.cpf); 
				if(cpf.length){ return res.send({ msg: "Este CPF já está cadastrado." }); };
			};

			if(customer.cnpj){ 
				let cnpj = await Customer.findBy.cnpj(customer.cnpj);
				if(cnpj.length){ return res.send({ msg: "Este CNPJ já está cadastrado." }); };
			};
			
			let row = await Customer.save(customer);
			customer.id = row.insertId;
			res.send({ done: "Cliente cadastrado com sucesso!", customer });
		} else {
			if(customer.cpf){
				let cpf = await Customer.findBy.cpf(customer.cpf);
				if(cpf.length){
					if(cpf[0].id != customer.id){
						return res.send({ msg: 'Este CPF já está cadastrado.' });
					};
				};
			};

			if(customer.cnpj){
				let cnpj = await Customer.findBy.cnpj(customer.cnpj);
				if(cnpj.length){
					if(cnpj[0].id != customer.id){
						return res.send({ msg: 'Este CNPJ já está cadastrado.' });
					};
				};
			};

			let row = await Customer.update(customer);
			customer.id = row.insertId;
			res.send({ done: "Cliente atualizado com sucesso!", customer });
		};
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
	};
};

customerController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man',"com-ass",'com-sel','adm-aud'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let customer = {
		id: req.body.id,
		name: req.body.name,
		cpf: req.body.cpf,
		cnpj: req.body.cnpj,
		brand: req.body.brand,
		trademark: req.body.trademark
	};

	let params = { keys: [], values: [] };
	let strictParams = { keys: [], values: [] };
	
	lib.Query.fillParam("customer.id", customer.id, params);
	lib.Query.fillParam("customer.name", customer.name, params);
	lib.Query.fillParam("customer.cpf", customer.cpf, params);
	lib.Query.fillParam("customer.cnpj", customer.cnpj, params);
	lib.Query.fillParam("customer.brand", customer.brand, params);
	lib.Query.fillParam("customer.trademark", customer.trademark, params);
	
	let orderParams = [ ["id","ASC"] ];

	try {
		const customers = await Customer.filter([], [], params, [], orderParams);
		res.send({ customers });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
	};
};

customerController.findById = async (req, res) => {
	try {
		const customer = await Customer.findBy.id(req.params.id);
		res.send({ customer });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

customerController.show = async (req, res) => {
	const paymentDate = {
		key: "payment_confirmation_date",
		start: (new Date().getTime()) - (lib.date.timestamp.day() * 90),
		end: new Date().getTime()
	};

	const period = { key: paymentDate.key, start: paymentDate.start, end: paymentDate.end };
	const strict_params = { keys: [], values: [] }
	lib.Query.fillParam("sale.customer_id", req.params.id, strict_params);
	const order_params = [ ["id", "DESC"] ];

	try {
		let customer = await Customer.findBy.id(req.params.id);
		customer[0].address = await Customer.address.findBy.customer_id(req.params.id);
		
		let sales = await Sale.filter([], [], period, [], strict_params, order_params, 0);
		const saleStatistics = { totalValue: 0 };
		
		for(let i in sales) { saleStatistics.totalValue += parseFloat(sales[i].value); };
		
		for(let i in Rank) {
			if(parseFloat(saleStatistics.totalValue) >= Rank[i].min_value && parseFloat(saleStatistics.totalValue) <= Rank[i].max_value) {
				customer[0].rank = Rank[i];
			};
		};

		res.send({ customer });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

customerController.delete = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Customer.delete(req.query.id);
		res.send({ done: 'Cliente excluído com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
	};
};

module.exports = customerController;