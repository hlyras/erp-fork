function renderDepartmentList(departments, pageSize, page, location){
	let html = "";
	for(i in departments){
		html += "<tr>";
		html += "<td><a class='tbl-show-link nowrap' onclick='showDepartment("+departments[i].id+")'>"+departments[i].id+"</a></td>";
		html += "<td>"+departments[i].id+"</td>";
		html += "<td>"+departments[i].name+"</td>";
		html += "<td>"+departments[i].abbreviation+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='editDepartment("+departments[i].id+")'>Edit</a></td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeDepartment("+departments[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	
	document.getElementById("department-list-box").style.display = "block";
	document.getElementById("department-list-table").innerHTML = html;
	// $("#"+location+"PageNumber").text("" + (page + 1) + " de " + Math.ceil(products.length / pageSize));
};