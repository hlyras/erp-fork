const db = require('../../../config/connection');
const lib = require("jarmlib");

const Feedstock = function() {
	this.id;
	this.code;
	this.name;
	this.color_id;
	this.unit;
	this.uom;
	
	this.save = () => {
		let query = "INSERT INTO cms_wt_erp.feedstock (code, name, color_id, unit, uom) VALUES ('"
			+this.code+"', '"
			+this.name+"','"
			+this.color_id+"','"
			+this.unit+"','"
			+this.uom+"');";
		return db(query);
	};

	this.update = () => {
		let query = "UPDATE cms_wt_erp.feedstock SET code='"+this.code
			+"', name='"+this.name
			+"', color_id='"+this.color_id
			+"', unit='"+this.unit
			+"', uom='"+this.uom+"' WHERE id='"+this.id+"';";
		return db(query);
	};
};

Feedstock.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.feedstock feedstock")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Feedstock.findByCode = code => {
	let query = "SELECT * FROM cms_wt_erp.feedstock WHERE code='"+code+"';";
	return db(query);
};

Feedstock.delete = (feedstock_id) => {
	let query = "DELETE FROM cms_wt_erp.feedstock WHERE id='"+feedstock_id+"';";
	return db(query);
};

module.exports = Feedstock;