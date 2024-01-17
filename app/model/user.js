const db = require('../../config/connection');
const lib = require("jarmlib");

const User = function () {
	this.id;
	this.name;
	this.username;
	this.phone;
	this.password;
	this.birth;
	this.department;
	this.role;
	this.access = '000-000' //no access;
	this.pass = null;
};

User.save = (user) => {
	let query = "INSERT INTO cms_wt_erp.user (name, username, password) values ('"
		+ user.name + "', '"
		+ user.username + "', '"
		+ user.password + "')";
	return db(query);
};

User.filter = (props, inners, params, strict_params, order_params) => {
	let { query, values } = new lib.Query().select().props(props).table("cms_wt_erp.user user")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build();
	return db(query, values);
};

User.list = () => {
	let query = "SELECT * FROM cms_wt_erp.user;";
	return db(query);
};

User.findById = (id) => {
	let query = "SELECT * FROM cms_wt_erp.user WHERE id='" + id + "';";
	return db(query);
};

User.findByUsername = (username) => {
	let query = "SELECT * FROM cms_wt_erp.user WHERE username='" + username + "';";
	return db(query);
};

User.updateAccess = (user) => {
	let query = "UPDATE cms_wt_erp.user SET access='" + user.newAccess + "', job='" + user.newJob + "' WHERE id='" + user.id + "';";
	return db(query);
};

User.updatePassword = (user) => {
	let query = "UPDATE cms_wt_erp.user SET password='" + user.password + "' WHERE id='" + user.id + "';";
	return db(query);
};

User.updateInfo = (user) => {
	let query = "UPDATE cms_wt_erp.user SET username='" + user.username + "' WHERE id ='" + user.id + "';";
	return db(query);
};

User.findByPass = (pass) => {
	let query = `SELECT id, pass, access FROM cms_wt_erp.user WHERE pass='${pass}';`;
	return db(query);
};

module.exports = User;