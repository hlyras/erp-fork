const db = require('../../../config/connection');
const lib = require("jarmlib");

const Customer = function () {
	this.id;
	this.person_type;
	this.name;
	this.cpf;
	this.trademark;
	this.brand;
	this.cnpj;
	this.ie;
	this.social_media;
	this.email;
	this.phone;
	this.cellphone;
	this.password;

	this.save = () => {
		if (this.person_type != "legal-entity" && this.person_type != "natural-person") { return { err: "A pessoa do cliente é inválida, favor recarregar a página, caso o problema persista favor contatar o suporte." }; };
		if (!this.name && !this.trademark && !this.brand) { return { err: "É necessário identificar a natureza do cliente" }; };
		if (this.person_type == "natural-person") { if (!this.cpf || this.cpf.length != 11 || isNaN(this.cpf)) { return { err: "CPF inválido." } }; };
		if (this.trademark.length > 100) { return { err: "Razão social inválida." }; };
		if (this.brand.length > 100) { return { err: "Nome Fantasia inválido." }; };
		if (this.person_type == "legal-entity") { if (!this.cnpj || this.cnpj.length < 14 || isNaN(this.cnpj)) { return { err: "CNPJ inválido." } }; };
		if (this.ie.length > 20) { return { err: "Inscrição Estadual inválida." }; };
		if (this.email.length > 100) { return { err: "E-mail inválido." }; };
		if (this.phone.length > 13) { return { err: "Telefone inválido." }; };
		if (this.cellphone.length > 13) { return { err: "Celular inválido." }; };

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.save(obj, 'cms_wt_erp.customer');

		console.log(query, values);

		return db(query, values);
	};

	this.update = () => {
		if (!this.id) { return { err: "O id do cliente é inválido" }; }

		let obj = lib.convertTo.object(this);
		let { query, values } = lib.Query.update(obj, 'cms_wt_erp.customer', 'id');

		console.log(query, values);

		return db(query, values);
	};
};

Customer.findBy = {
	id: id => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE id='" + id + "';";
		return db(query);
	},
	trademark: trademark => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE trademark='" + trademark + "';";
		return db(query);
	},
	cpf: cpf => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE cpf like '%" + cpf + "%';";
		return db(query);
	},
	cnpj: cnpj => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE cnpj like '%" + cnpj + "%';";
		return db(query);
	}
};

Customer.filter = (props, inners, params, strict_params, order_params) => {
	let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.customer customer")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build();
	return db(query, values);
};

Customer.adFilter = (props, inners, period, params, strict_params, order_params) => {
	let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.customer customer")
		.inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).build();
	return db({ query, values });
};

Customer.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.customer WHERE id='" + id + "';";
	return db(query);
};

Customer.address = {
	save: async (address) => {
		let query = "INSERT INTO cms_wt_erp.customer_address (customer_id, postal_code, street, number, complement, neighborhood, city, state) VALUES ('"
			+ address.customer_id + "', '"
			+ address.postal_code + "', '"
			+ address.street + "', '"
			+ address.number + "', '"
			+ address.complement + "', '"
			+ address.neighborhood + "', '"
			+ address.city + "', '"
			+ address.state + "');";
		return db(query);
	},
	update: async (address) => {
		let query = "UPDATE cms_wt_erp.customer_address SET postal_code='" + address.postal_code
			+ "', street='" + address.street
			+ "', number='" + address.number
			+ "', complement='" + address.complement
			+ "', neighborhood='" + address.neighborhood
			+ "', city='" + address.city
			+ "', state='" + address.state + "' WHERE id='" + address.id + "';";
		return db(query);
	},
	delete: async (id) => {
		let query = "DELETE FROM cms_wt_erp.customer_address WHERE id='" + id + "';";
		return db(query);
	},
	findBy: {
		id: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.customer_address WHERE id='" + id + "';";
			return db(query);
		},
		customer_id: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.customer_address WHERE customer_id='" + id + "';";
			return db(query);
		}
	}
};

Customer.mailer = {
	pf: {
		signout: async (customer) => {
			let query = "UPDATE cms_wt_erp.customer SET mailer='0' WHERE id='" + customer.id
				+ "' && cpf='" + customer.cpf + "';";
			return db(query);
		}
	},
	pj: {
		signout: async (customer) => {
			let query = "UPDATE cms_wt_erp.customer SET mailer='0' WHERE id='" + customer.id
				+ "' && cnpj='" + customer.cnpj + "';";
			return db(query);
		}
	},
	filter: (customer) => {
		let query = "";
		if (customer.id) {
			query = "SELECT customer.id, customer.name, customer.cellphone, customer.phone, customer.email, customer.mailer, customer.mailer_datetime, customer.mailer_user_id FROM cms_wt_erp.customer WHERE mailer_datetime < " + customer.mailer_datetime + " AND mailer = " + customer.mailer + " AND id = " + customer.id + ";";
		} else {
			query = "SELECT customer.id, customer.name, customer.cellphone, customer.phone, customer.email, customer.mailer, customer.mailer_datetime, customer.mailer_user_id FROM cms_wt_erp.customer WHERE mailer_datetime < " + customer.mailer_datetime + " AND mailer = " + customer.mailer + ";";
		}
		return db(query);
	},
	setDatetime: (customer) => {
		let query = "UPDATE cms_wt_erp.customer SET mailer_datetime='" + customer.mailer_datetime + "', mailer_user_id='" + customer.mailer_user_id + "' WHERE id='" + customer.id + "';";
		return db(query);
	}
};

module.exports = Customer;