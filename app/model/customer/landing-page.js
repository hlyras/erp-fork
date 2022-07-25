const db = require('../../../config/connection');
const lib = require("jarmlib");

const LandingPage = function(){
	this.id;
	this.datetime;
	this.name;
	this.email;
	this.phone;
	this.status;
	this.user_id;
};

LandingPage.filter = (props, inners, period, params, strictParams, orderParams) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.lead_lp lead_lp")
		.inners(inners).period(period).params(params).strictParams(strictParams).order(orderParams).build().query;
	return db(query);
};

module.exports = LandingPage;