const userController = require('./../user');
const Customer = require('../../model/customer');

const lib = require("jarmlib");

const Mailer = require('../../middleware/mailer');
const ejs = require("ejs");

const mailerController = {};

mailerController.index = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};
	res.render('customer/mailer', { user: req.user });
};

mailerController.send = async (req, res) => {
	if(!await userController.verifyAccess(req, res, ['adm'])){
		return res.redirect('/');
	};

	const strict_params = { keys: [], values: [] };
	lib.Query.fillParam("customer.mailer", 1, strict_params);
	let customers = await Customer.adFilter([],[],[],strict_params,[]);

	customers.forEach(async customer => {
		if(customer.email){
			customer.name = customer.name.split(' ')[0];
			if(customer.cnpj){
				customer.register = customer.cnpj;
			} else if(customer.cpf && !customer.cnpj) {
				customer.register = customer.cpf;
			}

			const data = await ejs.renderFile(__dirname + "../../../view/customer/mail-template/index.ejs", { title: 'Confirmação de email', customer });
		            
		    const option = {
		        from: "JA Rio Militar <marketing@jariomilitar.com.br>",
		        to: `${customer.name} <${customer.email}>`,
		        subject: "Email para lojistas",
		        html: data,
		        attachments: [
			        {
				        filename: 'title.png',
				        path: __dirname + "../../../view/customer/mail-template/images/title.png",
				        cid: 'title'
				    },
				    {
				        filename: 'ml.png',
				        path: __dirname + "../../../view/customer/mail-template/images/ml.png",
				        cid: 'ml'
				    },
				    {
				        filename: 'footer.png',
				        path: __dirname + "../../../view/customer/mail-template/images/footer.png",
				        cid: 'footer'
				    }
			    ]
		    };

		    Mailer.sendMail(option, (err, info) => {
		        if (err) { console.log(err); }
		        else { console.log('Message sent: ' + info.response); }
		    });
		}
	});

	res.send({ done: 'Os emails foram enviados com sucesso!' });	
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