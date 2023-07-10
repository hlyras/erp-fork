const db = require('../../../config/connection');
const lib = require("jarmlib");

const Financial = {};

Financial.payment = {};

Financial.payment.confirm = async (sale) => {
	let query = "UPDATE cms_wt_erp.sale SET payment_confirmation_date='" + sale.payment_confirmation_date + "', payment_user_id='" + sale.payment_user_id + "', payment_user_name='" + sale.payment_user_name + "', status='" + sale.status + "', estimated_shipment_date='" + sale.estimated_shipment_date + "' WHERE id='" + sale.id + "';";
	return db(query);
};

Financial.payment2 = {};

Financial.payment2.confirm = (sale) => {
	let query = `UPDATE cms_wt_erp.sale SET payment2_confirmation_date='${sale.payment2_confirmation_date}',
		payment2_user_id='${sale.payment2_user_id}',
		payment2_user_name='${sale.payment2_user_name}',
		status='${sale.status}' WHERE id='${sale.id}';`
	return db(query);
};

Financial.billet = {};

Financial.billet.confirm = (sale) => {
	let query = `UPDATE cms_wt_erp.sale SET billet_confirmation_date='${sale.billet_confirmation_date}',
		billet_user_id='${sale.billet_user_id}',
		billet_user_name='${sale.billet_user_name}',
		billet_url='${sale.billet_url}',
		status='${sale.status}' WHERE id='${sale.id}';`
	return db(query);
};

module.exports = Financial;