const db = require('../../config/connection');
const lib = require("jarmlib");

const Department = function(){
	this.id;
	this.name;
	this.abbreviation;
	this.roles = [];
};

// Department functions
Department.save = async (department) => {
	let query = "INSERT INTO cms_wt_erp.department (name, abbreviation) VALUES ('"
		+department.name+"', '"
		+department.abbreviation+"');";
	return db(query);
};

Department.update = async (department) => {
	let query = "UPDATE cms_wt_erp.department SET name='"+department.name
	+"', abbreviation='"+department.abbreviation
	+"' WHERE id='"+department.id+"';";
	return db(query);
};

Department.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.department WHERE id='"+id+"';";
	return db(query);
};

Department.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.department ORDER BY id ASC;";
	return db(query);
};

Department.remove = async (id) => {
	let query = "DELETE FROM cms_wt_erp.department WHERE id='"+id+"';";
	return db(query);
};

Department.Role = function(){
	this.id;
	this.department_id;
	this.department_name;
	this.name;
	this.abbreviation;
};

// Department role functions
Department.Role.save = async (role) => {
	let query = "INSERT INTO cms_wt_erp.department_role (department_id, name, abbreviation) VALUES ('"
		+role.department_id+"', '"
		+role.name+"', '"
		+role.abbreviation+"');";
	return db(query);
};

Department.Role.update = async (department) => {
	let query = "UPDATE cms_wt_erp.department_role SET department_id='"+department.department_id
	+"', name='"+department.name
	+"', abbreviation='"+department.abbreviation
	+"' WHERE id='"+department.id+"';";
	return db(query);
};

Department.Role.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.department_role WHERE id='"+id+"';";
	return db(query);
};

Department.Role.list = async () => {
	let query = "SELECT * FROM cms_wt_erp.department_role ORDER BY id ASC;";
	return db(query);
};

Department.Role.findByDepartmentId = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.department_role WHERE department_id='"+id+"' ORDER BY id ASC;";
	return db(query);
};

Department.Role.removeByDepartmentId = async (id) => {
	let query = "DELETE FROM cms_wt_erp.department_role WHERE department_id='"+id+"';";
	return db(query);
};

Department.Role.remove = async (id) => {
	let query = "DELETE FROM cms_wt_erp.department_role WHERE id='"+id+"';";
	return db(query);
};

module.exports = Department;

// Projetos tem diferentes tipos de acesso, pessoas específicas tem funções específicas
// De acordo com o crescimento do projeto, definir as funções atuais necessárias para a distribuição de tarefas.

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