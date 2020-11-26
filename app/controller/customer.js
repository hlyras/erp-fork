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
			cnpj: req.body.cnpj,
			email: req.body.email,
			phone: req.body.phone
		};

		if(!customer.id){
			let row = await Customer.save(customer);
			customer.id = row.insertId;
			res.send({ done: "Cliente cadastrado com sucesso!", customer });
		} else {

		};
	}
};

module.exports = customerController;