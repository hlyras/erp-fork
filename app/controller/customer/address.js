const userController = require('./../user/main');
const Customer = require('../../model/customer/main');

const addressController = {};

addressController.save = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', 'com-sel', 'com-ass', 'adm-aud'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let customer_address = {
		id: parseInt(req.body.id),
		customer_id: req.body.customer_id,
		postal_code: req.body.postal_code,
		street: req.body.street,
		number: req.body.number,
		complement: req.body.complement,
		neighborhood: req.body.neighborhood,
		city: req.body.city,
		state: req.body.state
	};

	if (!customer_address.customer_id || isNaN(customer_address.customer_id)) { return res.send({ msg: "Algo deu errado, recarregue a página, caso o problema persista favor contatar o suporte." }); };
	if (!customer_address.postal_code || customer_address.postal_code.length != 8 || isNaN(customer_address.postal_code)) { return res.send({ msg: "CEP inválido." }); };
	if (!customer_address.street) { return res.send({ msg: "Logradouro inválido." }); };
	if (!customer_address.number) { return res.send({ msg: "Número inválido." }); };
	if (!customer_address.neighborhood) { return res.send({ msg: "Bairro inválido." }); };
	if (!customer_address.city) { return res.send({ msg: "Cidade inválida." }); };
	if (!customer_address.state) { return res.send({ msg: "Estado inválido." }); };

	try {
		if (!customer_address.id) {
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
};

addressController.findById = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', 'com-sel', 'com-ass', 'adm-aud', "fin-ass"])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		let customer_address = await Customer.address.findBy.id(req.params.id);
		res.send({ customer_address });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

addressController.list = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', 'com-sel', 'com-ass', 'adm-aud', "fin-ass"])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		let addresses = await Customer.address.findBy.customer_id(req.params.customer_id);
		res.send({ addresses });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar produto, favor contatar o suporte." });
	};
};

addressController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'adm-man', 'adm-ass', 'com-man', 'com-sel', 'com-ass', 'adm-aud'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		await Customer.address.delete(req.query.id);
		res.send({ done: 'Endereço excluído com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao remover o endereço, favor entrar em contato com o suporte." });
	};
};

module.exports = addressController;