const db = require('../../config/connection');

const User = function(){
	this.id;
	this.name;
	this.email;
	this.password;
	this.phone;
	this.access;
};

User.list = () => {
	let query = "SELECT * FROM cms_wt_erp.users;";
	return db(query);
};

User.findById = (id) => {
	let query = "SELECT * FROM cms_wt_erp.users WHERE id='"+id+"';";
	return db(query);
};

User.findByUsername = (user) => {
	let query = "SELECT * FROM cms_wt_erp.users WHERE username='"+user.username+"';";
	return db(query);
};

User.findByEmail = (user) => {
	let query = "SELECT * FROM cms_wt_erp.users WHERE email='"+user.email+"';";
	return db(query);
};

User.updateAccess = (user) => {
	let query = "UPDATE cms_wt_erp.users SET access='"+user.newAccess+"', job='"+user.newJob+"' WHERE id='"+user.id+"';";
	return db(query);
};

User.updatePassword = (user) => {
	let query = "UPDATE cms_wt_erp.users SET password='"+user.password+"' WHERE id='"+user.id+"';";
	return db(query);
};

User.updateInfo = (user) => {
	if(user.email && user.birth){
		var query = "UPDATE cms_wt_erp.users SET email='"+user.email+"', birth='"+user.birth+"' WHERE id='"+user.id+"';";
	} else if(user.email && !user.birth){
		var query = "UPDATE cms_wt_erp.users SET email='"+user.email+"' WHERE id='"+user.id+"';";
	} else if(!user.email && user.birth){
		var query = "UPDATE cms_wt_erp.users SET birth='"+user.birth+"' WHERE id='"+user.id+"';";
	};
	return db(query);
};

module.exports = User;