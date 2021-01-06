const db = require('../../config/connection');

const Customer = function(){
	this.id;
	this.name;
	this.trademark;
	this.cnpj;
	this.email;
	this.phone;
	this.password;
	this.access = 'ctm'
};

Customer.save = (customer) => {
	let query = "INSERT INTO cms_wt_erp.customer (person_type, name, cpf, trademark, brand, cnpj, ie, social_media, email, phone, cellphone, password) values ('"
        +customer.person_type+"', '"
        +customer.name+"', '"
        +customer.cpf+"', '"
        +customer.trademark+"', '"
        +customer.brand+"', '"
        +customer.cnpj+"', '"
        +customer.ie+"', '"
        +customer.social_media+"', '"
        +customer.email+"', '"
        +customer.phone+"', '"
        +customer.cellphone+"', '"
        +customer.password+"')";
    return db(query);
};

Customer.update = async (customer) => {
	let query = "UPDATE cms_wt_erp.customer SET id='"+customer.id
		+"', name='"+customer.name
		+"', cpf='"+customer.cpf
		+"', trademark='"+customer.trademark
		+"', brand='"+customer.brand
		+"', cnpj='"+customer.cnpj
		+"', ie='"+customer.ie
		+"', social_media='"+customer.social_media
		+"', email='"+customer.email
		+"', phone='"+customer.phone
		+"', cellphone='"+customer.cellphone
		+"', password='"+customer.password+"' WHERE id='"+customer.id+"';";
	return db(query);
};

Customer.findBy = {
	id: id => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE id='"+ id +"';";
		return db(query);
	},
	trademark: trademark => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE trademark='"+ trademark +"';";
		return db(query);
	},
	cnpj: cnpj => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE cnpj like '%"+ cnpj +"%';";
		return db(query);
	}
};

Customer.filter = customer => {
	let query = "SELECT * FROM cms_wt_erp.customer WHERE name like '%"+customer.name
		+"%' OR trademark like '%"+customer.trademark
		+"%' OR ie like '%"+customer.ie
		+"%' OR brand like '%"+customer.brand+"%';";
	return db(query);
};

Customer.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.customer WHERE id='"+id+"';";
	return db(query);
};

Customer.adress = {
	add: async (customer_adress) => {
		let query = "INSERT INTO cms_wt_erp.customer_adress (customer_id, postal_code, street, number, complement, neighborhood, city, state) VALUES ('"
			+customer_adress.customer_id+"', '"
			+customer_adress.postal_code+"', '"
			+customer_adress.street+"', '"
			+customer_adress.number+"', '"
			+customer_adress.complement+"', '"
			+customer_adress.neighborhood+"', '"
			+customer_adress.city+"', '"
			+customer_adress.state+"');";
		return db(query);
	},
	findBy: {
		customer_id: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.customer_adress WHERE customer_id='"+id+"';";
			return db(query);
		}
	}
};

module.exports = Customer;