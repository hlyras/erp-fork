$(() => {
	$("#department-role-create-form").on('submit', (event) => {
		event.preventDefault();

		$.ajax({
			url: '/department/role/save',
			method: 'post',
			data: $("#department-role-create-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "department-role-create-form")){return};
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);
				
				document.getElementById("department-role-create-form").elements.namedItem('department_id').value = "";
				document.getElementById("department-role-create-form").elements.namedItem('name').value = "";
				document.getElementById("department-role-create-form").elements.namedItem('abbreviation').value = "";

				document.getElementById('department-role-create-form').elements.namedItem("submit").disabled = false;
				// $("#department-role-filter-form").submit();
			}
		});
	});
});

function editDepartmentRole(id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	
	$.ajax({
		url: '/department/role/id/'+id,
		method: 'get',
		success: (response) => {
			if(API.verifyResponse(response)){return};

			console.log(response);
			document.getElementById("department-role-create-form").elements.namedItem("id").value = response.department_role[0].id;
			document.getElementById("department-role-create-form").elements.namedItem("department_id").value = response.department_role[0].department_id;
			document.getElementById("department-role-create-form").elements.namedItem("name").value = response.department_role[0].name;
			document.getElementById("department-role-create-form").elements.namedItem("abbreviation").value = response.department_role[0].abbreviation;
			
			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function removeDepartmentRole(id){
	let r = confirm('Deseja realmente excluir o produto?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/department/remove',
			method: 'delete',
			data: { department_id: id },
			success: (response) => {
				if(API.verifyResponse(response)){return};

				alert(response.done);

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				$("#department-list-form").submit();
			}
		});
	};
};