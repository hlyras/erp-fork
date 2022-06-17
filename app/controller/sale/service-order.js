const User = require('../../model/user');
const userController = require('./../user');

const Sale = require('../../model/sale/main');
const Triage = require('../../model/sale/triage');
const ServiceOrder = require('../../model/sale/service-order');

const lib = require("jarmlib");

const serviceOrderController = {};

serviceOrderController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.redirect('/');
	};

	try {
		res.render('sale/triage/service-order/index', { user: req.user });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a O.S., favor contatar o suporte." });
	};
};

serviceOrderController.findById = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		let props = [
			"service_order.*",
			"user.name user_name"
		];

		let inners = [
			["cms_wt_erp.user user", "service_order.user_id","user.id"]
		];

		let strict_params = { keys: [], values: [] };
		lib.Query.fillParam("service_order.id", req.params.id, strict_params);
		let serviceOrder = (await ServiceOrder.filter(props, inners, [], [], strict_params, [], 0))[0];

		props = [
			"service_order_sale.*",
			"sale.customer_name customer_name",
			"sale.box_amount box_amount",
			"customer.trademark customer_trademark"
		];

		inners = [
			["cms_wt_erp.sale sale", "service_order_sale.sale_id","sale.id"],
			["cms_wt_erp.customer customer", "sale.customer_id","customer.id"]
		];

		strict_params = { keys: [], values: [] };
		lib.Query.fillParam("service_order_sale.service_order_id", req.params.id, strict_params);
		serviceOrder.sales = await ServiceOrder.sale.filter(props, inners, [], strict_params, [], 0);

		props = ["user.name"];
		if(serviceOrder.collect_user_id) {
			strict_params = { keys: [], values: [] };
			lib.Query.fillParam("user.id", serviceOrder.collect_user_id, strict_params);
			serviceOrder.collect_user = (await User.filter(props, [], [], strict_params, []))[0];
		}

		if(serviceOrder.recept_user_id) {
			strict_params = { keys: [], values: [] };
			lib.Query.fillParam("user.id", serviceOrder.recept_user_id, strict_params);
			serviceOrder.recept_user = (await User.filter(props, [], [], strict_params, []))[0];
		}

		if(serviceOrder.cancel_user_id) {
			strict_params = { keys: [], values: [] };
			lib.Query.fillParam("user.id", serviceOrder.cancel_user_id, strict_params);
			serviceOrder.cancel_user = (await User.filter(props, [], [], strict_params, []))[0];
		}

		res.send(serviceOrder);
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao tentar encontrar a O.S., favor contatar o suporte." });
	};
};

serviceOrderController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let serviceOrder = {
		id: req.body.id,
		method: req.body.method,
		status: req.body.status,
		periodStart: req.body.periodStart,
		periodEnd: req.body.periodEnd
	};

	let period = { key: "datetime", start: serviceOrder.periodStart, end: serviceOrder.periodEnd };
	let strict_params = { keys: [], values: [] };
	lib.Query.fillParam("service_order.id", serviceOrder.id, strict_params);
	lib.Query.fillParam("service_order.method", serviceOrder.method, strict_params);
	lib.Query.fillParam("service_order.status", serviceOrder.status, strict_params);

	let orderParams = [ ["id", "DESC"] ]

	try {
		let serviceOrders = await ServiceOrder.filter([], [], period, [], strict_params, orderParams, 0);
		res.send(serviceOrders);
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao registrar a O.S., favor contatar o suporte." });
	};
};

serviceOrderController.shipment = {};

serviceOrderController.shipment.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.redirect('/');
	};

	let metrics = {
		correios: 0,
		jadlog: 0,
		total_express: 0,
		braspress: 0,
		latam: 0
	};

	const strict_params = { keys: [], values: [] };
	lib.Query.fillParam("sale.status", "Ag. envio", strict_params);
	const order_params = [ ["id","DESC"] ];

	try {
		let sales = await Sale.filter([], [], [], [], strict_params, order_params, 0);

		for(let i in sales) {
			if(sales[i].shipment_method == "Correios Pac") { metrics.correios++; }
			if(sales[i].shipment_method == "Correios sedex") { metrics.correios++; }
			if(sales[i].shipment_method == "Jadlog") { metrics.jadlog++; }
			if(sales[i].shipment_method == "Total Express") { metrics.total_express++; }
			if(sales[i].shipment_method == "Braspress") { metrics.braspress++; }
			if(sales[i].shipment_method == "Latam") { metrics.latam++; }
		};

		res.render('sale/triage/shipment', { user: req.user, metrics });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao buscar a O.S., favor contatar o suporte." });
	};
};

