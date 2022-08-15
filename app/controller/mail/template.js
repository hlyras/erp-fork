const lib = require("jarmlib");

const path = require('path');

const Template = {};

Template.format = (content) => {
	let splitedContent = lib.string.splitBy(content, "\n");
	let templatedContent = ``;

	for(let i in splitedContent) {
		templatedContent += splitedContent[i] == `` ? `<br>` : `<p style='margin-left:10px;font-family:georgia;'>${splitedContent[i]}</p>`;
	};
	
	return templatedContent;
};

Template.setData = (str, data) => {
	let mailer_template = str;

	Object.entries(data).map(d => {
		mailer_template = lib.string.replaceChar(mailer_template, `=>${d[0]}`, d[1]);
	});

	return mailer_template;
};

Template.render = (mail) => {
	let template = "";
	let header = `<!DOCTYPE html><html><body style='padding:0px;margin:0px;'><div style='height:60px;background-color:#000;' align='center'><img src='cid:favicon-white' style='height:40px;margin-top:10px;'></div>`;
	let footer = `<img src='cid:favicon' style='margin-left:10px;margin-top:5px;width:105px;'></body></html>`;

	template += header;
	template += mail;
	template += footer;

	return template;
};

Template.mail = (customer, mail) => {
	const option = {
		from: "JA Rio Militar <comercial@jariomilitar.com.br>",
		to: `${customer.name} <${customer.email}>`,
		subject: `${mail.subject}`,
		text: `${mail.text}`,
		html: mail.content,
		attachments: [
			{
				filename: "favicon-white.png",
				path: path.join(__dirname, "../../../app/view/mail/template/images/favicon-white.png"),
				cid: "favicon-white"
			},
			{
				filename: "favicon.png",
				path: path.join(__dirname, "../../../app/view/mail/template/images/favicon.png"),
				cid: "favicon"
			}
		]
	};

	return option;
};

module.exports = Template;