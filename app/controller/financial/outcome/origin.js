const userController = require('./../../user');
const Outcome = require('../../../model/financial/outcome');

const lib = require("jarmlib");

const originController = {
	save: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		let origin = new Outcome.origin();
		origin.id = parseInt(req.body.origin.id);
		origin.category_id = parseInt(req.body.origin.category_id);
		origin.name = req.body.origin.name;

		if(!origin.name){ return res.send({ msg: "É necessário identificar a categoria." }); };

		try {
			if(!origin.id){
				let row = await origin.save();
				origin.id = row.insertId;
				res.send({ done: "Origem cadastrada com sucesso!", origin });
			} else {
				let row = await origin.update();
				origin.id = row.insertId;
				res.send({ done: "Origem atualizada com sucesso!", origin });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
		};
	},
	filter: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','pro-man','fin-man'])){
			return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		};

		let props = [];
		let params = { keys: [], values: [] }
		let strict_params = { keys: [], values: [] }
		
		lib.Query.fillParam("outcome_origin.category_id", req.query.category_id, strict_params);
		lib.Query.fillParam("outcome_origin.name", req.query.name, params);

		let order_params = [ ["outcome_origin.name","ASC"] ];

		try {
			let categories = await Outcome.origin.filter(props, params, strict_params, order_params);
			res.send({ categories });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
		};
	},
	findById: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','pro-man','fin-man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const origin = await Outcome.origin.findById(req.params.id);
			res.send({ origin });
		} catch (err){
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
		};
	},
	findByCategoryId: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm','pro-man','fin-man'])){
			return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		};

		try {
			const origins = await Outcome.origin.findByCategoryId(req.params.id);
			res.send({ origins });
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
			await Outcome.origin.delete(req.params.id);
			res.send({ done: 'Origem excluída com sucesso!' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
		};
	},
	payment: {
		save: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			let payment = new Outcome.origin.payment();
			payment.id = req.body.payment.id;
			payment.origin_id = req.body.payment.origin_id;
			payment.method = req.body.payment.method;
			payment.user_id = req.user.id;

			if(payment.method == "Pix"){
				payment.pix_receiver = req.body.payment.pix_receiver;
				payment.pix_key = req.body.payment.pix_key;
			} else if(payment.method == "Transferência bancária"){
				payment.transfer_receiver = req.body.payment.transfer_receiver;
				payment.transfer_register = req.body.payment.transfer_register;
				payment.transfer_bank = req.body.payment.transfer_bank;
				payment.transfer_agency = req.body.payment.transfer_agency;
				payment.transfer_account = req.body.payment.transfer_account;
				payment.transfer_account_type = req.body.payment.transfer_account_type;
			}

			if(!payment.origin_id){ return res.send({ msg: "É necessário identificar a origem." }); };
			if(!payment.method){ return res.send({ msg: "É necessário identificar o método de pagamento." }); };

			if(payment.method == "Pix") {
				if(!payment.pix_receiver){ return res.send({ msg: "É necessário identificar o recebedor do Pix." }); };
				if(!payment.pix_key){ return res.send({ msg: "É necessário identificar a chave do Pix." }); };
			} else if(payment.method == "Transferência bancária") {
				if(!payment.transfer_receiver){ return res.send({ msg: "É necessário identificar o recebedor do pagamento." }); };
				if(!payment.transfer_register){ return res.send({ msg: "É necessário identificar o registro do recebedor (CPF ou CNPJ)." }); };
				if(!payment.transfer_bank){ return res.send({ msg: "É necessário identificar o banco do recebedor." }); };
				if(!payment.transfer_agency){ return res.send({ msg: "É necessário identificar a agência." }); };
				if(!payment.transfer_account){ return res.send({ msg: "É necessário identificar a conta." }); };
				if(!payment.transfer_account_type){ return res.send({ msg: "É necessário identificar o tipo de conta." }); };
			}

			try {
				if(!payment.id){
					let row = await payment.save();
					payment.id = row.insertId;
					res.send({ done: "Pagamento cadastrado com sucesso!", payment });
				} else {
					let row = await payment.update();
					payment.id = row.insertId;
					res.send({ done: "Pagamento atualizado com sucesso!", payment });
				};
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao cadastrar o cliente. Código do erro" });
			};
		},
		filter: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','pro-man','fin-man'])){
				return res.send({ unauthorized: "Você não tem permissão para acessar!" });
			};

			let props = [];
			let params = { keys: [], values: [] }
			let strict_params = { keys: [], values: [] }
			
			lib.Query.fillParam("outcome_origin_payment.origin_id", req.query.origin_id, strict_params);

			let order_params = [ ["outcome_origin_payment.id", "ASC"] ];

			try {
				let payments = await Outcome.origin.payment.filter(props, params, strict_params, order_params);
				res.send({ payments });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
			};
		},
		findById: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','pro-man','fin-man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				const payment = await Outcome.origin.payment.findById(req.params.id);
				res.send({ payment });
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
				await Outcome.origin.payment.delete(req.params.id);
				res.send({ done: 'Pagamento excluído com sucesso!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
			};
		}
	}
};

module.exports = originController;