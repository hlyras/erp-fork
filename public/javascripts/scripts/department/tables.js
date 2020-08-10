function renderDepartmentList(departments, pagination){
	let html = "";
	html += "<tr class='bold'>";
	html += "<td>Id</td>";
	html += "<td>Nome</td>";
	html += "<td>Abr.</td>";
	html += "</tr>";
	for (let i = pagination.page * pagination.pageSize; i < departments.length && i < (pagination.page + 1) * pagination.pageSize;i++){
		html += "<tr>";
		html += "<td><a class='tbl-show-link nowrap' onclick='showDepartment("+departments[i].id+")'>"+departments[i].id+"</a></td>";
		html += "<td>"+departments[i].name+"</td>";
		html += "<td>"+departments[i].abbreviation+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='editDepartment("+departments[i].id+")'>Edit</a></td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeDepartment("+departments[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	
	document.getElementById("department-list-table").innerHTML = html;
};

function renderDepartment(department, pagination){
	var html = "";

	//html for department info
	html += "<h3>"+department.name+"</h3>";
	document.getElementById("department-info-box").innerHTML = html;

	$(() => {lib.carousel.execute("department-role-list-box", renderDepartmentRoles, department.roles, pagination);});
};

function renderDepartmentRoles(department_roles, pagination){
	var html = "";
	html += "<tr class='bold'>";
	html += "<td>Cargo</td>";
	html += "<td>Abr.</td>";
	html += "</tr>";

	for (let i = pagination.page * pagination.pageSize; i < department_roles.length && i < (pagination.page + 1) * pagination.pageSize;i++){
		html += "<tr>";
		html += "<td>"+department_roles[i].name+"</td>";
		html += "<td>"+department_roles[i].abbreviation+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='editDepartmentRole("+department_roles[i].id+")'>Edit</a></td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeDepartmentRole("+department_roles[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};

	document.getElementById("department-role-list-table").innerHTML = html;
};