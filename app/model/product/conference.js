const db = require('../../../config/connection');
const lib = require("jarmlib");

const Conference = function() {
	this.id;
	this.product_id;
	this.description;
	this.video_url;
	this.user_id;

	this.create = () => {
		if(!this.product_id) { return { err: "É necessário incluir o produto da conferência" } };
		if(!this.description) { return { err: "É necessário incluir a descrição da conferência" } };
		if(!this.user_id) { return { err: "É necessário incluir o id do usuário." } };

		let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.product_conference');

		return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "O id da conferência é inválido." }; }
		if(!this.product_id) { return { err: "É necessário incluir o produto da conferência" } };
		if(!this.description) { return { err: "É necessário incluir a descrição da conferência" } };
		if(!this.user_id) { return { err: "É necessário incluir o id do usuário." } };

		let query = `UPDATE cms_wt_erp.product_conference SET product_id='${this.product_id}', 
			description='${this.description}', 
			video_url='${this.video_url}', 
			user_id='${this.user_id}' WHERE id='${this.id}';`;
    return db(query);
	};
};

Conference.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.product_conference product_conference")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Conference.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product_conference WHERE id='"+id+"';";
	return db(query);
};

module.exports = Conference;