serviceOrderController.shipment.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let serviceOrder = {
		datetime: new Date().getTime(),
		shipment_method: req.body.shipment_method,
		orders: req.body.orders,
		size: req.body.orders.length,
		status: "Finalizada",
		user_id: req.user.id
	};

	if(!serviceOrder.orders.length) {
		return res.send({ msg: "É necessário incluir ao menos 1 pedido para gerar uma O.S." });
	}

	try {
		let so_response = await ServiceOrder.save(serviceOrder);

		serviceOrder.id = so_response.insertId;

		for(let i in serviceOrder.orders) {
			let sale = {
				id: serviceOrder.orders[i].id,
				service_order_id: serviceOrder.id,
				sale_id: serviceOrder.orders[i].id,
				shipment_user_id: req.user.id,
				shipment_user_name: req.user.name,
				shipment_confirmation_date: new Date().getTime(),
				status: "Enviado"
			};

			await ServiceOrder.sale.save(sale);
			await Triage.shipment.confirm(sale);
		};

		res.send({ done: "O.S. de despacho registrada com sucesso!", serviceOrder });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao registrar a O.S., favor contatar o suporte." });
	};
};

serviceOrderController.shipment.print = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		let serviceOrder = (await ServiceOrder.findById(req.params.id))[0];
		serviceOrder.date = lib.date.timestamp.toDate(serviceOrder.datetime).split(" ")[0];

		let props = ["sale.*","service_order_sale.*","customer.trademark"];
		let inners = [
			["cms_wt_erp.sale sale","service_order_sale.sale_id","sale.id"],
			["cms_wt_erp.customer customer","sale.customer_id","customer.id"]
		];
		
		let strict_params = { keys: [], values: [] };
		lib.Query.fillParam("cms_wt_erp.service_order_sale.service_order_id", req.params.id, strict_params);

		serviceOrder.sales = await ServiceOrder.sale.filter(props, inners, [], strict_params, [], 0);
		res.render('sale/triage/shipment/print', { user: req.user, serviceOrder });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao imprimir a O.S., favor contatar o suporte." });
	};
};

serviceOrderController.transport = {};

serviceOrderController.transport.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.redirect('/');
	};

	res.render('sale/triage/transport/index', { user: req.user });
};

serviceOrderController.transport.save = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let serviceOrder = {
		datetime: new Date().getTime(),
		shipment_method: req.body.shipment_method,
		orders: req.body.orders,
		size: req.body.orders.length,
		status: "Ag. coleta", // Em transporte / Finalizada
		user_id: req.user.id
	};

	if(!serviceOrder.orders.length) {
		return res.send({ msg: "É necessário incluir ao menos 1 pedido para gerar uma O.S." });
	}

	try {
		let so_response = await ServiceOrder.save(serviceOrder);
		serviceOrder.id = so_response.insertId;

		for(let i in serviceOrder.orders) {
			let service_order_sale = {
				service_order_id: serviceOrder.id,
				sale_id: serviceOrder.orders[i].id
			};

			let sale = {
				id: serviceOrder.orders[i].id,
				status: "Ag. transporte p/ P.R."
			};

			await ServiceOrder.sale.save(service_order_sale);
			await Triage.sale.update(sale);
		};

		res.send({ done: "O.S. de transporte registrada com sucesso!", serviceOrder });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao registrar a O.S., favor contatar o suporte." });
	};
};

serviceOrderController.collect = {};

serviceOrderController.collect.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.redirect('/');
	};

	res.render('sale/triage/collect/index', { user: req.user });
};

