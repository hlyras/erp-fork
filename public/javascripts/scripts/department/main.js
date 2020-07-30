$(() => {
	$("#department-create-form").on('submit', (event) => {
		event.preventDefault();

		return alert("Esta funcionalidade está em progresso e será implementada em breve!");

		$.ajax({
			url: '/department/save',
			method: 'post',
			data: $("#department-create-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "department-create-form")){return};
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);
				
				document.getElementById("department-filter-form").elements.namedItem('name').value = document.getElementById("department-create-form").elements.namedItem('name').value;
				
				document.getElementById("department-create-form").elements.namedItem('id').value = "";
				document.getElementById("department-create-form").elements.namedItem('feedstock_code').value = "";
				document.getElementById("department-create-form").elements.namedItem('name').value = "";
				document.getElementById("department-create-form").elements.namedItem('color').value = "";
				document.getElementById("department-create-form").elements.namedItem('standard').value = "";
				document.getElementById("department-create-form").elements.namedItem('uom').value = "";

				document.getElementById('department-create-form').elements.namedItem("submit").disabled = false;
				$("#department-filter-form").submit();
			}
		});
	});
});