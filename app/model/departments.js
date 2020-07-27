const db = require('../../config/connection');

const Department = function(){
	this.id;
	this.name;
	this.roles = [];
};

Department.save = async () {
	let query = "INSERT INTO cms_wt_erp.department (name, engagement) VALUES ('"+department.name+"', '"+department.engagement+"');";
	return db(query);
};

module.exports = Department;

// Projetos tem diferentes tipos de acesso, na maioria dos casos pessoas específicas tem funções específicas
// De acordo com o crescimento do projeto, tente definir as funções atuais necessárias para a distribuição de tarefas.

// Role = Função
// Access = Acesso

// Gerente de produção - Role
// gpr - Access

//Gerente de Produção - gpr
	//Coordenador de corte - cco
		//Auxiliar de produção - aco
		//Auxiliar de produção - aco
	//Coordenador de costura - ccr
		//Costureiro(a)s - ctr
		//Costureiro(a)s - ctr
		//Costureiro(a)s - ctr
		//Costureiro(a)s - ctr

//Gerente Comercial
	//Despacho de produtos
	//Estoquista

	//Marketing

	//Coordenador(a) administrativo
	//Auxiliar administrativo

	/*
	
	Department (department)
		id: INT(3);
		name: VARCHAR(35);
		abbreviation: VARCHAR(3);
		roles: [];
	
	Role (department_role)
		id: INT(3),
		name: VARCHAR(35),
		abbreviation: VARCHAR(3),
		department: VARCHAR(3) not null
	}
	
	*/