serviceOrderController.collect.confirm = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let serviceOrder = {
		id: req.params.id,
		collect_datetime: new Date().getTime(),
		collect_user_id: req.user.id,
		status: "Em transporte"
	};

	try {
		serviceOrder.sales = await ServiceOrder.sale.list(serviceOrder.id);
		await ServiceOrder.collect.confirm(serviceOrder);

		for(let i in serviceOrder.sales) {
			let sale = {
				id: serviceOrder.sales[i].sale_id,
				status: "A caminho do P.R."
			};

			await Triage.sale.update(sale);
		};

		res.send({ done: "O.S. de transporte coletada com sucesso!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao coletar a O.S., favor contatar o suporte." });
	};
};

serviceOrderController.collect.cancel = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let serviceOrder = {
		id: req.params.id,
		cancel_datetime: new Date().getTime(),
		cancel_user_id: req.user.id,
		status: "Cancelada"
	};

	try {
		serviceOrder.sales = await ServiceOrder.sale.list(serviceOrder.id);
		await ServiceOrder.collect.cancel(serviceOrder);

		for(let i in serviceOrder.sales) {
			let sale = {
				id: serviceOrder.sales[i].sale_id,
				status: "Ag. envio p/ retirada"
			};

			await Triage.sale.update(sale);
		};

		res.send({ done: "O.S. de transporte cancelada com sucesso!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cancelar a O.S., favor contatar o suporte." });
	};
};

serviceOrderController.recept = {};

serviceOrderController.recept.confirm = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	let serviceOrder = {
		id: req.body.id,
		orders: req.body.orders,
		recept_datetime: new Date().getTime(),
		recept_user_id: req.user.id
	};

	if(!serviceOrder.orders.length) { 
		return res.send({ msg: "É necessário receber ao menos 1 pedido." });
	}

	try {
		serviceOrder.sales = await ServiceOrder.sale.list(serviceOrder.id);

		if(serviceOrder.sales.length > serviceOrder.orders.length) {
			serviceOrder.status = "Finalizada parcial";
			await ServiceOrder.recept.confirm(serviceOrder);
		} else {
			serviceOrder.status = "Finalizada";
			await ServiceOrder.recept.confirm(serviceOrder);
		}

		for(let i in serviceOrder.sales) {
			for(let j in serviceOrder.orders) {
				if(serviceOrder.sales[i].sale_id == serviceOrder.orders[j].sale_id){
					serviceOrder.sales.splice(i, 1);
				}
			};
		};

		for(let i in serviceOrder.sales) {
			let sale = {
				id: serviceOrder.sales[i].sale_id,
				status: "Extraviado"
			};

			let service_order_sale = {
				id: serviceOrder.sales[i].id,
				status: "Extraviado"
			};

			await Triage.sale.update(sale);
			await ServiceOrder.sale.update(service_order_sale);
		};

		for(let i in serviceOrder.orders) {
			let sale = {
				id: serviceOrder.orders[i].sale_id,
				status: "Disponível para retirada"
			};

			await Triage.sale.update(sale);
		};

		res.send({ done: "O.S. recebida com sucesso!" });
	} catch (err){
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao receber a O.S., favor contatar o suporte." });
	};
};

// serviceOrderController.recept.cancel = async (req, res) => {
// 	if(!await userController.verifyAccess(req, res, ['adm','com-sel',"adm-man","adm-ass","adm-aud",'COR-GER','log-pac',"fin-ass"])){
// 		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
// 	};

// 	let serviceOrder = {
// 		id: req.params.id,
// 		cancel_datetime: new Date().getTime(),
// 		cancel_user_id: req.user.id,
// 		status: "Cancelada"
// 	};

// 	try {
// 		serviceOrder.sales = await ServiceOrder.sale.list(serviceOrder.id);
// 		await ServiceOrder.recept.cancel(serviceOrder);

// 		for(let i in serviceOrder.sales) {
// 			let sale = {
// 				id: serviceOrder.sales[i].sale_id,
// 				status: "Ag. "
// 			};

// 			await Triage.sale.update(sale);
// 		};

// 		res.send({ done: "O.S. cancelada com sucesso!" });
// 	} catch (err){
// 		console.log(err);
// 		res.send({ msg: "Ocorreu um erro ao cancelar a O.S., favor contatar o suporte." });
// 	};
// };

module.exports = serviceOrderController;