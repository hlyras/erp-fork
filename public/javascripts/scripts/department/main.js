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
				// $("#department-filter-form").submit();
			}
		});
	});

	$("#department-list-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('department-list-form').elements.namedItem("submit").disabled = true;
		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: '/department/list',
			method: 'get',
			success: (response) => {
				if(API.verifyResponse(response, "department-list-form")){return};
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				console.log(response);
				// document.getElementById("department-list-form").elements.namedItem('name').value = "";
				// document.getElementById("department-list-form").elements.namedItem('abbreviation').value = "";
				document.getElementById('department-list-form').elements.namedItem("submit").disabled = false;
				// $("#department-filter-form").submit();
			}
		});
	});

	// Department Role

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