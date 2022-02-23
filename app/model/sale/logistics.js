const db = require('../../../config/connection');
const lib = require("jarmlib");

const Logistics = {};

Logistics.confirmPackment = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET packment_confirmation_date='"+sale.packment_confirmation_date+"', packment_user_id='"+sale.packment_user_id+"', packment_user_name='"+sale.packment_user_name+"', status='"+sale.status+"', box_amount='"+sale.box_amount+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Logistics.confirmNF = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET nf='"+sale.nf+"', nf_confirmation_date='"+sale.nf_confirmation_date+"', nf_user_id='"+sale.nf_user_id+"', nf_user_name='"+sale.nf_user_name+"', status='"+sale.status+"' WHERE id='"+sale.id+"';";
	return db(query);
};

Logistics.confirmShipment = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET shipment_confirmation_date='"+sale.shipment_confirmation_date+"', shipment_user_id='"+sale.shipment_user_id+"', shipment_user_name='"+sale.shipment_user_name+"', status='"+sale.status+"' WHERE id='"+sale.id+"';";
	return db(query);
};

module.exports = Logistics;