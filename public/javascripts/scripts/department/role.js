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