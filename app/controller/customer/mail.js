const userController = require('./../user');
const User = require('../../model/user');
const Customer = require('../../model/customer/main');
Customer.mail = require('../../model/customer/mail');
const Mail = require('../../model/mail/main');

const Template = require('./../mail/template');

const lib = require("jarmlib");

const Mailer = require('../../middleware/mailer');
const ejs = require("ejs");
const path = require('path');

const mailController = {};

mailController.index = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm'])) {
		return res.redirect('/');
	};
	res.render('customer/mailer', { user: req.user });
};

mailController.send = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-ass', 'com-sel'])) {
		return res.redirect('/');
	};

	try {
		const customer = (await Customer.findBy.id(req.body.customer_id))[0];
		const user = (await User.findById(req.user.id))[0];

		customer.full_name = customer.name;
		customer.name = customer.name.split(" ")[0];
		customer.user_full_name = user.name;
		customer.user_name = user.name.split(" ")[0];
		customer.user_phone = user.phone;
		customer.user_contact = user.contact;

		const mail = (await Mail.findById(req.body.mail_id))[0];

		mail.content = Template.format(mail.content);
		mail.content = Template.setData(mail.content, customer);
		mail.content = Template.render(mail.content);

		const mailOptions = Template.mail(customer, mail);

		await Mailer.sendMail(mailOptions, async (err, info) => {
			if (!err) {
				const c = new Customer();
				c.id = customer.id;
				c.mail_datetime = new Date().getTime();

				await c.update();
				await mailController.save(customer, mail, req.user);

				return res.send({ done: 'Email enviado com sucesso!' });
			} else {
				console.log(err);
				return res.send({ msg: "Ocorreu um erro ao enviar o e-mail, atualize a página e tente novamente!" });
			}
		});
	} catch (err) {
		console.log(err);
		return res.send({ msg: "Ocorreu um erro ao enviar o e-mail, atualize a página e tente novamente!" });
	}
};

mailController.save = async (customer, mail, user) => {
	const customerMail = new Customer.mail();
	customerMail.datetime = new Date().getTime();
	customerMail.customer_id = customer.id;
	customerMail.mail_id = mail.id;
	customerMail.user_id = user.id;

	await customerMail.save();
};

// mailController.removeSign = async (req, res) => {
// 	res.render('customer/remove-sign', { id: req.params.id, register: req.params.register });
// };

// mailController.signOut = async (req, res) => {
// 	const pj_params = { keys: [], values: [] };
// 	lib.Query.fillParam("customer.id", req.params.id, pj_params);
// 	lib.Query.fillParam("customer.cnpj", req.params.register, pj_params);
// 	lib.Query.fillParam("customer.mailer", 1, pj_params);
// 	let pj_customer = await Customer.adFilter([],[],[],pj_params,[]);

// 	if(!pj_customer.length){
// 		let pf_params = { keys: [], values: [] };
// 		lib.Query.fillParam("customer.id", req.params.id, pf_params);
// 		lib.Query.fillParam("customer.cpf", req.params.register, pf_params);
// 		lib.Query.fillParam("customer.mailer", 1, pj_params);
// 		let pf_customer = await Customer.adFilter([],[],[],pf_params,[]);

// 		if(pf_customer.length){ Customer.mailer.pf.signout(pf_customer[0]); }
// 	} else {
// 		Customer.mailer.pj.signout(pj_customer[0]);
// 	}

// 	res.render('customer/signout');
// };

module.exports = mailController;