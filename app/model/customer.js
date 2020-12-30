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

// User.updateName = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET name='"+user.name+"' WHERE id='"+user.id+"';";
// 	// let query = "UPDATE cms_wt_erp.user SET name='"+user.name+"', name='"+user.name+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.updateEmail = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET email='"+user.email+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.updatePassword = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET password='"+user.password+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.updateDepartment = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET department='"+user.department+"', role='"+user.role+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.list = () => {
// 	let query = "SELECT * FROM cms_wt_erp.user;";
// 	return db(query);
// };

// User.findById = (id) => {
// 	let query = "SELECT * FROM cms_wt_erp.user WHERE id='"+id+"';";
// 	return db(query);
// };

// User.findByUsername = (user) => {
// 	let query = "SELECT * FROM cms_wt_erp.user WHERE username='"+user.username+"';";
// 	return db(query);
// };

// User.findByEmail = (email) => {
// 	let query = "SELECT * FROM cms_wt_erp.user WHERE email='"+email+"';";
// 	return db(query);
// };

// User.updateAccess = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET access='"+user.newAccess+"', job='"+user.newJob+"' WHERE id='"+user.id+"';";
// 	return db(query);
// };

// User.updatePassword = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET password='"+user.password+"' WHERE id='"+user.id+"';";
// 	return db(query);
// };

// User.updateInfo = (user) => {
// 	let query = "";
// 	if(user.email && user.birth){
// 		query = "UPDATE cms_wt_erp.user SET email='"+user.email+"', birth='"+user.birth+"' WHERE id='"+user.id+"';";
// 	} else if(user.email && !user.birth){
// 		query = "UPDATE cms_wt_erp.user SET email='"+user.email+"' WHERE id='"+user.id+"';";
// 	} else if(!user.email && user.birth){
// 		query = "UPDATE cms_wt_erp.user SET birth='"+user.birth+"' WHERE id='"+user.id+"';";
// 	};
// 	return db(query);
// };

module.exports = Customer;