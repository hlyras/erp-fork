const userController = require('./user');
const Customer = require('../model/customer');

const customerController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man','com-sel', "adm-aud"])){
			return res.redirect('/');
		};
		res.render('customer/index', { user: req.user });
	},
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man','com-sel', "adm-aud"])){
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
			cellphone: req.body.cellphone
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
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man','com-sel', "adm-aud"])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let customer = {
			name: req.query.name,
			trademark: req.query.trademark,
			brand: req.query.brand,
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
	show: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };

		try {
			let customer = await Customer.findBy.id(req.params.id);
			customer[0].address = await Customer.address.findBy.customer_id(req.params.id);

			res.send({ customer });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
		};
	},
	delete: async (req, res) => {
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
	},
	address: {
		save: async(req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man','com-sel', "adm-aud"])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			let customer_address = {
				id: parseInt(req.body.id),
				customer_id: req.body.customer_id,
				postal_code: req.body.postal_code,
				street: req.body.street,
				number: parseInt(req.body.number),
				complement: req.body.complement,
				neighborhood: req.body.neighborhood,
				city: req.body.city,
				state: req.body.state
			};

			if(!customer_address.customer_id || isNaN(customer_address.customer_id)){ return res.send({ msg: "Algo deu errado, recarregue a página, caso o problema persista favor contatar o suporte." }); };
			if(!customer_address.postal_code || customer_address.postal_code.length != 8 || isNaN(customer_address.postal_code)){ return res.send({ msg: "CEP inválido." }); };
			if(!customer_address.street){ return res.send({ msg: "Logradouro inválido." }); };
			if(!customer_address.number){ return res.send({ msg: "Número inválido." }); };
			if(!customer_address.neighborhood){ return res.send({ msg: "Bairro inválido." }); };
			if(!customer_address.city){ return res.send({ msg: "Cidade inválida." }); };
			if(!customer_address.state){ return res.send({ msg: "Estado inválido." }); };

			try {
				if(!customer_address.id){
					await Customer.address.save(customer_address);
					return res.send({ done: "Endereço cadastrado com sucesso!", customer_address: customer_address });
				} else {
					await Customer.address.update(customer_address);
					return res.send({ done: "Endereço atualizado com sucesso!", customer_address: customer_address });
				};
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar o endereço, favor contatar o suporte." });
			};
		},
		findById: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man','com-sel', "adm-aud"])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				let customer_address = await Customer.address.findBy.id(req.params.id);
				res.send({ customer_address });
			} catch (err){
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
			};
		},
		list: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man','com-sel', "adm-aud"])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				let addresses = await Customer.address.findBy.customer_id(req.params.customer_id);
				res.send({ addresses });
			} catch (err){
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
			};
		},
		delete: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','com-man','com-sel', "adm-aud"])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Customer.address.delete(req.query.id);
				res.send({ done: 'Endereço excluído com sucesso!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover o endereço, favor entrar em contato com o suporte." });
			};
		}
	}
};

module.exports = customerController;