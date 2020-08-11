$(() => {
	$("#department-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('department-create-form').elements.namedItem("submit").disabled = true;
		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: '/department/save',
			method: 'post',
			data: $("#department-create-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "department-create-form")){return};
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);
				
				document.getElementById("department-create-form").elements.namedItem('name').value = "";
				document.getElementById("department-create-form").elements.namedItem('abbreviation').value = "";
				document.getElementById('department-create-form').elements.namedItem("submit").disabled = false;
				$("#department-list-form").submit();
			}
		});
	});

	$("#department-list-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('department-list-form').elements.namedItem("submit").disabled = true;
		document.getElementById('ajax-loader').style.visibility = 'visible';

		if(document.getElementById("department-list-box").style.display == "none"){
			document.getElementById("department-list-box").style.display = "block";
			$.ajax({
				url: '/department/list',
				method: 'get',
				success: (response) => {
					if(API.verifyResponse(response, "department-list-form")){return};

					const pagination = { pageSize: 10, page: 0};
					if(response.departments.length){
						$(() => { lib.carousel.execute("department-list-box", renderDepartmentList, response.departments, pagination); });
						document.getElementById('ajax-loader').style.visibility = 'hidden';
					} else {
						lib.noRecord('department-list-table');
						document.getElementById('ajax-loader').style.visibility = 'hidden';
					};
				}
			});
		} else {
			document.getElementById("department-list-box").style.display = "none";
			document.getElementById('ajax-loader').style.visibility = 'hidden';
		};
		
		document.getElementById('department-list-form').elements.namedItem("submit").disabled = false;
	});
});

function showDepartment(id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	$.ajax({
		url: '/department/id/'+id,
		method: 'get',
		success: (response) => {
			if(API.verifyResponse(response)){return};

			const pagination = { pageSize: 10, page: 0 };
			renderDepartment(response.department[0], pagination);

			document.getElementById("department-show-box").style.display = "block";
			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function editDepartment(id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	
	$.ajax({
		url: '/department/id/'+id,
		method: 'get',
		success: (response) => {
			if(API.verifyResponse(response)){return};

			document.getElementById("department-create-form").elements.namedItem("id").value = response.department[0].id;
			document.getElementById("department-create-form").elements.namedItem("name").value = response.department[0].name;
			document.getElementById("department-create-form").elements.namedItem("abbreviation").value = response.department[0].abbreviation;
			
			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function removeDepartment(id){
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