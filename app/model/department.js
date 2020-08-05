const db = require('../../config/connection');

const Department = function(){
	this.id;
	this.name;
	this.abbreviation;
	this.roles = [];
};

Department.Role = function(){
	this.id;
	this.department_id;
	this.department_name;
	this.name;
	this.abbreviation;
};

// Department functions
Department.save = async (department) => {
	let query = "INSERT INTO cms_wt_erp.department (name, abbreviation) VALUES ('"
		+department.name+"', '"
		+department.abbreviation+"');";
	return db(query);
};

Department.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.department ORDER BY id ASC;";
	return db(query);
};

// Department role functions
Department.Role.save = async (role) => {
	let query = "INSERT INTO cms_wt_erp.department_role (department_id, name, abbreviation) VALUES ('"
		+role.department_id+"', '"
		+role.name+"', '"
		+role.abbreviation+"');";
	return db(query);
};

Department.Role.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.department_role ORDER BY id ASC;";
	return db(query);
};

Department.Role.findByDepartmentId = async (department_id) => {
	let query = "SELECT * FROM cms_wt_erp.department_role WHERE department_id='"+department_id+"' ORDER BY id ASC;";
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