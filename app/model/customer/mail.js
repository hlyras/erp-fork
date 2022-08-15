const db = require('../../../config/connection');
const lib = require("jarmlib");

const Mail = function(){
	this.id;
	this.datetime;
	this.customer_id;
	this.mail_id;
	this.user_id;

	this.save = () => {
		if(!this.datetime) { return { err: "É necessário incluir o horário do envio do e-mail" } };
		if(!this.customer_id) { return { err: "É necessário incluir o id do cliente" } };
		if(!this.mail_id) { return { err: "É necessário incluir o id do e-mail" } };
		if(!this.user_id) { return { err: "É necessário incluir o id do usuário" } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.customer_mail');

		return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "O id do modelo é inválido" }; }

		let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.customer_mail', 'id');

    return db(query);
	};
};

module.exports = Mail;