const userController = require('./../../user');
const User = require('../../../model/user');
const Lead = require('../../../model/customer/lead');
const Mail = require('../../../model/mail/main');

const Template = require('./../../mail/template');

const lib = require("jarmlib");

const Mailer = require('../../../middleware/mailer');
const ejs = require("ejs");
const path = require('path');

const mailController = {};

mailController.send = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-ass'])) {
		return res.redirect('/');
	};

	try {
		const lead = (await Lead.findById(req.body.lead_id))[0];
		const user = (await User.findById(req.user.id))[0];

		lead.full_name = lead.name;
		lead.name = lead.name.split(" ")[0];
		lead.user_full_name = user.name;
		lead.user_name = user.name.split(" ")[0];
		lead.user_phone = user.phone;
		lead.user_contact = user.contact;

		const mail = (await Mail.findById(req.body.mail_id))[0];

		mail.content = Template.format(mail.content);
		mail.content = Template.setData(mail.content, lead);
		mail.content = Template.render(mail.content);

		const mailOptions = Template.mail(lead, mail);

		await Mailer.sendMail(mailOptions, async (err, info) => {
			if (!err) {
				const l = new Lead();
				l.id = lead.id;
				l.mail_datetime = new Date().getTime();

				await l.update();
				await mailController.save(lead, mail, req.user);

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

mailController.save = async (lead, mail, user) => {
	const leadMail = new Lead.mail();
	leadMail.datetime = new Date().getTime();
	leadMail.lead_id = lead.id;
	leadMail.mail_id = mail.id;
	leadMail.user_id = user.id;

	await leadMail.save();
};

module.exports = mailController;