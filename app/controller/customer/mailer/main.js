const userController = require('./../../user');
const Customer = require('../../../model/customer');

const lib = require("jarmlib");

const Mailer = require('../../../middleware/mailer');
const ejs = require("ejs");
const path = require('path');

const mailerController = {};

mailerController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};
	res.render('customer/mailer/index', { user: req.user });
};

mailerController.replaceChar = (string, regex, content) => {
	string = string.replaceAll(regex, content);
	return string;
};

mailerController.genTemplate = (str, data) => {
	// let mailer_template = mailerController.replaceChar(str, `=>name`, data.name);
	let mailer_template = str;

	Object.entries(data).map(d => {
		mailerController.replaceChar(mailer_template, `${}`);
	  console.log(d)
	});

	return mailer_template;
};

mailerController.send = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};

	// Através do email_log verifica se cliente está disponível
	// Carrega as informações do cliente
	// Carrega as informações do usuário

	// Carrega as informações do template
	// Carrega as informações do modelo
	// Carrega as informações do Email
	
	// Envia Email
	// Salva as informações em email_log


	let mailer_model = mailerController.genTemplate(req.body.str, { name: "Henrique", user_name: "Vendedor"});

	console.log(mailer_model);

	return res.send({ done: "OK" });

	try {
		// const data = await ejs.renderFile(path.join(__dirname, "../../../../app/view/customer/mailer/mail-template/index.ejs"), { mailer_model });

		const option = {
			from: "JA Rio Militar <comercial@jariomilitar.com.br>",
			to: `Henrique Lyra <hhlyras2011@gmail.com>`,
			subject: `Testando Emailer`,
			text: `Teste da plataforma Emailer`,
			html: mailer_model,
			attachments: [
				{
	        filename: 'favicon-white.png',
	        path: path.join(__dirname, "../../../../app/view/customer/mailer/mail-template/images/favicon-white.png"),
	        cid: 'favicon-white'
	    	},
				{
					filename: 'favicon.png',
					path: path.join(__dirname, "../../../../app/view/customer/mailer/mail-template/images/favicon.png"),
					cid: 'favicon'
				}
			]
		};

		await Mailer.sendMail(option, async (err, info) => {
			if (err) { 
				console.log(err);
				return res.send({ msg: "Ocorreu um erro ao enviar o e-mail, atualize a página e tente novamente!" }); 
			} else {
				return res.send({ done: 'Email enviado com sucesso!' });	
			}
		});
	} catch (err) {
		console.log(err);
		return res.send({ msg: "Ocorreu um erro ao enviar o e-mail, atualize a página e tente novamente!" }); 
	}
};

module.exports = mailerController;