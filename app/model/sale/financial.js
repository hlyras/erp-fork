const db = require('../../../config/connection');
const lib = require("jarmlib");

const Financial = {};

Financial.confirmPayment = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET payment_confirmation_date='"+sale.payment_confirmation_date+"', payment_user_id='"+sale.payment_user_id+"', payment_user_name='"+sale.payment_user_name+"', status='"+sale.status+"', estimated_shipment_date='"+sale.estimated_shipment_date+"' WHERE id='"+sale.id+"';";
	return db(query);
};

module.exports = Financial;