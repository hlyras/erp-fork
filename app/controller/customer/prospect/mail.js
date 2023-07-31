const userController = require('./../../user/main');
const User = require('../../../model/user');
const Prospect = require('../../../model/customer/prospect');
const Mail = require('../../../model/mail/main');

const Template = require('./../../mail/template');

const lib = require("jarmlib");

const Mailer = require('../../../middleware/mailer');
const ejs = require("ejs");
const path = require('path');

const mailController = {};

mailController.send = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'com-ass', 'com-sel'])) {
		return res.redirect('/');
	};

	try {
		const prospect = (await Prospect.findById(req.body.prospect_id))[0];
		const user = (await User.findById(req.user.id))[0];

		if (prospect.name) { prospect.full_name = prospect.name; }
		if (prospect.name) { prospect.name = prospect.name.split(" ")[0]; }
		prospect.user_full_name = user.name;
		prospect.user_name = user.name.split(" ")[0];
		if (user.phone) { prospect.user_phone = user.phone; }
		if (user.phone) { prospect.user_contact = user.contact; }

		const mail = (await Mail.findById(req.body.mail_id))[0];

		mail.content = Template.format(mail.content);
		mail.content = Template.setData(mail.content, prospect);
		mail.content = Template.render(mail.content);

		const mailOptions = Template.mail(prospect, mail);

		await Mailer.sendMail(mailOptions, async (err, info) => {
			if (!err) {
				const p = new Prospect();
				p.id = prospect.id;
				p.mail_datetime = new Date().getTime();

				await p.update();
				await mailController.save(prospect, mail, req.user);

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

mailController.save = async (prospect, mail, user) => {
	const prospectMail = new Prospect.mail();
	prospectMail.datetime = new Date().getTime();
	prospectMail.prospect_id = prospect.id;
	prospectMail.mail_id = mail.id;
	prospectMail.user_id = user.id;

	await prospectMail.save();
};

module.exports = mailController;