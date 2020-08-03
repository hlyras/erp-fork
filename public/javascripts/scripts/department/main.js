$(() => {
	$("#department-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('department-create-form').elements.namedItem("submit").disabled = true;
		// return alert("Esta funcionalidade está em progresso e será implementada em breve!");
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
				$("#department-filter-form").submit();
			}
		});
	});

	$("#department-role-create-form").on('submit', (event) => {
		event.preventDefault();
		console.log($("#department-role-create-form").serialize());		

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