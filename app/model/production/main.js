// class User {
// 	#password;

// 	constructor(id, name, lastName, password) {
// 		this.id = id;
// 		this.name = name;
// 		this.lastName = lastName;
// 		this.#password = password;
// 	}

// 	get fullName() {
//     return `${this.name} ${this.lastName}`;
//   }

//   set changeName(newName) {
// 		this.name = newName;
// 	}

//   get password() {
//     return this.#password;
//   };

//   set setPassword(newPassword) {
//     return this.#password = newPassword;
//   };

// 	greet() {
// 		return `Olá meu nome é ${this.name}`;
// 	}

// 	static greetings() {
// 		return `Esse é um metodo static`;
// 	}
// }

// class Customer extends User {
// 	constructor(id, name, lastName, cnpj, trademark, brand) {
// 		super(id, name, lastName);
// 		this.cnpj = cnpj;
// 		this.trademark = trademark;
// 		this.brand = brand;
// 	}
// }

// let user = new User(1,'Henrique','Lyra',123);
// let customer = new Customer(1,'Wan','Dame',14114,'JC','JA');

// const db = require('../../../config/connection');
// const lib = require("jarmlib");

// module.exports = class Production {
// 	constructor (_id, _datetime, _product_id, _product_info, _amount, _status, _user_id) {
// 		this.id = _id;
// 		this.datetime = _datetime;
// 		this.product_id = _product_id;
// 		this.product_info = _product_info;
// 		this.amount = _amount;
// 		this.status = _status;
// 		this.user_id = _user_id;
// 	}
// }

// class Internal extends Production {
// 	constructor(_id, _datetime) {
// 		super(_id, _datetime);
// 	}

// 	conference() {
// 		console.log('fez a conferencia interna');
// 	}
// }

// class External extends Production {
// 	constructor(_id, _datetime) {
// 		super(_id, _datetime);
// 	}

// 	conference() {
// 		console.log('fez a conferencia externa');
// 	}
// }

// let productionInt = new Internal(1, '10-05');

