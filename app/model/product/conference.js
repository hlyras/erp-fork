const db = require('../../../config/connection');

let Product = {};

Product.conference = function() {
	this.id = 0;
	this.datetime = "";
	this.status = "";
	this.user_id = 0;
	this.conference_user_id = "";
};

Product.conference.info = {};

Product.conference.info.update = (product) => {
	let query = "UPDATE cms_wt_erp.product SET conference_video='"+product.conference_video
		+"', conference_obs='"+product.conference_obs+"' WHERE id='"+product.id+"';";
	return db(query);
};

module.exports = Product.conference;