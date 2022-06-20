const User = require('../../model/user');
const userController = require('./../user');

const lib = require("jarmlib");

const Sale = require('../../model/sale/main');

const adminController = {};

adminController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud","fin-ass"])){
		return res.redirect('/');
	};

	// let metrics = {
	// 	em_negociacao: 0,
	// 	ag_pagamento: 0,
	// 	ag_embalo: 0,
	// 	ag_nf: 0,
	// 	ag_envio: 0,
	// 	ag_envio_p_retirada: 0,
	// 	ag_transporte_p_pr: 0,
	// 	a_caminho_do_pr: 0,
	// 	disponivel_p_retirada: 0,
	// 	enviado: 0,
	// 	entregue: 0,
	// 	extraviado: 0
	// };

	try {
		// for(let i in sales) {
		// 	if(sales[i].status == "Em negociação") { metrics.em_negociacao++; }
		// 	if(sales[i].status == "Ag. pagamento") { metrics.ag_pagamento++; }
		// 	if(sales[i].status == "Ag. embalo") { metrics.ag_embalo++; }
		// 	if(sales[i].status == "Ag. nota fiscal") { metrics.ag_nf++; }
		// 	if(sales[i].status == "Ag. envio") { metrics.ag_envio++; }
		// 	if(sales[i].status == "Ag. transporte p/ P.R.") { metrics.ag_transporte_p_pr++; }
		// 	if(sales[i].status == "Ag. envio p/ retirada") { metrics.ag_envio_p_retirada++; }
		// 	if(sales[i].status == "A caminho do P.R.") { metrics.a_caminho_do_pr++; }
		// 	if(sales[i].status == "Disponível para retirada") { metrics.disponivel_p_retirada++; }
		// 	if(sales[i].status == "Enviado") { metrics.enviado++; }
		// 	if(sales[i].status == "Entregue") { metrics.entregue++; }
		// 	if(sales[i].status == "Extraviado") { metrics.extraviado++; }
		// };

		let users = await User.list();

		res.render('sale/admin/index', { user: req.user, users });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao realizar requisição." });
	};
};

adminController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud","fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	};

	const props = [];
	const inners = [];

	const period = { key: "sale_date", start: req.body.sale.periodStart, end: req.body.sale.periodEnd };
	const params = { keys: [], values: [] };
	const strict_params = { keys: [], values: [] };

	lib.Query.fillParam("sale.id", req.body.sale.id, strict_params);
	lib.Query.fillParam("sale.customer_name", req.body.sale.customer_name, params);
	lib.Query.fillParam("sale.customer_cnpj", req.body.sale.customer_cnpj, params);
	lib.Query.fillParam("sale.status", req.body.sale.status, strict_params);
	lib.Query.fillParam("sale.shipment_method", req.body.sale.shipment_method, strict_params);
	lib.Query.fillParam("sale.user_id", req.body.sale.user_id, strict_params);

	const order_params = [ ["id","DESC"] ];
	const limit = 0;

	try {
		let sales = await Sale.filter([], [], period, params, strict_params, order_params, limit);
		res.send({ sales });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

module.exports = adminController;