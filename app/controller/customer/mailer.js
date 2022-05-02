const userController = require('./../user');
const User = require('../../model/user');
const Customer = require('../../model/customer');

const lib = require("jarmlib");

const Mailer = require('../../middleware/mailer');
const ejs = require("ejs");
const path = require('path');

const mailerController = {};

mailerController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};
	res.render('customer/mailer', { user: req.user });
};

mailerController.filter = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm','com-sel'])){
		return res.redirect('/');
	};

	const customer = {
		mailer: 1,
		mailer_datetime: (new Date().getTime()) - (lib.date.timestamp.day() * 5)
	};

	try {
		let customers = await Customer.mailer.filter(customer);
		res.send({ customers, user: req.user });
	} catch (err) {
		console.log(err);
	};
};

mailerController.send = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};

	const params = {
		id: req.params.id,
		mailer: 1,
		mailer_datetime: (new Date().getTime()) - (lib.date.timestamp.day() * 5)
	};

	try {
		let user = (await User.findById(req.user.id))[0];
		let customer = (await Customer.mailer.filter(params))[0];

		if(!customer) { return res.send({ msg: "Este cliente não está disponível para receber E-mail, por favor atualize a página e tente novamente." }) }

		customer.name = customer.name.split(' ')[0];

		const data = await ejs.renderFile(path.join(__dirname, "../../../app/view/customer/mail-template/index.ejs"), { customer, user });
	            
	    const option = {
        from: "JA Rio Militar <comercial@jariomilitar.com.br>",
        to: `${customer.name} <${customer.email}>`,
        subject: "Promoção Cases táticas modulares",
		    text: "Na compra da Case ganhe 2 acessórios modulares...",
	        html: data,
	        attachments: [
			    {
		        filename: 'favicon.png',
		        path: path.join(__dirname, "../../../app/view/customer/mail-template/images/favicon.png"),
		        cid: 'favicon'
			    }
		    ]
	    };

	    await Mailer.sendMail(option, async (err, info) => {
	        if (err) { 
	        	console.log(err);
	        	return res.send({ msg: "Ocorreu um erro ao enviar o e-mail, atualize a página e tente novamente!" }); 
	        } else {
	        	customer.mailer_datetime = new Date().getTime();
	        	customer.mailer_user_id = req.user.id;
	        	await Customer.mailer.setDatetime(customer);
				return res.send({ done: 'Email enviado com sucesso!' });	
	        }
	    });
	} catch (err) {
		console.log(err);
		return res.send({ msg: "Ocorreu um erro ao enviar o e-mail, atualize a página e tente novamente!" }); 
	}
};

mailerController.removeSign = async (req, res) => {
	res.render('customer/remove-sign', { id: req.params.id, register: req.params.register });
};

mailerController.signOut = async (req, res) => {
	const pj_params = { keys: [], values: [] };
	lib.Query.fillParam("customer.id", req.params.id, pj_params);
	lib.Query.fillParam("customer.cnpj", req.params.register, pj_params);
	lib.Query.fillParam("customer.mailer", 1, pj_params);
	let pj_customer = await Customer.adFilter([],[],[],pj_params,[]);
	
	if(!pj_customer.length){
		let pf_params = { keys: [], values: [] };
		lib.Query.fillParam("customer.id", req.params.id, pf_params);
		lib.Query.fillParam("customer.cpf", req.params.register, pf_params);
		lib.Query.fillParam("customer.mailer", 1, pj_params);
		let pf_customer = await Customer.adFilter([],[],[],pf_params,[]);
	
		if(pf_customer.length){ Customer.mailer.pf.signout(pf_customer[0]); }
	} else {
		Customer.mailer.pj.signout(pj_customer[0]);
	}

	res.render('customer/signout');
};

module.exports = mailerController;