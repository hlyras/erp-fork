const db = require('../../../config/connection');
const lib = require("jarmlib");

const Prospect = function(){
	this.id;
	this.datetime;
	this.brand;
	this.state;
	this.phone;
	this.social_media;
	this.manager;
	this.email;
	this.cellphone;
	this.product_approach;

	this.save = () => {
		if(!this.brand) { return { err: "É necessário incluir o nome da empresa" } };
        if(!this.state) { return { err: "É necessário incluir o estado da empresa" } };
        if(!this.phone) { return { err: "É necessário incluir o telefone da empresa" } };

        let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.customer_lead');

        return db(query);
	};
};

Prospect.update = prospect => {
	let query = lib.Query.update(prospect, 'cms_wt_erp.customer_lead', 'id');
	return db(query);
};

Prospect.filter = (props, inners, period, params, strictParams, orderParams, limit) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.customer_lead customer_lead")
		.inners(inners).period(period).params(params).strictParams(strictParams).order(orderParams).limit(limit).build().query;
	return db(query);
};

Prospect.findById = (prospect_id) => {
	let query = "SELECT * FROM cms_wt_erp.customer_lead WHERE id="+prospect_id+";";
	return db(query);
};

Prospect.findByIdAndUserId = (prospect_id, user_id) => {
	let query = "SELECT * FROM cms_wt_erp.customer_lead WHERE id="+prospect_id+" AND user_id="+user_id+";";
	return db(query);
};

Prospect.log = function() {
	this.id;
	this.datetime;
	this.lead_id;
	this.from;
	this.to;
	this.comment;
	this.user_id;

	this.save = () => {
        let obj = lib.convertTo.object(this);

		let query = lib.Query.save(obj, 'cms_wt_erp.customer_lead_log');
	    return db(query);
	};
};

Prospect.log.list = (lead_id) => {
	let query = "SELECT * FROM cms_wt_erp.customer_lead_log WHERE lead_id="+lead_id+";";
	return db(query);
};

Prospect.mailer = {};

Prospect.mailer.filter = (props, inners, period, params, strictParams, orderParams, limit) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.customer_lead customer_lead")
		.inners(inners).period(period).params(params).strictParams(strictParams).order(orderParams).limit(limit).build().query;
	return db(query);
};

module.exports = Prospect;